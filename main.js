window.onload = function () {
  const dropdownButton = document.getElementById("dropdown-btn");
  const output = document.getElementById("output-box");
  let unit = "mm";

  // Unit dropdown: remember the chosen unit and show it on the button
  const dropDownOptions = document.querySelectorAll("#dropdown-options a");
  for (let i = 0; i < dropDownOptions.length; i++) {
    dropDownOptions[i].addEventListener("click", function (event) {
      event.preventDefault();
      unit = this.textContent;
      dropdownButton.textContent = "Unit: " + unit;
    });
  }

  function calculate() {
    const outerDiameter = parseFloat(
      document.getElementById("outer-diameter").value
    );
    const cylinderLength = parseFloat(
      document.getElementById("length-of-the-cylinder").value
    );

    if (!(outerDiameter > 0) || !(cylinderLength > 0)) {
      output.textContent = "Enter a positive diameter and length.";
      return;
    }

    const radius = outerDiameter / 2;
    const lateralSurface = Math.PI * outerDiameter * cylinderLength;
    const totalSurface = lateralSurface + 2 * Math.PI * radius * radius;

    output.innerHTML =
      "<span>Lateral surface: " + lateralSurface.toFixed(2) + " " + unit + "²</span>" +
      "<span>Total surface: " + totalSurface.toFixed(2) + " " + unit + "²</span>";
  }

  document.getElementById("submit-button").onclick = calculate;

  // Pressing Enter in an input would submit the form and reload the page
  const forms = document.querySelectorAll(".input-field form");
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (event) {
      event.preventDefault();
      calculate();
    });
  }
};
