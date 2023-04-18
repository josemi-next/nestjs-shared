import { type Type } from '@nestjs/common';
import { EVENTS_HANDLER_METADATA } from '../constants/event-handler-metadata.constants';
import { type IEventHandlerMetadata } from '../interfaces/event-handler-metadata.interface';
import { type IEventHandler } from '../interfaces/event-handler.interface';
import { type IEvent } from '../interfaces/event.interface';

/**
 * Decorator that marks a class as an event handler. An event handler
 * handles events executed by your application code.
 *
 * The decorated class must implement the `IEventHandler` interface.
 *
 * @param contextName Bounded context name
 * @param event Event to handle
 */
export const EventHandler = <TEvent extends Type<IEvent>>(contextName: string, event: TEvent) => {
	return (target: Type<IEventHandler<InstanceType<TEvent>>>) => {
		const metadata: IEventHandlerMetadata = {
			contextName,
			event,
		};

		Reflect.defineMetadata(EVENTS_HANDLER_METADATA, metadata, target);
	};
};
