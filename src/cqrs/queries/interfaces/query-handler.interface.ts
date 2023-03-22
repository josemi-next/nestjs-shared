/** Query handler */
export interface IQueryHandler<TQuery extends object = object, TResult = any> {
	/**
	 * Executes the query
	 * @param query Query
	 * @returns Query result
	 */
	execute(query: TQuery): TResult | Promise<TResult>;
}
