import { type Type } from '@nestjs/common';
import { type ModuleRef } from '@nestjs/core';
import { QUERY_HANDLER_METADATA } from '../constants/query-handler-metadata.constants';
import { QueryHandlerNotFoundException } from '../exceptions/query-handler-not-found.exception';
import { UnregisteredQueryHandlerException } from '../exceptions/unregistered-query-handler.exception';
import { type IQueryBus } from '../interfaces/query-bus.interface';
import { type IQueryHandler } from '../interfaces/query-handler.interface';

/**
 *	Base query bus
 */
export abstract class BaseQueryBus implements IQueryBus {
	/** Handlers binded to query bus */
	private readonly _handlers = new Map<Type, IQueryHandler>();

	/**
	 * Creates a new query bus
	 * @param moduleRef Nest module providers
	 */
	constructor(protected readonly moduleRef: ModuleRef) {}

	/**
	 * Executes a query
	 * @param query Query
	 * @returns Query result
	 */
	public abstract execute<TQueryResult, TQuery extends object = object>(
		query: TQuery
	): TQueryResult;

	/**
	 * Binds an array of handlers
	 * @param handlers Handlers
	 */
	public register(handlers: Array<Type<IQueryHandler>> = []): void {
		handlers.forEach(handler => {
			this.registerHandler(handler);
		});
	}

	/**
	 * Registers a single handler to the query bus
	 * @param handler Query handler
	 */
	protected registerHandler(handler: Type<IQueryHandler>): void {
		const instance = this.moduleRef.get(handler, { strict: false });
		if (!instance) return;

		const query = this.reflectQuery(handler);
		this._handlers.set(query, instance);
	}

	/**
	 * Reflects query from metadata
	 * @param handler Query handler
	 * @returns Query
	 */
	protected reflectQuery(handler: Type<IQueryHandler>): Type {
		const target: Type | undefined = Reflect.getMetadata(QUERY_HANDLER_METADATA, handler);

		if (!target) throw new UnregisteredQueryHandlerException(handler.name);

		return target;
	}

	/**
	 * Gets a query handler for a query
	 * @param query Query
	 * @returns Query handler
	 */
	protected getQueryHandler(query: object): IQueryHandler {
		const queryHandler = this._handlers.get(query.constructor as Type);

		if (queryHandler === undefined) throw new QueryHandlerNotFoundException(query.constructor.name);

		return queryHandler;
	}
}
