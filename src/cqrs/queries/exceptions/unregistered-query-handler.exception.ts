import { CqrsException } from '../../common/exceptions/cqrs.exception';

/** Unregistered metadata for a query handler */
export class UnregisteredQueryHandlerException extends CqrsException {
	/**
	 * Creates a new exception
	 * @param queryHandlerName Query handler name
	 */
	constructor(queryHandlerName: string) {
		super(`Unregistered metadata for ${queryHandlerName} (missing @QueryHandler() decorator?)`);
	}
}
