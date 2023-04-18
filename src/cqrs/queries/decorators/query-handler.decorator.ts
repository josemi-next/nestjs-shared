import { type Type } from '@nestjs/common';
import { QUERY_HANDLER_METADATA } from '../constants/query-handler-metadata.constants';
import { type IQueryHandler } from '../interfaces/query-handler.interface';

/**
 * Decorator that marks a class as a CQRS query handler. A query handler
 * handles queries (actions) executed by your application code.
 *
 * The decorated class must implement the `IQueryHandler` interface.
 *
 * @param query query *type* to be handled by this handler.
 */
export const QueryHandler = <TQuery extends Type>(query: TQuery) => {
	return (target: Type<IQueryHandler<InstanceType<TQuery>>>) => {
		Reflect.defineMetadata(QUERY_HANDLER_METADATA, query, target);
	};
};
