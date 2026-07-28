// ======================================
// VTP Check V3
// app.js
// ======================================

const App = {

    video:null,

    input:null,

    scanBtn:null,

    result:null,

    progress:null,

    qrBtn:null,

    zipBtn:null,

    frames:[],

    init(){

        this.video=document.getElementById("video");

        this.input=document.getElementById("videoInput");

        this.scanBtn=document.getElementById("scanBtn");

        this.result=document.getElementById("result");

        this.progress=document.getElementById("progressBar");

        this.qrBtn=document.getElementById("qrBtn");

        this.zipBtn=document.getElementById("zipBtn");

        this.input.addEventListener(
            "change",
            this.selectVideo.bind(this)
        );

        this.scanBtn.addEventListener(
            "click",
            this.scan.bind(this)
        );

    },

    selectVideo(e){

        const file=e.target.files[0];

        if(!file){

            return;

        }

        this.video.src=
            URL.createObjectURL(file);

        this.result.value=

`✔ Đã chọn video

Tên:

${file.name}

Dung lượng:

${(file.size/1024/1024).toFixed(2)} MB`;

    },
        async scan(){

        this.result.value+="\n\nĐang chuẩn bị...";

        this.progress.style.width="5%";

        const frames=
            await VideoEngine.extract(
                this.video,
                p=>{

                    this.progress.style.width=
                    p+"%";

                }
            );

        this.frames=frames;

        this.result.value+=

`\n\nĐã lấy ${frames.length} frame`;

    }

};

window.onload=()=>{

    App.init();

};