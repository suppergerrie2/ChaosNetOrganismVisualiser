class NeuralNetwork {
    constructor(json) {
        let neurons = {};
        this.outputs = [];
        this.inputs = [];

        for (let neuronJson of json.neurons) {
            let neuron = new Neuron(neuronJson);
            if (neuron._base_type === "output") {
                this.outputs.push(neuron);
            } else if (neuron._base_type === "input") {
                this.inputs.push(neuron);
            }

            neurons[neuronJson.id] = neuron;
        }

        this.neurons = neurons;

        this.buildStructure();

        for (let i = 0; i < this.outputs.length; i++) {
            let output = this.outputs[i];
            output.x = width - (neuronSize / 2 + 10);
            output.y = (height / this.outputs.length) * i + (height / this.outputs.length) / 2;

            output.setDistanceFromIO(0);
        }

        for (let i = 0; i < this.inputs.length; i++) {
            let input = this.inputs[i];
            input.x = neuronSize / 2 + 20;
            input.y = (height / this.inputs.length) * i + (height / this.inputs.length) / 2;
        }

        this.layers = {};
        for (let neuronId in this.neurons) {
            let neuron = this.neurons[neuronId];

            if (neuron._base_type === "middle") {
                if (!this.layers[neuron.layer]) {
                    this.layers[neuron.layer] = [];
                }

                this.layers[neuron.layer].push(neuron);
            }
        }

        for (let layer in this.layers) {
            let neuronsInLayer = this.layers[layer];

            console.log(neuronsInLayer);
            for (let i = 0; i < neuronsInLayer.length; i++) {
                neuronsInLayer[i].y = (height / neuronsInLayer.length) * i + (height / neuronsInLayer.length) / 2;
            }

        }
    }

    buildStructure() {
        for (let neuronId in this.neurons) {
            let neuron = this.neurons[neuronId];
            for (let neuronDependency of neuron.dependencies) {
                neuronDependency.neuron = this.neurons[neuronDependency.in];
            }
        }
    }

    render() {
        let onNeuron = organism.neuralNetwork.isPosOnNeuron(mouseX, mouseY);

        for (let i in this.neurons) {
            let neuron = this.neurons[i];
            if (!onNeuron) {
                neuron.render();
            } else {
                if (dist(neuron.x, neuron.y, mouseX, mouseY) < neuronSize / 2) {
                    neuron.render(true);
                }
            }
        }
    }

    isPosOnNeuron(x, y) {
        for (let neuronId in this.neurons) {
            let neuron = this.neurons[neuronId];

            if (dist(neuron.x, neuron.y, x, y) < neuronSize / 2) {
                return true;
            }
        }
    }
}