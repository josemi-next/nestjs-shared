import { type IEvent } from './event.interface';

/**
 * Event publisher interface
 */
export interface IEventPublisher {
	/**
	 * Publishes an event in its corresponding event bus
	 * @param event Event
	 */
	publish(event: IEvent): Promise<void>;
	/**
	 * Publishes several events in their corresponding event bus
	 * @param events Events array
	 */
	publishMany(events: IEvent[]): Promise<void>;
}
