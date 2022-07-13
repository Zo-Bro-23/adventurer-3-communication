const timecut = require('timecut');
timecut({
    url: 'https://tungs.github.io/amuse/truchet-tiles/#autoplay=true&switchStyle=random',
    viewport: {
        width: 800,               // sets the viewport (window size) to 800x600
        height: 600
    },
    selector: '#container',     // crops each frame to the bounding box of '#container'
    left: 20, top: 40,          // further crops the left by 20px, and the top by 40px
    right: 6, bottom: 30,       // and the right by 6px, and the bottom by 30px
    fps: 30,                    // saves 30 frames for each virtual second
    duration: 10,               // for 20 virtual seconds 
    output: 'video2.mp4',         // to video.mp4 of the current working directory,
    outputStreamOptions: ['-filter:v "setpts=0.5*PTS"']
}).then(function () {
    console.log('Done!');
});