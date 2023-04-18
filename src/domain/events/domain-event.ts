import uuid from 'uuid-random';
import { type IEvent } from '../../cqrs';

export class DomainEvent<T extends Record<string, any> = any> implements IEvent<T> {
	public readonly id: string;
	public readonly issuedAt: string;

	constructor(public readonly name: string, public readonly payload: T) {
		this.id = uuid();
		this.issuedAt = new Date().toUTCString();
	}
}
