import {
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit,
} from '@nestjs/common';
import {
	Kafka,
	Partitioners,
	type Consumer,
	type Message,
	type Producer,
} from 'kafkajs';
import { KafkaModuleConfig } from './kafka.config';
import {
	SUBSCRIBER_FN_REF_MAP,
	SUBSCRIBER_OBJ_REF_MAP,
} from './kafka.decorator';

export const KAFKA_OPTIONS = Symbol('KAFKA_OPTIONS');

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(KafkaService.name);
	private readonly kafka: Kafka;
	private readonly producer?: Producer;
	private readonly consumer?: Consumer;

	constructor(
		@Inject(KAFKA_OPTIONS) private readonly kafkaConfig: KafkaModuleConfig,
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

	async onModuleInit(): Promise<void> {
		await this.connect();

		for (const fnRef of SUBSCRIBER_FN_REF_MAP) {
			const [topic, functionRef] = fnRef;
			await this.bindAllTopicToConsumer(functionRef, topic);
		}
	}

	async onModuleDestroy(): Promise<void> {
		await this.disconnect();
	}

	async connect() {
		try {
			if (!this.producer && !this.consumer)
				throw new InternalServerErrorException(
					'No configuration for producer or consumer, check module options',
				);
			await this.producer?.connect();
			await this.consumer?.connect();
		} catch (e) {
			this.logger.error(e);
			throw e;
		}
	}

	async disconnect() {
		try {
			await this.producer?.disconnect();
			await this.consumer?.disconnect();
		} catch (e) {
			this.logger.error(e);
			throw e;
		}
	}

	async bindAllTopicToConsumer(callback: any, topic: string) {
		await this.consumer?.subscribe({ topic, fromBeginning: false });
		await this.consumer?.run({
			eachMessage: async ({ topic, message }) => {
				const functionRef = SUBSCRIBER_FN_REF_MAP.get(topic);
				const object = SUBSCRIBER_OBJ_REF_MAP.get(topic);
				// bind the subscribed functions to topic
				await functionRef.apply(object, [message.value?.toString()]);
			},
		});
	}

	async sendMessage(kafkaTopic: string, kafkaMessages: Message[]) {
		if (!this.producer) {
			throw new InternalServerErrorException(
				'No configuration for producer, check module options',
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
			throw new InternalServerErrorException('Error sending message via kafka');
		}
	}
}
