import { Scope, type FactoryProvider, type Provider } from '@nestjs/common';
import { SOAP_MODULE_OPTIONS } from './soap-constants';
import {
	type Ensure,
	type SoapModuleAsyncOptions,
	type SoapModuleOptionsFactory,
} from './soap-module-options.type';
import { SoapService } from './soap.service';

export const buildClientProvider = (clientName: string): FactoryProvider => ({
	provide: clientName,
	useFactory: (soapService: SoapService) => soapService.createAsyncClient(),
	inject: [SoapService],
});

export const buildAsyncProviders = (soapAsyncOptions: SoapModuleAsyncOptions): Provider[] => {
	if (soapAsyncOptions.useClass)
		return createUseClassProvider(soapAsyncOptions as Ensure<SoapModuleAsyncOptions, 'useClass'>);
	if (soapAsyncOptions.useExisting)
		return createUseExistingProvider(
			soapAsyncOptions as Ensure<SoapModuleAsyncOptions, 'useExisting'>
		);
	if (soapAsyncOptions.useFactory)
		return createUseFactoryProvider(
			soapAsyncOptions as Ensure<SoapModuleAsyncOptions, 'useFactory'>
		);

	throw new Error(
		'[SoapModule]: useClass, useExisting or useFactory must be filled when using async options.'
	);
};

const createUseClassProvider = (option: Ensure<SoapModuleAsyncOptions, 'useClass'>): Provider[] => {
	const { useClass } = option;

	return [
		{
			provide: SOAP_MODULE_OPTIONS,
			useFactory: (optionsFactory: SoapModuleOptionsFactory) =>
				optionsFactory.createSoapModuleOptions(),
			inject: [useClass],
			scope: option.scope ?? Scope.DEFAULT,
		},
		{
			provide: useClass,
			useClass,
		},
	];
};

const createUseExistingProvider = (
	option: Ensure<SoapModuleAsyncOptions, 'useExisting'>
): Provider[] => {
	const { useExisting } = option;

	return [
		{
			provide: SOAP_MODULE_OPTIONS,
			useFactory: (optionsFactory: SoapModuleOptionsFactory) =>
				optionsFactory.createSoapModuleOptions(),
			inject: [useExisting],
			scope: option.scope ?? Scope.DEFAULT,
		},
	];
};

const createUseFactoryProvider = (
	option: Ensure<SoapModuleAsyncOptions, 'useFactory'>
): Provider[] => {
	const { useFactory } = option;

	return [
		{
			provide: SOAP_MODULE_OPTIONS,
			useFactory,
			inject: option.inject ?? [],
			scope: option.scope ?? Scope.DEFAULT,
		},
	];
};
