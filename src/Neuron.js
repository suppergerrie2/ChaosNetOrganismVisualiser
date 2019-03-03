class Neuron {
    constructor(json) {
        this.$TYPE = json.$TYPE;
		
        this.dependencies = [];

        for (let dependencyJson of json.dependencies) {
            this.dependencies.push(new Connection(dependencyJson));
        }

        this.id = json.id;
        this.value = json.value;
        this._base_type = json._base_type;
        this.x = width / 2;
        this.y = height / 2;
		this.attributeValue = json.attributeValue;
		this.weight = json.weight;
        this.distanceFromInput = this.distanceFromOutput = -1;
    }

    render(renderNeuronChain) {
        stroke(0, 0, 0);
        strokeWeight(0);
        fill(255);
        ellipse(this.x, this.y, neuronSize);

        fill(255, 255, 0);
		
        for (let dependency of this.dependencies) {

            dependency.render(this, renderNeuronChain);
        }
    }

    setDistanceFromIO(distanceFromOutput) {
        this.distanceFromOutput = distanceFromOutput;

        this.distanceFromInput = 0;

        for (let dependency of this.dependencies) {
            dependency.neuron.setDistanceFromIO(distanceFromOutput + 1);
            this.distanceFromInput = Math.max(this.distanceFromInput, dependency.neuron.distanceFromInput + 1);
        }

        this.x = (width - neuronSize * 2) / (this.distanceFromInput + this.distanceFromOutput) * this.distanceFromInput + neuronSize;

        if (this._base_type === "middle") {
            // this.y = averageY;
            this.y = Math.random() * height;
            this.layer = this.distanceFromInput / (this.distanceFromOutput + this.distanceFromOutput);
        }
    }
}

class Connection {
    constructor(json) {
        this.weight = json.weight;
        this.in = json.neuronId;
    }

    render(out, renderInNeuron) {
        if (renderInNeuron) {
            this.neuron.render(renderInNeuron);
			stroke(255, 255, 255);
			strokeWeight(0);
				if(this.neuron._base_type === "middle") {
				text(this.weight, (this.neuron.x - neuronSize) + 2, this.neuron.y - neuronSize / 2);
				} else {
				text(this.neuron.attributeValue + " " + this.weight, (this.neuron.x - neuronSize) + 2, this.neuron.y - neuronSize / 2);
        }
	}
        stroke(this.weight < 0 ? 255 : 0, this.weight > 0 ? 255 : 0, 0);
        strokeWeight(2);
        line(this.neuron.x, this.neuron.y, out.x, out.y);
    }
}
