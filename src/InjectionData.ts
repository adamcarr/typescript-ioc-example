import IInjectionData from "./IInjectionData";
import IDependency from "./IDependency";
import IParamInjectionData from "./IParamInjectionData";

class InjectionData<TTarget> implements IInjectionData<TTarget> {
	isSingleton: boolean = false;
	
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
}

export default InjectionData;