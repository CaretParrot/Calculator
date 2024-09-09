mathPlus.settings.rounding = 5;
mathPlus.settings.degrees = false;
document.getElementById("input").focus();

function evaluateInput() {
    if (document.getElementById("input").value.includes("document")) {
        document.getElementById("input").value = "";
    }
    let newOutput = Function(`return ${document.getElementById("input").value}`)();
    if (newOutput === undefined || newOutput === null) {
        document.getElementById("output").innerHTML = "...";
    } else {
        document.getElementById("output").innerHTML = mathPlus.roundToPlaces(newOutput);
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

    document.getElementById(id).style.display = "flex";
}

onkeydown = function (event) {
    if (event.key === "Enter" && document.getElementById("input").value !== "") {
        let output = +document.getElementById("output").innerHTML;
        let newButton = document.createElement("button");
        let buttonText = document.createTextNode(`${document.getElementById("input").value} = ${output}`);
        newButton.appendChild(buttonText);
        newButton.onclick = "navigator.clipboard.writeText(output)";
        newButton.class = "historyButton";
        document.getElementById("history").appendChild(newButton);
        document.getElementById("input").value = "";
        evaluateInput();
    }
}