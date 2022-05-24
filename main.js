//Trying to figure out why are values coming back as strings instead of numbers so I can apply If Else for Aler message

// const lengthCilinder = document.getElementById("length-of-the-cilinder");
// const submitBtn = document.getElementById("submit-button");

// submitBtn.addEventListener("click", function () {
//   input();
//   console.log(typeof lengthCilinder);
// });

// const input = function () {
//   lengthCilinder.value;
// };

window.onload = function () {
  document.getElementById("submit-button").onclick = function () {
    const pi = "3.141592654";
    var outerDiameter = document.getElementById("outer-diameter").value,
      cilinderLength = document.getElementById("length-of-the-cilinder").value,
      output = document.getElementById("output-box");

    //Failed attempt for If else statement for alert message

    // if (outerDiameter.value <= 0) {
    //   alert("!!!");
    // console.log(typeof outerDiameter, cilinderLength, pi);
    // } else {
    output.innerHTML = (pi * outerDiameter * cilinderLength).toFixed(2);
  };
};
// };
