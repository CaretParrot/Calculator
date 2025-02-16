mathPlus.settings.rounding = 5;
mathPlus.settings.degrees = false;
const regExp = new RegExp("a-zA-Z", "ig");
document.getElementById("input").focus();

function evaluateInput() {
    let newOutput;

    try {
        newOutput = Function(`"use strict"; return ${document.getElementById("input").value};`)();
    }

    catch (err) {
        return "...";
    }

    if (isNaN(+newOutput) || +newOutput >= 16331239353195370) {
        return "...";
    } else {
        return `${mathPlus.roundToPlaces(newOutput)}`;
    }
}

document.getElementById("input").oninput = function (event) {
    document.getElementById("output").innerHTML = evaluateInput();
}

document.getElementById("rounding").oninput = function (event) {
    mathPlus.settings.rounding = +document.getElementById("rounding").value;
    document.getElementById("output").innerHTML = evaluateInput();
}

document.getElementById("angleType").onchange = function (event) {
    if (document.getElementById("angleType").value === "degrees") {
        mathPlus.settings.degrees = true;
    } else {
        mathPlus.settings.degrees = false;
    }
    
    document.getElementById("output").innerHTML = evaluateInput();
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
        navigator.clipboard.writeText(evaluateInput(document.getElementById("output").value));
        let output = +document.getElementById("output").innerHTML;
        let newOption = document.createElement("option");
        let optionText = document.createTextNode(`${document.getElementById("input").value} = ${output}`);
        newOption.appendChild(optionText);
        newOption.value = output;
        newOption.class = "historyOption";
        newOption.selected = true;
        document.getElementById("historySelect").appendChild(newOption);
        document.getElementById("input").value = "";
        document.getElementById("output").innerHTML = evaluateInput();
    }
}

document.getElementById("historySelect").oninput = function (event) {
    navigator.clipboard.writeText(document.getElementById("historySelect").value);
}