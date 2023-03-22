/**
 * Interface for all value objects
 */
export interface IValueObject<T> {
	/**
	 * Value
	 */
	value: T;
	/**
	 * Compares if the value object has the same value as a given one
	 * @param valueToCompare Value to compare
	 * @returns Are the same value
	 */
	equals(valueToCompare: this): boolean;
}
