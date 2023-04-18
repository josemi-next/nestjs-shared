export class KafkaPayload {
	public createdTime?: string;
	constructor(
		public readonly messageId: string,
		public readonly body: any,
		public readonly messageType: string,
		public readonly topicName: string
	) {
		this.createdTime = new Date().toISOString();
	}
}
