/// <reference path="typings/tsd.d.ts" />

import "reflect-metadata";
import Constants from './Constants';
import IInjectionData from "./IInjectionData";
import InjectionData from "./InjectionData";
import * as _ from 'lodash';

class Container {
	private injectionManifest: any;
	
	constructor() {
		this.injectionManifest = {};
	}
	
	register<TTarget>(target: TTarget): IInjectionData<TTarget> {
		let dependencyName = Reflect.getMetadata(Constants.DIMetaData.Dependency, target);
		let dependencies = Reflect.getMetadata(Constants.DIMetaData.Dependencies, target);
		let injectedParamData = Reflect.getMetadata(Constants.DIMetaData.InjectParamData, target);
		
		var injectionObj: IInjectionData<TTarget>;
		
		if (dependencyName) {
			injectionObj = this.injectionManifest[dependencyName] = 
				new InjectionData<TTarget>(target, dependencies, injectedParamData);
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
	
	private getParameters<TTarget>(name: string) {
		var data = this.getInjectionData<TTarget>(name);
		var paramsLength;
		
		if (!data.paramData) {
			return [];
		} else {
			paramsLength = Math.max.apply(
				null, 
				data.paramData.params.map((val, index) => val.index));
		}
		var params = [];	
		
		for (var i = 0; i <= paramsLength; i++) {
			var paramData = _.find(data.paramData.params, {index: i});
			if (paramData) {
				params.push(this.getInst<TTarget>(paramData.name));
			} else {
				params.push(undefined);
			}
		}
		
		return params;
	}
	
	private getInst<TTarget>(name: string): TTarget {
		var data = this.getInjectionData<TTarget>(name);
		var params = this.getParameters<TTarget>(name);
		
		var Temp = function(){};
		Temp.prototype = (<any>data.ctor).prototype;
		var inst = new Temp;
		var ret;
		
		if (data.isSingleton) {
			if (!data.instance) {
				ret = data.instance = (<any>data).ctor.apply(inst, params);
			} else {
				return data.instance;
			}
		} else {
			ret = (<any>data).ctor.apply(inst, params);
		}
		
		if (Object(ret) === ret) {
			return ret;
		} else {
			data.instance = inst;
			return inst;
		}
	}
}

export default Container;