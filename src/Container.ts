/// <reference path="typings/tsd.d.ts" />

import "reflect-metadata";
import Constants from './Constants';
import IInjectionData from "./IInjectionData";
import InjectionData from "./InjectionData";

class Container {
	private injectionManifest: any;
	
	constructor() {
		this.injectionManifest = {};
	}
	
	register<TTarget>(target: TTarget): IInjectionData<TTarget> {
		let dependencyName = Reflect.getMetadata(Constants.DIMetaData.Dependency, target);
		let dependencies = Reflect.getMetadata(Constants.DIMetaData.Dependencies, target);
		
		var injectionObj: IInjectionData<TTarget>;
		
		if (dependencyName) {
			injectionObj = this.injectionManifest[dependencyName] = 
				new InjectionData<TTarget>(target, dependencies);
		}
		
		return injectionObj;
	}
	
	create<TTarget>(name: string): TTarget {
		var data = this.getInjectionData(name);
		var isNew = (data.instance === undefined);
		var result = this.getInst<TTarget>(name);
		
		if (isNew) {
			for(var i = 0; i < data.dependencies.length; i++) {
				var dependency = data.dependencies[i];
				result[dependency.propertyName || dependency.name] = this.getInst(dependency.name);
			}
		}
		
		return result;
	}
	
	private getInjectionData<TTarget>(name: string): IInjectionData<TTarget> {
		if (!this.injectionManifest[name]){
			throw Error(`Couldn't find injectable object with name ${name}`);
		}
		
		return this.injectionManifest[name];
	}
	
	private getInst<TTarget>(name: string): TTarget {
		var data = this.getInjectionData<TTarget>(name);
		if (data.isSingleton) {
			if (!data.instance) {
				return data.instance = new (<any>data).ctor();
			} else {
				return data.instance;
			}
		} else {
			return new (<any>data).ctor();
		}
	}
}

export default Container;