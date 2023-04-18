import { Global, Module, type DynamicModule, type Provider } from '@nestjs/common';
import { type KafkaModuleAsyncOptions, type KafkaModuleConfig } from './kafka.config';
import { KafkaService, KAFKA_OPTIONS } from './kafka.service';

@Global()
@Module({})
export class KafkaModule {
	static register(kafkaConfig: KafkaModuleConfig): DynamicModule {
		return {
			global: kafkaConfig.global ?? false,
			module: KafkaModule,
			providers: [
				{
					provide: KAFKA_OPTIONS,
					useExisting: kafkaConfig,
				},
				{
					provide: KafkaService,
					useClass: KafkaService,
				},
			],
			exports: [KafkaService],
		};
	}

	static registerAsync(options: KafkaModuleAsyncOptions): DynamicModule {
		return {
			module: KafkaModule,
			imports: options.imports ?? [],
			providers: this.createConnectProviders(options),
			exports: [KafkaService],
			global: options.global,
		};
	}

	private static createConnectProviders(options: KafkaModuleAsyncOptions): Provider[] {
		return [
			{
				provide: KAFKA_OPTIONS,
				useFactory: options.useFactory,
				inject: options.inject ?? [],
			},
			{
				provide: KafkaService,
				useClass: KafkaService,
			},
		];
	}
}
