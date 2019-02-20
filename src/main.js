var neuronSize = 50;

var organism;

function setup() {

    let fileInput = createFileInput(handleFileUpload);
    fileInput.position(windowWidth - fileInput.width, 10);

    createCanvas(windowWidth-fileInput.width, windowHeight);
    loadJSON("adam-0.json", receivedOrganism);
}

function draw() {
    background(0);

    if(organism!==undefined) {
        organism.render();
    }
}

function receivedOrganism(data) {
    if(typeof(data)==="string") {
        data = JSON.parse(data);
    } else if (typeof(data)!="object") {
        console.error("Invalid data for organisms!");
        return;
    }

    if(Array.isArray(data)) {
        for(let i of data) {
            receivedOrganism(data);
        }
    }

    console.log(data);

    organism = new Organism(data);
    console.log(organism);

}

function handleFileUpload(data) {
    if(data.subtype === "json") {
        let fileReader = new FileReader();

        fileReader.onload = (e) => {
            receivedOrganism(e.target.result);
        };

        fileReader.readAsText(data.file);
    }
}