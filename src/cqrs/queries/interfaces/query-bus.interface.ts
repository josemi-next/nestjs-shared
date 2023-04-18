import { type Type } from '@nestjs/common';
import { type IQueryHandler } from './query-handler.interface';

/**
 * Query bus
 */
export interface IQueryBus {
	/**
	 * Executes a query
	 * @param query Query
	 * @returns Query result
	 */
	execute<TQueryResult = any, TQuery extends object = object>(query: TQuery): TQueryResult;

	/**
	 * Binds an array of handlers
	 * @param handlers Handlers
	 */
	register(handlers: Array<Type<IQueryHandler>>): void;
}
