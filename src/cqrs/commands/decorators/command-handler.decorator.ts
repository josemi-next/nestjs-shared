import { type Type } from '@nestjs/common';
import { COMMAND_HANDLER_METADATA } from '../constants/command-handler-metadata.constants';
import { type ICommandHandler } from '../interfaces/command-handler.interface';

/**
 * Decorator that marks a class as a CQRS command handler. A command handler
 * handles commands (actions) executed by your application code.
 *
 * The decorated class must implement the `ICommandHandler` interface.
 *
 * @param command command *type* to be handled by this handler.
 */
export const CommandHandler = <TCommand extends Type>(command: TCommand) => {
	return (target: Type<ICommandHandler<InstanceType<TCommand>>>) => {
		Reflect.defineMetadata(COMMAND_HANDLER_METADATA, command, target);
	};
};
