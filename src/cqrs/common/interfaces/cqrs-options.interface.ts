import { type Type } from '@nestjs/common';
import { type ICommandHandler } from '../../commands/interfaces/command-handler.interface';
import { type IEventHandler } from '../../events/interfaces/event-handler.interface';
import { type IQueryHandler } from '../../queries/interfaces/query-handler.interface';

/** CQRS module options */
export interface ICqrsOptions {
	/** Query handlers */
	queryHandlers: Array<Type<IQueryHandler>>;
	/** Command handlers */
	commandHandlers: Array<Type<ICommandHandler>>;
	/** Event handlers */
	eventHandlers: Array<Type<IEventHandler>>;
}
