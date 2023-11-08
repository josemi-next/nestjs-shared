import {
	Inject,
	Injectable,
	Logger,
	type OnApplicationBootstrap,
	type OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import {
	Kafka,
	Partitioners,
	type Consumer,
	type Message,
	type Producer,
} from 'kafkajs';
import { KafkaConsumer, SubscribeTo } from './kafka.decorator';
import { KafkaModuleConfig } from './kafka.types';

export const KAFKA_OPTIONS = Symbol('KAFKA_OPTIONS');

type KafkaMetadata = Record<
	string,
	{
		instance: any;
		methodName: string;
	}
>;

@Injectable()
export class KafkaService
	implements OnApplicationBootstrap, OnApplicationShutdown
{
	private readonly logger = new Logger(KafkaService.name);
	private readonly kafka: Kafka;
	private readonly producer?: Producer;
	private readonly consumer?: Consumer;
	private metadataMethods: KafkaMetadata;

	constructor(
		@Inject(KAFKA_OPTIONS) private readonly kafkaConfig: KafkaModuleConfig,
		private readonly discoveryService: DiscoveryService,
		private readonly metadataScanner: MetadataScanner,
	) {
		this.kafka = new Kafka(this.kafkaConfig.connectionConfig);

		this.producer = this.kafkaConfig.producerEnabled
			? this.kafka.producer({
					...this.kafkaConfig.producerConfig,
					createPartitioner: Partitioners.LegacyPartitioner,
			  })
			: undefined;

		this.consumer = this.kafkaConfig.consumerEnabled
			? this.kafka.consumer({
					...this.kafkaConfig.consumerConfig,
					groupId: this.kafkaConfig.consumerConfig.groupId,
			  })
			: undefined;
	}

	async onApplicationBootstrap(): Promise<void> {
		await this.connect();

		const kafkaConsumers = this.discoveryService.getProviders({
			metadataKey: KafkaConsumer.KEY,
		});

		if (kafkaConsumers.length && !this.consumer) {
			this.logger.warn(
				'Consumer must be enabled and configured on module to use kafka consumers',
			);
			return;
		}

		for (const kafkaConsumer of kafkaConsumers) {
			const methodNames = this.metadataScanner.getAllMethodNames(
				kafkaConsumer.metatype.prototype,
			);

			this.metadataMethods = methodNames
				.map(methodName => {
					const metadata = this.discoveryService.getMetadataByDecorator(
						SubscribeTo,
						kafkaConsumer,
						methodName,
					);

					if (!metadata) return null;

					return {
						...metadata,
						methodName,
					};
				})
				.reduce((accum, current) => {
					if (!current) return accum;

					return {
						...accum,
						[current.topic]: {
							methodName: current.methodName,
							instance: kafkaConsumer.instance,
						},
					};
				}, {}) as KafkaMetadata;

			const topics = Object.keys(this.metadataMethods);

			await this.consumer?.subscribe({ topics, fromBeginning: false });
		}

		await this.consumer?.run({
			eachMessage: async ({ topic, message }) => {
				const metadataMethod = this.metadataMethods[topic];

				if (!metadataMethod) {
					this.logger.error(
						`There is not a method subscribed to the topic: ${topic}`,
					);
					return;
				}

				const { instance, methodName } = metadataMethod;

				await instance[methodName](message.value?.toString());
			},
		});
	}

	async onApplicationShutdown(): Promise<void> {
		await this.disconnect();
	}

	async connect() {
		try {
			if (!this.producer && !this.consumer)
				throw new Error(
					'No configuration for producer or consumer, check module options',
				);
			await this.producer?.connect().then(() => {
				this.logger.log('Producer connected');
			});
			await this.consumer?.connect().then(() => {
				this.logger.log('Consumer connected');
			});
		} catch (e) {
			this.logger.error(e);
			throw e;
		}
	}

	async disconnect() {
		try {
			await this.producer?.disconnect().then(() => {
				this.logger.log('Producer disconnected');
			});
			await this.consumer?.disconnect().then(() => {
				this.logger.log('Consumer disconnected');
			});
		} catch (e) {
			this.logger.error(e);
			throw e;
		}
	}

	async sendMessage(kafkaTopic: string, kafkaMessages: Message[]) {
		if (!this.producer) {
			throw new Error(
				'Producer must be enabled and configured on module to send messages',
			);
		}

		try {
			const metadata = await this.producer.send({
				topic: kafkaTopic,
				messages: kafkaMessages,
			});
			return metadata;
		} catch (e) {
			this.logger.error(e);
			throw new Error('Error sending message via kafka');
		}
	}
}
