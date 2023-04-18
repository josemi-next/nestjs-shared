import { type IEvent } from '../events/interfaces/event.interface';

const INTERNAL_EVENTS = Symbol('InternalEvents');

export abstract class AggregateRoot {
	private readonly [INTERNAL_EVENTS]: IEvent[] = [];

	public apply(event: IEvent): void {
		this[INTERNAL_EVENTS].push(event);
	}

	public resetEvents(): void {
		this[INTERNAL_EVENTS].length = 0;
	}

	public getEvents(): IEvent[] {
		return this[INTERNAL_EVENTS];
	}

	public getAndResetEvents(): IEvent[] {
		const events = [...this.getEvents()];
		this.resetEvents();

		return events;
	}
}
