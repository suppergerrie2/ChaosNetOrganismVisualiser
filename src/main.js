var neuronSize = 25;

var organism;

function setup() {

    let fileInput = createFileInput(handleFileUpload);
    fileInput.position(windowWidth - fileInput.width, 10);

    createCanvas(windowWidth-fileInput.width, windowHeight);
    loadJSON("test-files/DELETEME.json", receivedOrganism);
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

    organism = new Organism(data);
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