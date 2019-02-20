class NeuralNetwork {
    constructor(json) {
        let neurons = {};

        for (let neuronJson of json.neurons) {
            neurons[neuronJson.id] = new Neuron(neuronJson);
        }

        this.neurons = neurons;

        this.buildStructure();

        for (let i = 0; i < this.inputs.length; i++) {
            let input = this.inputs[i];
            input.x = neuronSize / 2 + 10;
            input.y = (neuronSize / 2 + 10) + (neuronSize + 10) * (i - this.inputs.length/2);
            input.y += height/2;
        }

        for (let i = 0; i < this.outputs.length; i++) {
            let output = this.outputs[i];
            output.x = width - (neuronSize / 2 + 10);
            output.y = (neuronSize / 2 + 10) + (neuronSize + 10) * (i - this.outputs.length/2);
            output.y += height/2;

            output.setDistanceFromIO(0);
        }
    }

    buildStructure() {
        this.outputs = [];
        this.inputs = [];
        console.log(this.neurons);
        for (let neuronId in this.neurons) {
            let neuron = this.neurons[neuronId];
            for (let neuronDependency of neuron.dependencies) {
                neuronDependency.neuron = this.neurons[neuronDependency.in];
            }

            if (neuron._base_type === "output") {
                this.outputs.push(neuron);
            } else if (neuron._base_type === "input") {
                this.inputs.push(neuron);
            }
        }
    }

    render() {
        for (let i in this.neurons) {
            this.neurons[i].render();
        }
    }
}