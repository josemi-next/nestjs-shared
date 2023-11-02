import { type OnModuleInit } from '@nestjs/common';
import { SUBSCRIBER_OBJ_REF_MAP } from './kafka.decorator';

export abstract class AbstractKafkaConsumer implements OnModuleInit {
	protected abstract registerTopic(): void | Promise<void>;

	public async onModuleInit(): Promise<void> {
		await this.registerTopic();
	}

	protected addTopic(topicName: string) {
		SUBSCRIBER_OBJ_REF_MAP.set(topicName, this);
	}
}
