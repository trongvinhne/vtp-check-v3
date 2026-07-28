// =========================================
// VTP Check V3
// app.js
// =========================================

import { prepareFrames } from "./video.js";

const $ = (id) => document.getElementById(id);

const ui = {
    videoInput: $("videoInput"),
    video: $("video"),
    scanBtn: $("scanBtn"),
    result: $("result"),
    progressBar: $("progressBar"),
    qrBtn: $("qrBtn"),
    zipBtn: $("zipBtn")
};

const state = {
    file: null,
    frames: [],
    codes: [],
    busy: false
};

window.addEventListener("error", (e) => {
    alert(
        "Lỗi:\n" +
        e.message
    );
});

init();

function init() {

    ui.videoInput.addEventListener(
        "change",
        onVideoSelected
    );

    ui.scanBtn.addEventListener(
        "click",
        onScan
    );

}

async function onVideoSelected(e) {

    const file = e.target.files[0];

    if (!file) return;

    state.file = file;

    ui.video.src =
        URL.createObjectURL(file);

    ui.result.value =
`✔ Đã chọn video

Tên:
${file.name}

Dung lượng:
${(file.size / 1024 / 1024).toFixed(2)} MB`;

}
// =========================================
// Scan
// =========================================

async function onScan() {

    if (state.busy) return;

    if (!state.file) {

        alert("Hãy chọn video trước.");

        return;

    }

    state.busy = true;

    ui.scanBtn.disabled = true;

    ui.scanBtn.textContent = "Đang xử lý...";

    setProgress(5);

    ui.result.value += "\n\n⏳ Đang đọc video...";

    try {

        state.frames = await prepareFrames(
            ui.video,
            updateProgress
        );

        ui.result.value +=
`\n\n✅ Đã lấy ${state.frames.length} frame`;

        setProgress(100);

    } catch (err) {

        alert(err.message);

    } finally {

        state.busy = false;

        ui.scanBtn.disabled = false;

        ui.scanBtn.textContent = "Bắt đầu quét";

    }

}
// =========================================
// Progress
// =========================================

function setProgress(percent){

    ui.progressBar.style.width =
        percent + "%";

}

function updateProgress(current,total){

    if(total===0){

        setProgress(0);

        return;

    }

    const percent =
        Math.floor(current/total*100);

    setProgress(percent);

}