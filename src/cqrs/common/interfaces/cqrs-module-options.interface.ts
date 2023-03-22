import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { ICommandBus } from '../../commands/interfaces/command-bus.interface';
import { IEventBus } from '../../events/interfaces/event-bus.interface';
import { IEventPublisher } from '../../events/interfaces/event-publisher.interface';
import { IQueryBus } from '../../queries/interfaces/query-bus.interface';

/** CQRS buses implementation */
export interface CqrsModuleBusImplementations {
	/** Command bus implementation class */
	commandBus?: Type<ICommandBus>;
	/** Query bus implementation class */
	queryBus?: Type<IQueryBus>;
	/** Event bus implementation class */
	eventBus?: Type<IEventBus>;
	/** Event publisher implementation class */
	eventPublisher?: Type<IEventPublisher>;
}

/** CQRS Nest module options */
export interface CqrsModuleOptions {
	/** Buses implementations */
	busImplementations?: CqrsModuleBusImplementations;
}

/** CQRS Nest async module options */
export interface CqrsModuleAsyncOptions<TEventBusConfig = any> {
	/** Nest imports */
	imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
	/** Gets event bus config */
	useFactory: (...args: any[]) => Promise<TEventBusConfig> | TEventBusConfig;
	/** Instances to inject into useFactory */
	inject: any[];
	/** Buses implementations */
	busImplementations?: CqrsModuleBusImplementations;
}
