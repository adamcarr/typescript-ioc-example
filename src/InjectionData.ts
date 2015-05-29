import IInjectionData from "./IInjectionData";
import IDependency from "./IDependency";
import IParamInjectionData from "./IParamInjectionData";

class InjectionData<TTarget> implements IInjectionData<TTarget> {
	isSingleton: boolean = false;
	instance: TTarget;
	
	constructor(
		public ctor: TTarget, 
		public dependencies: IDependency[] = [], 
		public paramData?: IParamInjectionData) {}
	
	asSingleton() {
		this.isSingleton = true;
		return this;
	}
	
	asTransient() {
		this.isSingleton = false;
		return this;
	}
	
	static instance<TTarget>(instance: TTarget): InjectionData<TTarget> {
		var inst = new InjectionData(undefined, undefined, undefined);
		inst.instance = instance;
		
		return inst;
	}
}

export default InjectionData;