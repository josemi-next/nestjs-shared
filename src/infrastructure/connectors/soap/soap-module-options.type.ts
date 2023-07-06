import { type ModuleMetadata, type Scope, type Type } from '@nestjs/common/interfaces';
import { type IOptions } from 'soap-improved';
import { type IWSSecurityCertOptions } from 'soap-improved/lib/security';

export { Client, type IOptions } from 'soap-improved';

export type AUTH_TYPE =
	| 'basic'
	| 'bearer'
	| 'clientssl'
	| 'clientsslpfx'
	| 'ntlm'
	| 'ws'
	| 'wscert'
	| 'wspluscert';

interface Auth {
	type: AUTH_TYPE;
}

export interface BasicAuth extends Auth {
	type: 'basic';
	username: string;
	password: string;
}

export interface WSSecurityAuth extends Auth {
	username: string;
	password: string;
	authOptions?: WSSecurityOptions;
}

export interface WSSecurityCertAuth extends Auth {
	privatePEM: any;
	publicP12PEM: any;
	password?: string;
	authOptions?: IWSSecurityCertOptions;
}

export interface WSSecurityOptions {
	passwordType?: string;
	hasTimeStamp?: boolean;
	hasTokenCreated?: boolean;
	hasNonce?: boolean;
	mustUnderstand?: boolean;
	actor?: string;
}

export interface SoapModuleOptions {
	uri: string;
	clientName: string;
	auth?: BasicAuth | WSSecurityAuth | WSSecurityCertAuth;
	clientOptions?: IOptions;
}

export type SoapModuleOptionsFactoryType = Omit<SoapModuleOptions, 'clientName'>;

export interface SoapModuleOptionsFactory {
	createSoapModuleOptions(): Promise<SoapModuleOptionsFactoryType> | SoapModuleOptionsFactoryType;
}

export interface SoapModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	clientName: string;
	inject?: any[];
	scope?: Scope;
	useClass?: Type<SoapModuleOptionsFactory>;
	useExisting?: Type<SoapModuleOptionsFactory>;
	useFactory?: (
		...args: any[]
	) => Promise<SoapModuleOptionsFactoryType> | SoapModuleOptionsFactoryType;
}

type RequiredNotNull<T> = {
	[P in keyof T]: NonNullable<T[P]>;
};

export type Ensure<T, K extends keyof T> = T & Required<RequiredNotNull<Pick<T, K>>>;
