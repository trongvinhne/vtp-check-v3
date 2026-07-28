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