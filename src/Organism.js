class Organism {

    constructor(json) {
        this.name = json.name;
        this.generation = json.generation;
        this.naturalGeneration = json.naturalGeneration;
        this.namespace = json.namespace;
        this.ownerUsername = json.owner_username;
        this.score = json.score;
        this.speciesNamespace = json.speciesNamespace;
        this.trainingRoomNamespace = json.trainingRoomNamespace;
        this.ttl = json.ttl;
        this.neuralNetwork = new NeuralNetwork(json.nNet);

    }

    render() {
        this.neuralNetwork.render();
    }
}