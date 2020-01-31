//#region declaration variables
let body = document.body;

let button = document.getElementById("enterBtn");
button.addEventListener("click", doGreeting);



let nama = document.getElementById("username").value;
let form = document.getElementById("form");
form.addEventListener("submit", doGreeting);
let greeting = document.getElementById("greeting");
let stopwatch = document.getElementById("stopwatch");
// let recordListDiv = document.getElementById("recordList");
let recordTable = document.getElementById("recordTable");
//#endregion


// #region change color
function changeColor() {
    let flag = false;
    function change() {
        if (!flag) {
            body.style.backgroundColor = "salmon";
        } else {
            body.style.backgroundColor = "whitesmoke";
        }
        flag = !flag
        // setTimeout(stopChangeColor,500);
    }
    interval = setInterval(change, 1000);
    // body.style.backgroundColor = "whitesmoke";
    
}

function changeBackgroundColor(color){
    function reset(){
        body.style.backgroundColor = "whitesmoke";
    }
    body.style.backgroundColor = color;
    setTimeout(reset, 200)
}

function stopChangeColor() {
    clearInterval(interval);
    body.style.backgroundColor = "whitesmoke";
    flag = false;
}
//#endregion

// #region stopwatch

//#region stopwatch variables
let interval;
let stopwatchInterval;
let time = 0;
let minute = 0;
let second = 0;
let ms = 0;
let startTime;
let recordList = [];
let isRecord = false;

let minuteLabel = document.getElementById("minute");
let secondLabel = document.getElementById("second");
let msLabel = document.getElementById("ms");

let startBtn = document.getElementById("start");
// startBtn.addEventListener("click", changeColor);
startBtn.addEventListener("click", startStopwatch);

let stopBtn = document.getElementById("stop");
// stopBtn.addEventListener("click", stopChangeColor);
stopBtn.addEventListener("click", stopStopwatch);

let pauseBtn = document.getElementById("pause");
pauseBtn.addEventListener("click", pauseStopwatch);

let recordBtn = document.getElementById("record");
recordBtn.addEventListener("click", recordStopwatch);
//#endregion

function hideButton() {
    pauseBtn.style.display = "none";
    recordBtn.style.display = "none";
    stopBtn.style.display = "none";
}

function showButton() {
    pauseBtn.style.display = "inline-block";
    recordBtn.style.display = "inline-block";
    stopBtn.style.display = "inline-block";
}

function startStopwatch() {
    if (!stopwatchInterval) {
        let delay = 1;
        startTime = Date.now();
        stopwatchInterval = setInterval(update, delay);
        showButton();
        if (minute == 0 && second == 0 && ms == 0) {
            recordTable.innerHTML = "";
            recordList = [];
        }
    }
    changeBackgroundColor("LightGreen");
}

function stopStopwatch() {
    pauseStopwatch();
    time = 0;
    minute = 0;
    second = 0;
    ms = 0;
    render();
    hideButton();
    changeBackgroundColor("LightCoral");
}

function pauseStopwatch() {
    startTime = Date.now();
    clearInterval(stopwatchInterval);
    stopwatchInterval = undefined;
    changeBackgroundColor("khaki");
}

function recordStopwatch() {
    isRecord = true;
    renderTable();
    changeBackgroundColor("salmon");
    // body.style.backgroundColor = "salmon";
}

function update() {
    let now = Date.now();
    let selisih = (now - startTime) / 1000;
    startTime = now;
    time += selisih;

    render();
}

function render() {
    if (time >= 1) {
        second++;
        time--;
    }
    if (second >= 60) {
        minute++;
        second -= 60;
    }
    ms = Math.floor(time * 100);

    if (String(minute).length < 2) {
        minute = "0" + String(minute)
    }
    if (String(second).length < 2) {
        second = "0" + String(second)
    }
    if (String(ms).length < 2) {
        ms = "0" + String(ms)
    }
    minuteLabel.innerText = minute;
    secondLabel.innerText = second;
    msLabel.innerText = ms;
}

//#endregion

function renderTable() {
    if (isRecord) {
        let string = `${minute} : ${second} : ${ms}`
        recordList.push(string);
        if (recordList.length > 10) {
            recordList.shift();
        }
        isRecord = false;
    }
    let html = "";
    for (let i = 0; i < recordList.length; i++) {
        html += "<tr> <td>" + (i + 1) + "</td> <td>" + recordList[i] + "</td> </tr> ";
    }
    recordTable.innerHTML = html;
}

//#region main process
function doGreeting() {
    form.style.display = "none";
    nama = document.getElementById("username").value;
    if (!nama) {
        nama = "Anonymous";
    }
    // nama[0] = nama[0].toUpperCase();
    greeting.innerHTML = "<h1>Hello, " + upperCaseName(nama) + "!</h1>";
    greeting.style.display = "block";
    stopwatch.style.display = "block";
}

function upperCaseName(name){
    let result = "";
    for(let i = 0; i<name.length; i++){
        if(i==0){
            result += name[i].toUpperCase();
        } else{
            result += name[i];
        }
    }
    return result
}

hideButton();
//#endregion