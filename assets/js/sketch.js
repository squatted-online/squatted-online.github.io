
let hh, clap, bass; // hi hat
let hh_pattern, clap_pattern, bass_pattern;
let hh_phrase, clap_phrase, bass_phrase;
let hh_filter, clap_filter, bass_filter;
let drums;



hh_pattern =   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
clap_pattern = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
bass_pattern = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0];

const drum_machine = document.querySelector('.drum-machine');
const hh_elt = document.createElement('div');
hh_elt.setAttribute('class', 'beat');

const clap_elt = document.createElement('div');
clap_elt.setAttribute('class', 'beat');

const bass_elt = document.createElement('div');
bass_elt.setAttribute('class', 'beat');

for (const beat of hh_pattern) {
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = beat === 1 ? true : false;
    hh_elt.appendChild(input);
}

for (const beat of clap_pattern) {
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = beat === 1 ? true : false;
    clap_elt.appendChild(input);

}

for (const beat of bass_pattern) {
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = beat === 1 ? true : false;
    bass_elt.appendChild(input);
}

drum_machine.appendChild(hh_elt);
drum_machine.appendChild(clap_elt);
drum_machine.appendChild(bass_elt);

function setup() {
    noCanvas();
    hh = loadSound('assets/drum_samples/hoover.wav', () => { });
    clap = loadSound('assets/drum_samples/clap_sample.mp3', () => { });
    bass = loadSound('assets/drum_samples/gabber-kick-00002.wav', () => { });

    hh_phrase = new p5.Phrase('hh', (time) => {
        hh.play(time)
    }, hh_pattern);

    clap_phrase = new p5.Phrase('clap', (time) => {
        clap.play(time)
    }, clap_pattern);
    
    bass_phrase = new p5.Phrase('bass', (time) => {
        bass.play(time)
    }, bass_pattern);

    drums = new p5.Part();

    drums.addPhrase(hh_phrase);
    drums.addPhrase(clap_phrase);
    drums.addPhrase(bass_phrase);

    drums.setBPM('147');

    hh_filter = new p5.LowPass();
    clap_filter = new p5.LowPass();
    bass_filter = new p5.HighPass();

    hh.connect(hh_filter)
    clap.connect(clap_filter)
    bass.connect(bass_filter)

}

panels = document.getElementsByClassName('panel');
function draw() {
    const hh_inputs = hh_elt.childNodes;
    const clap_inputs = clap_elt.childNodes;
    const bass_inputs = bass_elt.childNodes;
    let index = 0;
    for (const node of hh_inputs) {
        const val = node.checked === true ? 1 : 0;
        hh_pattern[index] = val;
        index++
    }
    index = 0;
    for (const node of clap_inputs) {
        const val = node.checked === true ? 1 : 0;
        clap_pattern[index] = val;
        index++
    }
    index = 0;
    for (const node of bass_inputs) {
        const val = node.checked === true ? 1 : 0;
        bass_pattern[index] = val;
        index++
    }
    const hh_freq = parseFloat(document.getElementById('hh-lpf').value);
    hh_filter.freq(hh_freq);
    const clap_freq = parseFloat(document.getElementById('clap-lpf').value);
    clap_filter.freq(clap_freq);
    const bass_freq = parseFloat(document.getElementById('bass-lpf').value);
    bass_filter.freq(bass_freq);

    if (hh.isPlaying() && hh.currentTime() != 0) {
        panels[0].style.boxShadow = '7px 7px #ff3';
        panels[1].style.boxShadow = '7px 7px #ff3';
    } else {
        panels[0].style.boxShadow = '5px 5px #f33';
        panels[1].style.boxShadow = '5px 5px #f33';
    }

    // if (clap.isPlaying() && clap.currentTime() != 0) {
    //     document.querySelector('.claps').style.visibility = 'visible';
    // } else {
    //     document.querySelector('.claps').style.visibility = 'hidden';
    // }

    if (bass.isPlaying() && bass.currentTime() != 0) {
        document.body.style.backgroundColor = '#000';
    } else {
        document.body.style.backgroundColor = '#fff';
    }
}

function make_random_pattern() {
    const hh_inputs = hh_elt.childNodes;
    const clap_inputs = clap_elt.childNodes;
    const bass_inputs = bass_elt.childNodes;
    let index = 0;
    for (const node of hh_inputs) {
        if (Math.random() < 0.5) {
            node.checked = true
        } else {
            node.checked = false
        }
    }
    index = 0;
    for (const node of clap_inputs) {
        if (Math.random() < 0.5) {
            node.checked = true
        } else {
            node.checked = false
        }
    }
    index = 0;
    for (const node of bass_inputs) {
        if (Math.random() < 0.5) {
            node.checked = true
        } else {
            node.checked = false
        }
    }
}

function keyPressed() {
    if (key === ' ') {
        if (hh.isLoaded() && clap.isLoaded() && bass.isLoaded()) {
            if (!drums.isPlaying) {
                drums.loop();
            } else {
                drums.stop()
            }
        }
    }
    // make_random_pattern()
}

function mousePressed(){
    // make_random_pattern()
}

// setInterval(make_random_pattern, 5000)
