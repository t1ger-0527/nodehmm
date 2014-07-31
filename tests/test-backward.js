'use strict';

var HEALTHY = 0,
	FEVER = 1,
	NORMAL = 0,
	COLD = 1,
	DIZZY = 2;

var hmm = require('../index.js'),
	model = new hmm.Model();

var states = ['Healthy', 'Fever'];

model.setStatesSize(states.length);

// ('Healthy': 0.6, 'Fever': 0.4)
model.setStartProbability([0.6, 0.4]);

// matrix A
model.setTransitionProbability([
	[0.7, 0.3], // healthy
	[0.4, 0.6], // fever
]);

// matrix B
model.setEmissionProbability([
	[0.5, 0.4, 0.1], //HEALTHY : {'normal': 0.5, 'cold': 0.4, 'dizzy': 0.1},
	[0.1, 0.3, 0.6]  //FEVER : {'normal': 0.1, 'cold': 0.3, 'dizzy': 0.6}
]);
var beta = [];

for (var i = 0; i < states.length; i++) {
	beta[i] = [];
}

exports.testBackword = function (test) {
	var result = hmm.backward(model, [0, 1, 2], beta);
	test.equal(result, 0.65);
	test.done();
};