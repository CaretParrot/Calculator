mathPlus.settings.rounding = 5;
mathPlus.settings.degrees = false;
const regExp = new RegExp("a-zA-Z", "ig");
document.getElementById("input").focus();

function evaluateInput() {
    let newOutput = Function(`"use strict"; return ${document.getElementById("input").value};`)();
    if (+newOutput === undefined || +newOutput === null || isNaN(+newOutput) || +newOutput >= 16331239353195370 || Math.abs(+newOutput) === Infinity) {
        document.getElementById("output").innerHTML = "...";
    } else {
        document.getElementById("output").innerHTML = `${mathPlus.roundToPlaces(newOutput)}`;
    }
}

document.getElementById("input").oninput = function (event) {
    evaluateInput();
}

document.getElementById("rounding").oninput = function (event) {
    mathPlus.settings.rounding = +document.getElementById("rounding").value;
    evaluateInput();
}

document.getElementById("angleType").oninput = function (event) {
    if (document.getElementById("angleType").value === "degrees") {
        mathPlus.settings.degrees = true;
    } else {
        mathPlus.settings.degrees = false;
    }
    
    evaluateInput();
}

function switchPage(id, sharedClass) {
    allPages = document.getElementsByClassName(sharedClass);
    for (let i = 0; i < allPages.length; i++) {
        allPages[i].style.display = "none";
    }

    document.getElementById(id).style.display = "grid";
}

onkeydown = function (event) {
    if (event.key === "Enter" && document.getElementById("input").value !== "") {
        let output = +document.getElementById("output").innerHTML;
        let newOption = document.createElement("option");
        let optionText = document.createTextNode(`${document.getElementById("input").value} = ${output}`);
        newOption.appendChild(optionText);
        newOption.value = output;
        newOption.class = "historyOption";
        newOption.selected = true;
        document.getElementById("historySelect").appendChild(newOption);
        document.getElementById("input").value = "";
        evaluateInput();
    }
}

document.getElementById("historySelect").oninput = function (event) {
    navigator.clipboard.writeText(document.getElementById("historySelect").value);
}