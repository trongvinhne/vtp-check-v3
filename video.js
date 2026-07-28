// ======================================
// VTP Check V3
// video.js
// ======================================

const VideoEngine = {

    fps: 5,

    async extract(video, progress) {

        if (!video.src) {

            alert("Chưa chọn video");

            return [];

        }

        await this.waitReady(video);

        const duration = video.duration;

        const canvas = document.createElement("canvas");

        canvas.width = video.videoWidth;

        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        const frames = [];

        const step = 1 / this.fps;

        let current = 0;

        let total = Math.ceil(duration / step);

        let index = 0;

        while (current < duration) {

            await this.seek(video, current);

            ctx.drawImage(
                video,
                0,
                0,
                canvas.width,
                canvas.height
            );

            frames.push({

                time: current,

                image: canvas.toDataURL(
                    "image/jpeg",
                    0.85
                )

            });

            index++;

            if (progress) {

                progress(
                    Math.floor(index / total * 100)
                );

            }

            current += step;

        }

        return frames;

    },
        waitReady(video){

        return new Promise(resolve=>{

            if(video.readyState>=1){

                resolve();

                return;

            }

            video.onloadedmetadata=()=>{

                resolve();

            };

        });

    },

    seek(video,time){

        return new Promise(resolve=>{

            video.currentTime=time;

            video.onseeked=()=>{

                resolve();

            };

        });

    }

};