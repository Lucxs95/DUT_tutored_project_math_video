hash = window.location.hash;
const pageName = "cours";
var data = {};
var name;
var number;
var url;
const video = document.getElementById("video");
const title = document.getElementById("title");
const nextPage = document.getElementById("nextPage");
const previousPage = document.getElementById("previousPage");
const quiz = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const quizContainer = document.getElementById("quizContainer");
if (hash == "") {
    window.location.href = "./ListeCours.html";
} else {
    genVar(hash);
    getData(url);
}

function genVar(hash) {
    let temp = hash.substring(1, hash.length);
    temp = temp.split("_");
    if (temp.length == 2) {
        name = temp[0];
        number = parseInt(temp[1], 10);
        numberString = number.toString();
        url = `./data/${name}.json`;
    } else {
        throw new Error();
    }
}

window.onhashchange = async function (event) {
    const urlObject = new URL(event.newURL);
    hash = urlObject.hash;
    genVar(hash);
    if (data[name]) {
        if (data[name].page && data[name].page[numberString]) {
            renderData(data[name].page[numberString]);
        }
    } else {
        await getData(url);
    }
};

async function getData(url) {
    const response = await fetch(url);
    data[name] = await response.json();

    if (data[name] && data[name].page) {
        numberMaxPage = Object.keys(data[name].page).length;
        if (data[name].page[numberString]) {
            renderData(data[name].page[numberString]);
        }
    }
}

function renderData(coursData) {
    video.src = coursData.src;
    title.innerHTML = `${coursData.title} (${number}/${numberMaxPage})`;
    if (data[name].page[(number - 1).toString()]) {
        previousPage.className = "";
        previousPage.href = `./${pageName}#${name}_${number - 1}`;
    } else {
        previousPage.className = "hide";
    }
    if (data[name].page[(number + 1).toString()]) {
        nextPage.className = "";
        nextPage.href = `./${pageName}#${name}_${number + 1}`;
    } else {
        nextPage.className = "hide";
    }
    if (coursData.questions) {
        quizContainer.className = "";
        generateQuiz(coursData.questions, quiz, resultsContainer, submitButton);
    } else {
        quizContainer.className = "hide";
    }
}
