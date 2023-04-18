import { type AggregateRoot } from '../../cqrs';

/**
 * Repository
 */
export abstract class RepositoryImplementation<TModel extends AggregateRoot> {
	/**
	 * Creates a domain entity from database entity
	 * @param persistanceEntity Database entity
	 */
	protected abstract toDomain(persistanceEntity: any): TModel;
	/**
	 * Creates a database entity from domain entity
	 * @param domainEntity Domain entity
	 */
	protected abstract toPersistence(domainEntity: TModel): any;
}
