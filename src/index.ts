/// <reference path="typings/tsd.d.ts" />

import Constants from './Constants';
import IConsumer from './IConsumer';
import Container from './Container';
import * as Bootstrapper from './Bootstrapper';

var container = new Container();
Bootstrapper.bootstrap(container);

var runs = 5, run = 1;

function createConsumer() {
	var consumer = container.create<IConsumer>(Constants.Targets.Consumer);
	console.log(consumer);
	if (run++ < runs) {
		setTimeout(createConsumer, 1000);
	}
}

createConsumer();
