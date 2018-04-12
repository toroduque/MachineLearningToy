// Activation function
const sigmoid = x => 1 / (1 + Math.exp(-x))

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes  = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes)
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes)
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1)
        this.bias_o = new Matrix(this.output_nodes, 1)
        this.bias_h.randomize()
        this.bias_o.randomize()
    }

    feedForward(input_array) {

        // Generating the Hidden outputs
        let inputs = Matrix.fromArray(input_array)
        let hidden = Matrix.multiply(this.weights_ih, inputs)
        hidden.add(this.bias_h);
        // Apply the activation function
        hidden.map(sigmoid)

        // Generating the Output outputs!
        let output = Matrix.multiply(this.weights_ho, hidden)
        output.add(this.bias_o);
        output.map(sigmoid)

        return output.toArray();
    }
}
