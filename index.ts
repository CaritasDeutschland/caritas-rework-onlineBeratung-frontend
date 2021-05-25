/**
 * This repository is capable to be run as an app directly, but it also exports
 * all relevant parts as modules. This allows a new consumer to own the runtime
 * but reuse as much code from this repository as useful.
 */

export { App } from './src/components/app/app';
export { Login } from './src/components/login/Login';
export { Error } from './src/components/error/Error';
export { translate } from './src/utils/translate';
export * from './src/globalState';
