class Neuron {
    constructor(json) {
        console.log(json);
        this.$TYPE = json.$TYPE;
        this.dependencies = [];

        for(let dependencyJson of json.dependencies) {
            this.dependencies.push(new Connection(dependencyJson));
        }

        this.id = json.id;
        this.value = json.value;
        this._base_type = json._base_type;
        this.x = width/2;
        this.y = height/2;

        this.distanceFromInput = this.distanceFromOutput = -1;
    }

    render() {
        stroke(0, 0, 0);
        fill(255);
        ellipse(this.x, this.y, neuronSize);

        fill(255, 255, 0);
        text(this.distanceFromInput, this.x-neuronSize/2, this.y-neuronSize/2);
        text(this.distanceFromOutput, this.x-neuronSize/2, this.y+neuronSize/2);

        for(let dependency of this.dependencies) {
            dependency.render(this);
        }
    }

    setDistanceFromIO(distanceFromOutput) {
        this.distanceFromOutput = distanceFromOutput;

        this.distanceFromInput = 0;
        for(let dependency of this.dependencies) {
            dependency.neuron.setDistanceFromIO(distanceFromOutput+1);
            this.distanceFromInput = Math.max(this.distanceFromInput, dependency.neuron.distanceFromInput+1);
        }

        this.x = (width-neuronSize*2)/(this.distanceFromInput+this.distanceFromOutput)*this.distanceFromInput+neuronSize;

        if(this._base_type==="middle") {
            this.y = Math.random() * height;
        }
    }
}

class Connection {
    constructor(json) {
        this.weight = json.weight;
        this.in = json.neuronId;
    }

    render(out) {
        stroke(this.weight<0?255:0, this.weight>0?255:0, 0);
        strokeWeight(Math.abs(this.weight));
        line(this.neuron.x, this.neuron.y, out.x, out.y);
    }
}