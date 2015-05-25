import Constants from './Constants';
import Decorators from "./Decorators";
import ICreated from "./ICreated";
import IConsumer from "./IConsumer";

@Decorators.DI.Injectable(Constants.Targets.Consumer)
@Decorators.DI.Inject([{name: Constants.Targets.Injected, propertyName: 'created'}])
class Consumer implements IConsumer{
	created: ICreated;
}

export default Consumer;