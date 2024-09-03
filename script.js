window.onload = function () {
    mathPlus.settings.rounding = 5;
}

function evaluateInput() {
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