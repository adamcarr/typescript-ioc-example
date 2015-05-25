/// <reference path="typings/tsd.d.ts" />

import "reflect-metadata";
import Constants from './Constants';
import IDependency from './IDependency';

module Decorators {
	export module DI {
		export function Injectable(name: string): ClassDecorator {
			return function(target) {
				Reflect.defineMetadata(Constants.DIMetaData.Dependency, name, target);
			};
		}
		
		export function Inject(dependencies: IDependency[]): ClassDecorator {
			return function (target: any) {
				Reflect.defineMetadata(Constants.DIMetaData.Dependencies, dependencies, target);
				return target;
			}
		}
	}
}

export default Decorators;