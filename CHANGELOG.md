# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.1.3](https://github.com/josemi-next/nestjs-shared/compare/v2.1.2...v2.1.3) (2023-11-06)

### Bug Fixes

- allows nesting of kafka decorator with other decorators ([6a36c75](https://github.com/josemi-next/nestjs-shared/commit/6a36c7514ed15949511521c671d5fccb6f6660f4))

## [2.1.2](https://github.com/josemi-next/nestjs-shared/compare/v2.1.1...v2.1.2) (2023-11-03)

### Bug Fixes

- removed random consumerSuffix ([5b23c24](https://github.com/josemi-next/nestjs-shared/commit/5b23c24721544da495a8c9e14dd25a8c4ac0c862))

## [2.1.1](https://github.com/josemi-next/nestjs-shared/compare/v2.1.0...v2.1.1) (2023-11-02)

### Bug Fixes

- kafka subscriber abstract class and update deps ([38da4a9](https://github.com/josemi-next/nestjs-shared/commit/38da4a958b5c8ee81bd5a596226110f0f3d5050d))

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
