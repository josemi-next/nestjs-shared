import {
	Module,
	type DynamicModule,
	type OnApplicationBootstrap,
	type Provider,
} from '@nestjs/common';
import { CommandBus } from '../commands/buses/command-bus';
import {
	DITokenCommandBus,
	InjectCommandBus,
} from '../commands/decorators/inject-command-bus.decorator';
import { ICommandBus } from '../commands/interfaces/command-bus.interface';

import { SyncEventBus } from '../events/buses/sync-event-bus';
import { DITokenEventBus, InjectEventBus } from '../events/decorators/inject-event-bus.decorator';
import { DITokenEventPublisher } from '../events/decorators/inject-event-publisher.decorator';
import { IEventBus } from '../events/interfaces/event-bus.interface';
import { EventPublisher } from '../events/publishers/event-publisher';

import { QueryBus } from '../queries/buses/query-bus';
import { DITokenQueryBus, InjectQueryBus } from '../queries/decorators/inject-query-bus.decorator';
import { IQueryBus } from '../queries/interfaces/query-bus.interface';
import {
	type CqrsModuleAsyncOptions,
	type CqrsModuleBusImplementations,
	type CqrsModuleOptions,
} from './interfaces/cqrs-module-options.interface';
import { ExplorerService } from './services/explorer.service';

/**
 * Standard CQRS module
 */
@Module({
	providers: [ExplorerService],
})
export class CqrsModule implements OnApplicationBootstrap {
	/**
	 * Dependency injection
	 * @param explorerService Explorer service
	 * @param commandBus Command bus
	 * @param queryBus Query bus
	 */
	constructor(
		private readonly explorerService: ExplorerService,
		@InjectCommandBus()
		private readonly commandBus: ICommandBus,
		@InjectQueryBus()
		private readonly queryBus: IQueryBus,
		@InjectEventBus()
		private readonly eventBus: IEventBus
	) {}

	/**
	 * Gets bus providers, allowing to keep default providers or replace any of them with a custom implementation
	 * @param implementations Custom implementations
	 * @returns Bus providers
	 */
	private static createBusProviders(implementations?: CqrsModuleBusImplementations): Provider[] {
		return [
			{
				provide: DITokenCommandBus,
				useClass: implementations?.commandBus ?? CommandBus,
			},
			{
				provide: DITokenQueryBus,
				useClass: implementations?.queryBus ?? QueryBus,
			},
			{
				provide: DITokenEventBus,
				useClass: implementations?.eventBus ?? SyncEventBus,
			},
			{
				provide: DITokenEventPublisher,
				useClass: implementations?.eventPublisher ?? EventPublisher,
			},
		];
	}

	/**
	 * Configures the module
	 * @param options Module options
	 * @returns Nest module
	 */
	static register(options: CqrsModuleOptions): DynamicModule {
		const busProviders = this.createBusProviders(options.busImplementations);

		return {
			module: CqrsModule,
			providers: busProviders,
			exports: busProviders,
			global: true,
		};
	}

	/**
	 * Configures the module asyncronously
	 * @param options Async module options
	 * @returns Nest module
	 */
	static registerAsync<T = any>(options: CqrsModuleAsyncOptions<T>): DynamicModule {
		const busProviders = this.createBusProviders(options.busImplementations);

		return {
			module: CqrsModule,
			imports: options.imports,
			providers: busProviders,
			exports: busProviders,
			global: true,
		};
	}

	/**
	 * Binds all queries and commands on application bootstrap
	 */
	async onApplicationBootstrap() {
		const { commandHandlers, queryHandlers, eventHandlers } = this.explorerService.explore();

		this.commandBus.register(commandHandlers);
		this.queryBus.register(queryHandlers);
		await this.eventBus.registerMany(eventHandlers);
	}
}
