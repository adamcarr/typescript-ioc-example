import Decorators from "./Decorators";
import Constants from './Constants';
import ICreated from "./ICreated";

@Decorators.DI.Injectable(Constants.Targets.Injected)
class Injected implements ICreated {
	createdAt: Date;
	constructor() {
		this.createdAt = new Date();
	}
}

export default Injected;