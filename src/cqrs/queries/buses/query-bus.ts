import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BaseQueryBus } from './base-query-bus';

/** Query bus */
@Injectable()
export class QueryBus extends BaseQueryBus {
	/**
	 * Creates a new query bus
	 * @param moduleRef Nest module providers
	 */
	constructor(protected readonly moduleRef: ModuleRef) {
		super(moduleRef);
	}

	/**
	 * Executes a query
	 * @param query Query
	 * @returns Query result
	 */
	execute<TQueryResult, TQuery extends object = object>(query: TQuery): TQueryResult {
		const queryHandler = this.getQueryHandler(query);

		return queryHandler.execute(query) as TQueryResult;
	}
}
