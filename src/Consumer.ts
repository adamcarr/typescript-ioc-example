import Constants from './Constants';
import Decorators from "./Decorators";
import ICreated from "./ICreated";
import IConsumer from "./IConsumer";

class BaseClass {
	createdDate: Date;
	constructor() {
		this.createdDate = new Date();
	}
}

@Decorators.DI.Injectable(Constants.Targets.Consumer)
//@Decorators.DI.Inject([{name: Constants.Targets.Injected, propertyName: 'created'}])
class Consumer extends BaseClass implements IConsumer{
	constructor(
		@Decorators.DI.InjectParam(Constants.Targets.Injected) public created: ICreated) {
		super();
	}
}

export default Consumer;