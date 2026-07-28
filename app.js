// ============================
// VTP Check V3
// app.js
// ============================

const videoInput = document.getElementById("videoInput");
const video = document.getElementById("video");

const scanBtn = document.getElementById("scanBtn");

const result = document.getElementById("result");

const progressBar = document.getElementById("progressBar");

let selectedVideo = null;

videoInput.addEventListener("change", loadVideo);

scanBtn.addEventListener("click", startScan);

function loadVideo(e){

    const file = e.target.files[0];

    if(!file){

        return;

    }

    selectedVideo = file;

    const url = URL.createObjectURL(file);

    video.src = url;

    video.load();

    result.value =
`✔ Đã chọn video

Tên:
${file.name}

Dung lượng:
${(file.size/1024/1024).toFixed(2)} MB`;

}
function startScan(){

    if(!selectedVideo){

        alert("Hãy chọn video.");

        return;

    }

    scanBtn.disabled = true;

    scanBtn.innerText = "Đang chuẩn bị...";

prepareFrames().then(frames=>{

    progressBar.style.width="100%";

    result.value +=
`\n\nĐã trích xuất ${frames.length} frame.\nSẵn sàng OCR.`;

});

}
function fakeProgress(){

    let p = 0;

    progressBar.style.width = "0%";

    const timer = setInterval(()=>{

        p += 2;

        progressBar.style.width = p + "%";

        if(p>=100){

            clearInterval(timer);

            scanBtn.disabled = false;

            scanBtn.innerText = "Bắt đầu quét";

            result.value +=

`\n\n✔ Module Video hoạt động.

Sẵn sàng chuyển sang OCR.`;

        }

    },40);

}
<script async src="https://docs.opencv.org/4.x/opencv.js"></script>
<script src="video.js"></script>
<script src="app.js"></script>