import { Injectable, type Type } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core';
import { type InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { type Module } from '@nestjs/core/injector/module';
import { COMMAND_HANDLER_METADATA } from '../../commands/constants/command-handler-metadata.constants';
import { type ICommandHandler } from '../../commands/interfaces/command-handler.interface';
import { EVENTS_HANDLER_METADATA } from '../../events/constants/event-handler-metadata.constants';
import { type IEventHandler } from '../../events/interfaces/event-handler.interface';
import { QUERY_HANDLER_METADATA } from '../../queries/constants/query-handler-metadata.constants';
import { type IQueryHandler } from '../../queries/interfaces/query-handler.interface';

import { type ICqrsOptions } from '../interfaces/cqrs-options.interface';

/**
 * Nest application modules explorer
 */
@Injectable()
export class ExplorerService {
	/**
	 * Creates a new explorer service
	 * @param modulesContainer Nest application modules container
	 */
	constructor(private readonly modulesContainer: ModulesContainer) {}

	/**
	 * Explores all Nest application modules to get commands, queries, events and sagas providers
	 * @returns CQRS commands, queries, events and sagas providers
	 */
	explore(): ICqrsOptions {
		const modules = [...this.modulesContainer.values()];

		const commandHandlers = this.flatMap<ICommandHandler>(modules, instance =>
			this.filterProvider<ICommandHandler>(instance, COMMAND_HANDLER_METADATA)
		);

		const queryHandlers = this.flatMap<IQueryHandler>(modules, instance =>
			this.filterProvider<IQueryHandler>(instance, QUERY_HANDLER_METADATA)
		);

		const eventHandlers = this.flatMap<IEventHandler>(modules, instance =>
			this.filterProvider<IEventHandler>(instance, EVENTS_HANDLER_METADATA)
		);

		return {
			commandHandlers,
			queryHandlers,
			eventHandlers,
		};
	}

	/**
	 * Maps all module providers, applies a callback function on each one, and returns those that are not undefined
	 * @param modules All application modules
	 * @param callback Callback function to apply to each provider
	 * @returns Providers
	 */
	private flatMap<T>(
		modules: Module[],
		callback: (instance: InstanceWrapper) => Type<any> | undefined
	): Array<Type<T>> {
		const items = modules
			.map(module => [...module.providers.values()].map(callback))
			.reduce((a, b) => a.concat(b), []);
		return items.filter(element => Boolean(element)) as Array<Type<T>>;
	}

	/**
	 * Filters providers whose metadata key contains a class
	 * @param wrapper Nest dependency injection instance wrapper
	 * @param metadataKey Metadata key
	 * @returns Class or undefined
	 */
	private filterProvider<T>(wrapper: InstanceWrapper, metadataKey: string): Type<T> | undefined {
		const { instance } = wrapper;
		if (!instance?.constructor) return;

		const metadata: Type | undefined = Reflect.getMetadata(metadataKey, instance.constructor);
		return metadata ? (instance.constructor as Type<T>) : undefined;
	}
}
