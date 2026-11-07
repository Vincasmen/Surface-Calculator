window.onload = function () {
  const form = document.getElementById("calculator-form");
  const diameterInput = document.getElementById("outer-diameter");
  const lengthInput = document.getElementById("length-of-the-cylinder");
  const unitSelect = document.getElementById("unit-select");
  const lateralOutput = document.getElementById("lateral-surface");
  const totalOutput = document.getElementById("total-surface");
  const errorMessage = document.getElementById("error-message");

  function formatArea(value, unit) {
    return (
      value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      " " +
      unit +
      "²"
    );
  }

  function calculate() {
    const outerDiameter = parseFloat(diameterInput.value);
    const cylinderLength = parseFloat(lengthInput.value);
    const unit = unitSelect.value;

    diameterInput.setAttribute("aria-invalid", !(outerDiameter > 0));
    lengthInput.setAttribute("aria-invalid", !(cylinderLength > 0));

    if (!(outerDiameter > 0) || !(cylinderLength > 0)) {
      errorMessage.textContent = "Enter a positive diameter and length.";
      errorMessage.hidden = false;
      lateralOutput.textContent = "–";
      totalOutput.textContent = "–";
      return;
    }

    const radius = outerDiameter / 2;
    const lateralSurface = Math.PI * outerDiameter * cylinderLength;
    const totalSurface = lateralSurface + 2 * Math.PI * radius * radius;

    errorMessage.hidden = true;
    lateralOutput.textContent = formatArea(lateralSurface, unit);
    totalOutput.textContent = formatArea(totalSurface, unit);
  }

  // Covers both the button and pressing Enter in an input
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    calculate();
  });
};
