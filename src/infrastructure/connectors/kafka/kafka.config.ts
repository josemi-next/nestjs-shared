import { type ModuleMetadata } from '@nestjs/common';
import { type ConsumerConfig, type KafkaConfig, type ProducerConfig } from 'kafkajs';

type KafkaModuleProducer =
	| {
			producerEnabled: true;
			producerConfig: ProducerConfig;
	  }
	| {
			producerEnabled?: false;
	  };

type KafkaModuleConsumer =
	| {
			consumerEnabled: true;
			consumerConfig: ConsumerConfig;
	  }
	| {
			consumerEnabled?: false;
	  };

export type KafkaModuleConfig = {
	connectionConfig: KafkaConfig;
	global?: boolean;
} & KafkaModuleProducer &
	KafkaModuleConsumer;

/** CQRS Nest async module options */
export interface KafkaModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...args: any[]) => Promise<KafkaModuleConfig> | KafkaModuleConfig;
	inject?: any[];
	global?: boolean;
}
