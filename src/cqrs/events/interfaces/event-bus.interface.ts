import type { Type } from '@nestjs/common';
import { type IEventHandler } from './event-handler.interface';
import { type IEvent } from './event.interface';

/** Event bus */
export interface IEventBus {
	/**
	 * registers an event handler
	 * @param eventHandler
	 */
	register(eventHandler: Type<IEventHandler>): Promise<void> | void;
	/**
	 * Registers many event handlers
	 * @param eventHandlers
	 */
	registerMany(eventHandlers: Array<Type<IEventHandler>>): Promise<void> | void;
	/**
	 * Publish an event
	 * @param event Event
	 */
	publish(event: IEvent): Promise<void> | void;
	/**
	 * Publishes many events
	 * @param events Events array
	 */
	publishMany(events: IEvent[]): Promise<void> | void;
}
