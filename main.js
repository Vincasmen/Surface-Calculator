window.onload = function () {
  document.getElementById("submit-button").onclick = function () {
    const pi = "3.141592654";
    var outerDiameter = document.getElementById("outer-diameter").value,
      cilinderLength = document.getElementById("length-of-the-cilinder").value,
      output = document.getElementById("output-box");

    output.innerHTML = (pi * outerDiameter * cilinderLength).toFixed(2);
  };
};
