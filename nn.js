// Activation function
const sigmoid = x => 1 / (1 + Math.exp(-x))
// Derivative of sigmoid
// const dsigmoid = x => sigmoid(x) * (1 - sigmoid(x));
const dsigmoid = y => y * (1 - y);

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
        this.learning_rate = 0.2
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

    train(input_array, target_array) {
      // Generating the Hidden outputs
      let inputs = Matrix.fromArray(input_array)
      let hidden = Matrix.multiply(this.weights_ih, inputs)
      hidden.add(this.bias_h);

      // Apply the activation function
      hidden.map(sigmoid)

      // Generating the Output outputs!
      let outputs = Matrix.multiply(this.weights_ho, hidden)
      outputs.add(this.bias_o);
      outputs.map(sigmoid)

      // Convert array to matrix object
      let targets = Matrix.fromArray(target_array)

      // Calculate the error
      let output_errors = Matrix.substract(targets, outputs);

      // Calculate gradients
      let gradients = Matrix.map(outputs, dsigmoid);
      gradients.multiply(output_errors)
      gradients.multiply(this.learning_rate)

      // Calculate deltas
      let hidden_transpose = Matrix.transpose(hidden)
      let weights_ho_deltas = Matrix.multiply(gradients, hidden_transpose)

      // Adjust the weights by deltas
      this.weights_ho.add(weights_ho_deltas);

      // Adjust the weights by bias
      this.bias_o.add(gradients);

      // Calculate the hidden layer errors
      let weights_ho_transpose = Matrix.transpose(this.weights_ho)
      let hidden_errors = Matrix.multiply(weights_ho_transpose, output_errors)

      // Calculate hidden gradients
      let hidden_gradients = Matrix.map(hidden, dsigmoid)
      hidden_gradients.multiply(hidden_errors)
      hidden_gradients.multiply(this.learning_rate)

      // Calculate input->hidden deltas
      let inputs_transpose = Matrix.transpose(inputs)
      let weights_ih_deltas = Matrix.multiply(hidden_gradients, inputs_transpose)

      // Adjust the weights by deltas
      this.weights_ih.add(weights_ih_deltas);

      // Adjust the weights by bias
      this.bias_h.add(hidden_gradients);
    }
}
