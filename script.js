console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
console.log(masterPlay);
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

function formatDuration(duration) {
    var minutes = Math.floor(duration / 60);
    var seconds = Math.floor(duration % 60);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

let songs = [
    {songName: "On Top", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpeg", time: "3:03"},
    {songName: "Baller", filePath: "songs/2.mp3", coverPath: "covers/cover2.jpeg", time: "2:28"},
    {songName: "Players", filePath: "songs/3.mp3", coverPath: "covers/cover3.jpeg", time: "2:51"},
    {songName: "Daku", filePath: "songs/4.mp3", coverPath: "covers/cover4.jpeg", time: "2:14"},
    {songName: "Her", filePath: "songs/5.mp3", coverPath: "covers/cover5.jpeg", time: "2:34"},
    {songName: "Summer High", filePath: "songs/6.mp3", coverPath: "covers/cover6.jpeg", time: "3:25"},
    {songName: "Mehrma", filePath: "songs/7.mp3", coverPath: "covers/cover7.jpeg", time: "4:09"},
    {songName: "Taur", filePath: "songs/8.mp3", coverPath: "covers/cover8.jpeg", time: "2:48"},
    {songName: "Rubicon Drill", filePath: "songs/9.mp3", coverPath: "covers/cover9.jpeg", time: "3:08"},
    {songName: "Bewafa", filePath: "songs/10.mp3", coverPath: "covers/cover10.jpeg", time: "3:42"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    let audioElement = new Audio(songs[i].filePath);
    let durationField = element.getElementsByClassName("timeValue")[0];
    durationField.innerHtml = songs[i].time;
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        console.log(e.target.id);
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
