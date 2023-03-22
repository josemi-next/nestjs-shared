/**
 * Interface that must be implemented by any application service
 */
export interface IApplicationService {
	/**
	 * Executes the application service
	 * @param args Application service arguments
	 */
	execute(...args: any[]): any;
}
