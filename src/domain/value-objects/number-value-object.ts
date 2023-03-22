import { PrimitiveValueObject } from './primitive-value-object';

/**
 * Number based value object
 */
export abstract class NumberValueObject extends PrimitiveValueObject<number> {
	/**
	 * Is value greater than other number
	 * @param to Number to compare
	 * @returns Is greater than
	 */
	public greaterThan(to: NumberValueObject): boolean {
		return this.value > to.value;
	}

	/**
	 * Is value greater than or equals to other number
	 * @param to Number to compare
	 * @returns Is greater than or equals to
	 */
	public greaterThanOrEqualsTo(to: NumberValueObject): boolean {
		return this.value >= to.value;
	}

	/**
	 * Is value less than other number
	 * @param to Number to compare
	 * @returns Is less than
	 */
	public lessThan(to: NumberValueObject): boolean {
		return this.value < to.value;
	}

	/**
	 * Is value less than or equals to other number
	 * @param to Number to compare
	 * @returns Is less than or equals to
	 */
	public lessThanOrEqualsTo(to: NumberValueObject): boolean {
		return this.value <= to.value;
	}
}
