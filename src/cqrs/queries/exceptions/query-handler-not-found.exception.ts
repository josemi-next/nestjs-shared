import { CqrsException } from '../../common/exceptions/cqrs.exception';

/** Query handler not found */
export class QueryHandlerNotFoundException extends CqrsException {
	/**
	 * Creates a new exception
	 * @param queryName Query name
	 */
	constructor(queryName: string) {
		super(`The query handler for the "${queryName}" query was not found!`);
	}
}
