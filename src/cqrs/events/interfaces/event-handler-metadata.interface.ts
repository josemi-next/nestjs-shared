import { type Type } from '@nestjs/common';
import { type IEvent } from './event.interface';

/** Metadata associated with an event handler */
export interface IEventHandlerMetadata {
	/** Bounded context name */
	contextName: string;
	/** Event */
	event: Type<IEvent>;
}
