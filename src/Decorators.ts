/// <reference path="typings/tsd.d.ts" />

import "reflect-metadata";
import Constants from './Constants';
import IDependency from './IDependency';
import IParamInjectionData from './IParamInjectionData';

module Decorators {
	export module DI {
		export function Injectable(name: string): ClassDecorator {
			return function(target) {
				Reflect.defineMetadata(Constants.DIMetaData.Dependency, name, target);
			};
		}
		
		export function InjectProperties(dependencies: IDependency[]): ClassDecorator {
			return function (target: any) {
				Reflect.defineMetadata(Constants.DIMetaData.Dependencies, dependencies, target);
				return target;
			}
		}
		
		export function InjectParam(targetName: string) : ParameterDecorator {
			return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
				var paramInjectionData: IParamInjectionData;
				if (Reflect.hasMetadata(Constants.DIMetaData.InjectParamData, target)) {
					paramInjectionData = Reflect.getMetadata(Constants.DIMetaData.InjectParamData, target);
				} else {
					paramInjectionData = {
						params: []
					}
				}
				
				paramInjectionData.params.push({
					name: targetName,
					index: parameterIndex
				});
				
				Reflect.defineMetadata(Constants.DIMetaData.InjectParamData, paramInjectionData, target);
			};
		}
	}
}

export default Decorators;