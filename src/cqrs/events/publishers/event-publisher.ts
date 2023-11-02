import { InjectEventBus } from '../decorators/inject-event-bus.decorator';
import { IEventBus } from '../interfaces/event-bus.interface';
import { type IEventPublisher } from '../interfaces/event-publisher.interface';
import { type IEvent } from '../interfaces/event.interface';

/**
 * Event publisher implementation
 */
// TODO Decorator @Injectable() because is a provider as EventBus, CommandBus and QueryBus
export class EventPublisher implements IEventPublisher {
	/**
	 * Dependency injection
	 * @param eventBus Event bus
	 */
	constructor(
		@InjectEventBus()
		private readonly eventBus: IEventBus,
	) {}

	/**
	 * Publish an event into corresponding event bus
	 * @param event Event
	 */
	async publish(event: IEvent): Promise<void> {
		await this.eventBus.publish(event);
	}

	/**
	 * Publish many events into corresponding event bus
	 * @param events Events
	 */
	async publishMany(events: IEvent[]): Promise<void> {
		const publishPromises = events.map(event => this.publish(event));

		await Promise.all(publishPromises);
	}
}
