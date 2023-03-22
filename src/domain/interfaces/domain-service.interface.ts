/**
 * Interface that must be implemented by any domain service
 */
export interface IDomainService {
	/**
	 * Executes the domain service
	 * @param args Domain service arguments
	 */
	execute(...args: any[]): any;
}
