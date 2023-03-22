import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BaseCommandBus } from './base-command-bus';

/** Command bus */
@Injectable()
export class CommandBus extends BaseCommandBus {
	/**
	 * Creates a new command bus
	 * @param moduleRef Nest module providers
	 */
	constructor(protected readonly moduleRef: ModuleRef) {
		super(moduleRef);
	}

	/**
	 * Executes a command
	 * @param command Command
	 * @returns Command result
	 */
	execute<TCommandResult, TCommand extends object = object>(command: TCommand): TCommandResult {
		const commandHandler = this.getCommandHandler(command);

		return commandHandler.execute(command) as TCommandResult;
	}
}
