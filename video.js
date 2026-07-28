// =========================================
// video.js
// =========================================

export async function prepareFrames(video, progress){

    await new Promise(r=>setTimeout(r,300));

    const frames=[];

    const total=20;

    for(let i=1;i<=total;i++){

        await new Promise(r=>setTimeout(r,30));

        progress(i,total);

        frames.push({
            index:i
        });

    }

    return frames;

}