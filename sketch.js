function setup(){
    const nn = new NeuralNetwork(2, 2, 1)
    const input = [1, 0]
    const output = nn.feedForward(input)
    console.log(output);

}
