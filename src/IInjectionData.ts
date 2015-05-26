import IDependency from "./IDependency";
import IParamInjectionData from "./IParamInjectionData";

interface IInjectionData<TTarget> {
	ctor: TTarget;
	isSingleton: boolean;
	dependencies: IDependency[];
	instance?: TTarget;
	asSingleton(): IInjectionData<TTarget>;
	asTransient(): IInjectionData<TTarget>;
	paramData?: IParamInjectionData;
}

export default IInjectionData;