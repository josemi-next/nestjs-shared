import uuid from 'uuid-random';
import { type IEvent } from './interfaces/event.interface';

export abstract class EventBase<TPayload extends Record<string, any>> implements IEvent<TPayload> {
	/** Event unique id */
	public readonly id: string;
	/** Date of issue of the event in UTC format */
	public readonly issuedAt: string;

	/**
	 * Creates a new event
	 * @param name Event unique name
	 * @param payload Event payload
	 */
	constructor(public readonly name: string, public readonly payload: TPayload) {
		this.id = uuid();
		this.issuedAt = new Date().toUTCString();
	}
}
