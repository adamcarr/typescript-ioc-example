import IDependency from "./IDependency";

interface IInjectionData<TTarget> {
	ctor: TTarget;
	isSingleton: boolean;
	dependencies: IDependency[];
	instance?: TTarget;
	asSingleton(): IInjectionData<TTarget>;
	asTransient(): IInjectionData<TTarget>;
}

export default IInjectionData;