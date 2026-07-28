// ==========================
// VTP Check V3
// video.js
// ==========================

const FRAME_INTERVAL = 200; // ms (~5 fps)

let extractedFrames = [];

async function extractFrames(videoElement){

    extractedFrames = [];

    return new Promise(resolve=>{

        const canvas=document.createElement("canvas");

        const ctx=canvas.getContext("2d");

        canvas.width=videoElement.videoWidth;
        canvas.height=videoElement.videoHeight;

        let current=0;

        function capture(){

            if(current>=videoElement.duration){

                resolve(extractedFrames);
                return;

            }

            videoElement.currentTime=current;

        }

        videoElement.onseeked=()=>{

            ctx.drawImage(
                videoElement,
                0,
                0,
                canvas.width,
                canvas.height
            );

            extractedFrames.push(
                canvas.toDataURL("image/jpeg",0.9)
            );

            current+=FRAME_INTERVAL/1000;

            capture();

        };

        capture();

    });

}
async function prepareFrames(){

    if(!video.src){

        alert("Chưa có video.");

        return [];

    }

    progressBar.style.width="5%";

    const frames=await extractFrames(video);

    progressBar.style.width="40%";

    console.log("Frames:",frames.length);

    return frames;

}