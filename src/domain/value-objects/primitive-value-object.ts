import { type IValueObject } from '../interfaces/value-object.interface';

/**
 * Primitive based value object
 */
export abstract class PrimitiveValueObject<T extends string | number | boolean | symbol>
	implements IValueObject<T>
{
	/**
	 * Creates a new value object
	 * @param value Value
	 */
	constructor(public readonly value: T) {
		if (value === null || value === undefined || !this.validate(value))
			// TODO: Replace with custom error
			throw new Error(`${JSON.stringify(value)} is not a valid ${this.constructor.name}`);
	}

	/**
	 * Validates the value of the value object
	 * @param value Value
	 * @returns Is valid
	 */
	protected abstract validate(value: T): boolean;

	/**
	 * Compares if the value object has the same value as a given one
	 * @param valueToCompare Value to compare
	 * @returns Are the same value
	 */
	public equals(valueToCompare: this): boolean {
		if (valueToCompare === null) return false;

		return valueToCompare.value === this.value;
	}
}
