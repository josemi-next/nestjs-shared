import { Type } from '@nestjs/common';
import { ICommandHandler } from '../../commands/interfaces/command-handler.interface';
import { IEventHandler } from '../../events/interfaces/event-handler.interface';
import { IQueryHandler } from '../../queries/interfaces/query-handler.interface';

/** CQRS module options */
export interface ICqrsOptions {
	/** Query handlers */
	queryHandlers: Array<Type<IQueryHandler>>;
	/** Command handlers */
	commandHandlers: Array<Type<ICommandHandler>>;
	/** Event handlers */
	eventHandlers: Array<Type<IEventHandler>>;
}
