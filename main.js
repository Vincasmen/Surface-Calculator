window.onload = function () {
  document.getElementById("submit-button").onclick = function () {
    const pi = "3.141592654";
    var outerDiameter = document.getElementById("outer-diameter").value,
      cilinderLength = document.getElementById("length-of-the-cilinder").value,
      output = document.getElementById("output-box");

    output.innerHTML = (pi * outerDiameter * cilinderLength).toFixed(2);
  };
};

const dropDownOption = document.querySelectorAll("#dropdown-options");
console.log(dropDownOption);
for (i = 0; i < dropDownOption.length; i++) {
  dropDownOption[i].addEventListener("click", function () {
    console.log(innerHTML);
  });
}
