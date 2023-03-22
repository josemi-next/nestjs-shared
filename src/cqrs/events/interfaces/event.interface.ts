/** Event */
export interface IEvent<TPayload extends Record<string, any> = any> {
	/** Event unique id */
	id: string;
	/** Date of issue of the event in UTC format */
	issuedAt: string;
	/** Event unique name */
	name: string;
	/** Event payload */
	payload: TPayload;
}
