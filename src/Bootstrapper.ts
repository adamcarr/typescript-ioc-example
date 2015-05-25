import Container from './Container';
import Injected from './Injected';
import Consumer from './Consumer';

export function bootstrap(container: Container) {
	container.register(Injected).asSingleton();
	container.register(Consumer);
}