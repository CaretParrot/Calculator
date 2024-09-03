document.getElementById("input").oninput = function (event) {
    let newOutput = Function(`return ${document.getElementById("input").value}`)();
    if (newOutput === undefined || newOutput === null) {
        document.getElementById("output").innerHTML = "...";
    } else {
        document.getElementById("output").innerHTML = Function(`return ${document.getElementById("input").value}`)();
    }
}