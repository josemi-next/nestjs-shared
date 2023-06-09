# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.1.0](https://github.com/josemi-next/nestjs-shared/compare/v2.0.0...v2.1.0) (2023-07-06)

### Features

- soap module ([b84a654](https://github.com/josemi-next/nestjs-shared/commit/b84a654446478e175718aa9e9c47d2bcfb6e1eee))

## [2.0.0](https://github.com/josemi-next/nestjs-shared/compare/v1.1.2...v2.0.0) (2023-06-08)

### ⚠ BREAKING CHANGES

- the sendMessage method of the KafkaService has changed its parameter signature,
  instead of a payload it now receives a message array with payload and key

### Features

- kafka logs and improve sendMessage method with array of messages ([bb0c2ed](https://github.com/josemi-next/nestjs-shared/commit/bb0c2ed4a40fee55919f4b47414721a5fb4b3055))

## [1.1.2](https://github.com/josemi-next/nestjs-shared/compare/v1.1.1...v1.1.2) (2023-04-18)

## [1.1.1](https://github.com/josemi-next/nestjs-shared/compare/v1.1.0...v1.1.1) (2023-04-18)

### Bug Fixes

- record value object validate ([32c4841](https://github.com/josemi-next/nestjs-shared/commit/32c484126c48b59644f80d7ac5a3b5711595d9ef))

## [1.1.0](https://github.com/josemi-next/nestjs-shared/compare/v1.0.0...v1.1.0) (2023-04-18)

### Features

- kafka module connector ([16e1e96](https://github.com/josemi-next/nestjs-shared/commit/16e1e96552aa6a4e48dab76a6fa2af9513d67a8e))
- upgrade deps and fix TS errors/imports ([7bddf29](https://github.com/josemi-next/nestjs-shared/commit/7bddf2957336bcd4f72aded209f7c72a64409fe7))

### Bug Fixes

- getAndResetEvents reference bug ([20ce5e3](https://github.com/josemi-next/nestjs-shared/commit/20ce5e3ee076ed9854922dc5d2dc7916a71196da))

## 1.0.0 (2023-03-22)
