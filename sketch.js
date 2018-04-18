const training_data = [
	{
		inputs: [0, 1],
		targets: [1]
	},
	{
		inputs: [1, 0],
		targets: [1]
	},
	{
		inputs: [0, 0],
		targets: [0]
	},
	{
		inputs: [1, 1],
		targets: [0]
	}
];

function setup() {
	const nn = new NeuralNetwork(2, 2, 1);

	for (let i = 0; i < 500000; i++) {
		let data = random(training_data);
		nn.train(data.inputs, data.targets);
	}

	console.log("[0,1]", nn.feedForward([0, 1]));
	console.log("[1,0]", nn.feedForward([1, 0]));
	console.log("[0,0]", nn.feedForward([0, 0]));
	console.log("[1,1]", nn.feedForward([1, 1]));
}
