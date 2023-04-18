import { type Type } from '@nestjs/common';
import { type ModuleRef } from '@nestjs/core';
import { COMMAND_HANDLER_METADATA } from '../constants/command-handler-metadata.constants';
import { CommandHandlerNotFoundException } from '../exceptions/command-handler-not-found.exception';
import { UnregisteredCommandHandlerException } from '../exceptions/unregistered-command-handler.exception';
import { type ICommandBus } from '../interfaces/command-bus.interface';
import { type ICommandHandler } from '../interfaces/command-handler.interface';

/**
 *	Base command bus
 */
export abstract class BaseCommandBus implements ICommandBus {
	/** Handlers binded to command bus */
	private readonly _handlers = new WeakMap<Type, ICommandHandler>();

	/**
	 * Creates a new command bus
	 * @param moduleRef Nest module providers
	 */
	constructor(protected readonly moduleRef: ModuleRef) {}

	/**
	 * Executes a command
	 * @param command Command
	 * @returns Command result
	 */
	public abstract execute<TCommandResult, TCommand extends object = object>(
		command: TCommand
	): TCommandResult;

	/**
	 * Binds an array of handlers
	 * @param handlers Handlers
	 */
	public register(handlers: Array<Type<ICommandHandler>> = []): void {
		handlers.forEach(handler => {
			this.registerHandler(handler);
		});
	}

	/**
	 * Registers a single handler to the command bus
	 * @param handler Command handler
	 */
	protected registerHandler(handler: Type<ICommandHandler>): void {
		const instance = this.moduleRef.get(handler, { strict: false });
		if (instance === undefined) return;

		const command = this.reflectCommand(handler);
		this._handlers.set(command, instance);
	}

	/**
	 * Reflects command from metadata
	 * @param handler Command handler
	 * @returns Command
	 */
	protected reflectCommand(handler: Type<ICommandHandler>): Type {
		const target: Type | undefined = Reflect.getMetadata(COMMAND_HANDLER_METADATA, handler);

		if (target === undefined) throw new UnregisteredCommandHandlerException(handler.name);

		return target;
	}

	/**
	 * Gets a command handler for a command
	 * @param command Command
	 * @returns Command handler
	 */
	protected getCommandHandler(command: object): ICommandHandler {
		const commandHandler = this._handlers.get(command.constructor as Type);

		if (commandHandler === undefined)
			throw new CommandHandlerNotFoundException(command.constructor.name);

		return commandHandler;
	}
}
