import { deepStrictEqual } from 'node:assert/strict';
import { IValueObject } from '../interfaces/value-object.interface';

/**
 * Enum based value object
 */
export abstract class EnumValueObject<T> implements IValueObject<T> {
	/**
	 * Creates a new value object
	 * @param value
	 * @param enumValues
	 */
	constructor(public readonly value: T, protected readonly enumValues: T[]) {
		if (!enumValues.includes(value))
			// TODO: Replace with custom error
			throw new Error(`"${JSON.stringify(value)}" is not a valid ${this.constructor.name}`);
	}

	/**
	 * Compares if the value object has the same value as a given one
	 * @param valueToCompare Value to compare
	 * @returns Are the same value
	 */
	public equals(valueToCompare: this): boolean {
		try {
			deepStrictEqual(valueToCompare, this);
		} catch {
			return false;
		}

		return true;
	}
}
