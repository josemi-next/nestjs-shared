import { type IEvent } from './event.interface';

/** Event handler */
export interface IEventHandler<TEvent extends IEvent = IEvent> {
	/**
	 * Handles an event
	 * @param event Event
	 */
	handle(event: TEvent): Promise<void> | void;
}
