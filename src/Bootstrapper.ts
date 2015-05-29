import Container from './Container';
import Injected from './Injected';
import ICreated from './ICreated';
import Consumer from './Consumer';
import Constants from './Constants';

export function bootstrap(container: Container) {
//	container.register(Injected).asSingleton();
	var created: ICreated = { createdAt: new Date('2001-09-11') };
	container.registerInstance(Constants.Targets.Injected, created);
	container.register(Consumer);
}