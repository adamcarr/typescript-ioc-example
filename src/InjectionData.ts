import IInjectionData from "./IInjectionData";
import IDependency from "./IDependency";

class InjectionData<TTarget> implements IInjectionData<TTarget> {
	isSingleton: boolean = false;
	
	constructor(public ctor: TTarget, public dependencies: IDependency[]) {}
	
	asSingleton() {
		this.isSingleton = true;
		return this;
	}
	
	asTransient() {
		this.isSingleton = false;
		return this;
	}
}

export default InjectionData;