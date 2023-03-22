/**
 * Interface that must be implemented by any use case
 */
export interface IUseCase {
	/**
	 * Executes the use case
	 * @param args Use case arguments
	 */
	execute(...args: any[]): any;
}
