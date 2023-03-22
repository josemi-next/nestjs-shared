/**
 * View repository
 */
export abstract class ViewRepositoryImplementation<TModel> {
	/**
	 * Creates a domain entity from database entity
	 * @param persistanceEntity Database entity
	 */
	protected abstract toDomain(persistanceEntity: any): TModel;
}
