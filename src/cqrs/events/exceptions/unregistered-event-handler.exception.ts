import { CqrsException } from '../../common/exceptions/cqrs.exception';

/** Trying to register an event handler without set its metadata */
export class UnregisteredEventHandlerException extends CqrsException {
	/**
	 * Creates a new exception
	 * @param handlerName Event handler class name
	 */
	constructor(handlerName: string) {
		super(`Unregistered metadata for ${handlerName} (missing @EventHandler() decorator?)`);
	}
}
