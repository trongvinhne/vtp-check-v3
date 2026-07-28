// ============================
// VTP Check V3
// app.js
// ============================
alert("app.js đã được tải");
const videoInput = document.getElementById("videoInput");
const video = document.getElementById("video");
const scanBtn = document.getElementById("scanBtn");
const result = document.getElementById("result");
const progressBar = document.getElementById("progressBar");

let selectedVideo = null;

window.onerror = function (message, source, line) {
    alert("Lỗi:\n" + message + "\nDòng: " + line);
};

videoInput.addEventListener("change", loadVideo);
scanBtn.addEventListener("click", startScan);

function loadVideo(e) {
    const file = e.target.files[0];

    if (!file) return;

    selectedVideo = file;

    video.src = URL.createObjectURL(file);

    result.value =
`✔ Đã chọn video

Tên: ${file.name}

Dung lượng: ${(file.size/1024/1024).toFixed(2)} MB`;
}

async function startScan() {

    if (!selectedVideo) {
        alert("Hãy chọn video");
        return;
    }

    scanBtn.disabled = true;
    scanBtn.innerText = "Đang xử lý...";

    progressBar.style.width = "10%";

    try {

        const frames = await prepareFrames();

        progressBar.style.width = "100%";

        result.value +=
`\n\n✔ Đã lấy ${frames.length} frame`;

    } catch(err){

        alert(err.message);

    }

    scanBtn.disabled = false;
    scanBtn.innerText = "Bắt đầu quét";

}