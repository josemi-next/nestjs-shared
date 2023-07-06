import { Inject, Injectable } from '@nestjs/common';
import {
	BasicAuthSecurity,
	WSSecurity,
	WSSecurityCert,
	createClientAsync,
	type Client,
	type ISecurity,
} from 'soap-improved';
import { SOAP_MODULE_OPTIONS } from './soap-constants';
import {
	SoapModuleOptions,
	type BasicAuth,
	type WSSecurityAuth,
	type WSSecurityCertAuth,
} from './soap-module-options.type';

@Injectable()
export class SoapService {
	constructor(@Inject(SOAP_MODULE_OPTIONS) readonly soapModuleOptions: SoapModuleOptions) {}

	async createAsyncClient(): Promise<Client> {
		const options = this.soapModuleOptions;

		try {
			const client = await createClientAsync(options.uri, options.clientOptions);

			if (!options.auth) return client;

			let authMethod: ISecurity;

			if (options.auth.type === 'basic') {
				const { username, password } = options.auth as BasicAuth;
				authMethod = new BasicAuthSecurity(username, password);
			} else if (options.auth.type === 'ws') {
				const { username, password, authOptions } = options.auth as WSSecurityAuth;
				authMethod = new WSSecurity(username, password, authOptions);
			} else if (options.auth.type === 'wscert') {
				const { privatePEM, publicP12PEM, password, authOptions } =
					options.auth as WSSecurityCertAuth;
				authMethod = new WSSecurityCert(privatePEM, publicP12PEM, password, authOptions);
			} else throw new Error(`${options.auth.type} method not implemented on module`);

			client.setSecurity(authMethod);

			return client;
		} catch (err) {
			if (err instanceof Error)
				throw new Error(
					`${err.message} \n - An error occurred while creating the soap client. Check the SOAP service URL and status.`
				);

			throw err;
		}
	}
}
