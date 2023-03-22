import { Type } from '@nestjs/common';
import { ICommandHandler } from './command-handler.interface';

/**
 * Command bus
 */
export interface ICommandBus {
	/**
	 * Executes a command
	 * @param command Command
	 * @returns Command result
	 */
	execute<TCommandResult, TCommand extends object = object>(command: TCommand): TCommandResult;

	/**
	 * Binds an array of handlers
	 * @param handlers Handlers
	 */
	register(handlers: Array<Type<ICommandHandler>>): void;
}
