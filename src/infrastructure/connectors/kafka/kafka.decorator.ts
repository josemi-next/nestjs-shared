import { DiscoveryService } from '@nestjs/core';

export const KafkaConsumer = DiscoveryService.createDecorator();
export const SubscribeTo = DiscoveryService.createDecorator<{
	topic: string;
}>();
