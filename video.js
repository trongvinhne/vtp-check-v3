// ============================
// video.js
// ============================

async function prepareFrames(){

    return new Promise((resolve)=>{

        if(!video.videoWidth){

            video.onloadedmetadata=()=>{

                resolve([]);

            };

            return;

        }

        resolve([]);

    });

}