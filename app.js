class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/hihat-acoustic01.wav';
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }
    activePad() {
        this.classList.toggle('active');
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //Loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //Check if pads are active
            if(bar.classList.contains("active")) {
                //Check each sound
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        //Check if it's playing
        if (this.isPlaying) { //it means that it is currently playing now
            //Clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        } else {
                this.isPlaying = setInterval(() => { //if do not to use arrow function k.word "this" will refer to the window bject
                this.repeat(); //but using ar.func let us grab this repeat
            }, interval);
        }
        // if (!this.isPlaying) { //it means that it is currently playing now
        //     this.isPlaying = setInterval(() => { //if do not to use arrow function k.word "this" will refer to the window bject
        //         this.repeat(); //but using ar.func let us grab this repeat
        //     }, interval);
        // } else {
        //     //Clear the interval
        //     clearInterval(this.isPlaying);
        //     this.isPlaying = null;
        // }
    }
    updateBtn() {
        if (!this.isPlaying) {//check the opposite of NULL
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }

    changeSound(e) { //e.target returns an actual select (with it's name, id and option)
        const selectionName = e.target.name; //e.target.name returns an actual select nsame (ex: name="snare-select")
        const selectionValue = e.target.value; //e.target.value returns the value of selected option in this select (./sounds/snare-acoustic01.wav)
        switch(selectionName) {
            case 'kick-select':
                this.kickAudio.src = selectionValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectionValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectionValue;
                break;
        }
    }

    mute(e){
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')) {
            switch(muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                
                case "1":
                    this.snareAudio.volume = 0;
                    break;

                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            switch(muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                
                case "1":
                    this.snareAudio.volume = 1;
                    break;

                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }

    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr');
        
        tempoText.innerText = e.target.value;
    }

    updateTempo(e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
            this.start();
        }
    }
}

const drumKit = new DrumKit();

//Event listeners

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function() {
        this.style.animation = "";
    });
});

 drumKit.playBtn.addEventListener('click', function() { //can't use arr.f. here as in repeat() this is refer to the play button
    drumKit.updateBtn();
    drumKit.start(); // (this doesn't mean index, but button in this case)
 });

 drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e) { //we can't invoke drKitChange after 'change'
        drumKit.changeSound(e); //as it would be invoked immediately, but we need a refernce to it
    }); //that's why we call callback function
 });

 drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        drumKit.mute(e);
    });
 });

 drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);
 });

 drumKit.tempoSlider.addEventListener("change", function(e) {
    drumKit.updateTempo(e);
 })