/** Command handler */
export interface ICommandHandler<TCommand extends object = object, TResult = void> {
	/**
	 * Executes the command
	 * @param command Command
	 * @returns Command result
	 */
	execute(command: TCommand): TResult | Promise<TResult>;
}
