import { Injectable, type Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { EVENTS_HANDLER_METADATA } from '../constants/event-handler-metadata.constants';
import { UnregisteredEventHandlerException } from '../exceptions/unregistered-event-handler.exception';
import { type IEventBus } from '../interfaces/event-bus.interface';
import { type IEventHandlerMetadata } from '../interfaces/event-handler-metadata.interface';
import { type IEventHandler } from '../interfaces/event-handler.interface';
import { type IEvent } from '../interfaces/event.interface';

@Injectable()
export class SyncEventBus implements IEventBus {
	/** Handlers binded to event bus */
	private readonly _handlers = new WeakMap<Type<IEvent>, IEventHandler[]>();

	/**
	 * Dependency injection
	 * @param moduleRef Nest module providers
	 */
	constructor(protected readonly moduleRef: ModuleRef) {}

	/**
	 * Register an event handler into event bus
	 * @param eventHandler Event handler
	 */
	public register(eventHandler: Type<IEventHandler>): void {
		const instance = this.moduleRef.get(eventHandler, { strict: false });
		if (!instance) return;

		const event = this.reflectEvent(eventHandler);

		this.bind(event, instance);
	}

	/**
	 * Registers many event handlers into event bus
	 * @param eventHandlers Event handlers array
	 */
	public registerMany(eventHandlers: Array<Type<IEventHandler>>): void {
		eventHandlers.forEach(handler => {
			this.register(handler);
		});
	}

	/**
	 * Publish an event into event bus
	 * @param event Event
	 */
	public async publish(event: IEvent): Promise<void> {
		const eventHandlers = this._handlers.get(event.constructor as Type<IEvent>);
		if (!eventHandlers) return;

		const handlerPromises = eventHandlers.map(handler => handler.handle(event));

		await Promise.all(handlerPromises);
	}

	/**
	 * Publish many events into event bus
	 * @param events Events
	 */
	public async publishMany(events: IEvent[]): Promise<void> {
		const publishPromises = events.map(event => this.publish(event));

		await Promise.all(publishPromises);
	}

	/**
	 * Reflects event from metadata
	 * @param handler Event handler
	 * @returns Event
	 */
	private reflectEvent(handler: Type<IEventHandler>): Type<IEvent> {
		const metadata: IEventHandlerMetadata | undefined = Reflect.getMetadata(
			EVENTS_HANDLER_METADATA,
			handler
		);

		if (!metadata) throw new UnregisteredEventHandlerException(handler.name);

		return metadata.event;
	}

	/**
	 * Binds a new handler for an event
	 * @param event Event
	 * @param handler Handler to bind
	 */
	private bind(event: Type<IEvent>, handler: IEventHandler): void {
		const registeredHandlers = this._handlers.get(event) ?? [];

		registeredHandlers.push(handler);

		this._handlers.set(event, registeredHandlers);
	}
}
