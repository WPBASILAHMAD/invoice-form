/** @format */

// Collar Size Selection
document.getElementById("collarSize")?.addEventListener("change", function () {
  let selectedValue = this.value;
  localStorage.setItem("selectedCollarSize", selectedValue);
  window.dispatchEvent(new Event("collarSizeUpdated"));
});

// Chase Cover Dropdown Logic
document.getElementById("chaseCover")?.addEventListener("change", updateFields);

function updateFields() {
  let dropdownValue = document.getElementById("chaseCover").value;
  let standingSeams1 = document.getElementById("standingSeams1");
  let standingSeams2 = document.getElementById("standingSeams2");
  let standingSeams3 = document.getElementById("standingSeams3");

  if (dropdownValue === "" || dropdownValue === "N/A") {
    standingSeams1.value = "";
    standingSeams2.value = "";
    standingSeams3.value = "";
    return;
  }

  let H20 = parseInt(dropdownValue);
  let H21 = H20 - 1;
  standingSeams1.value = H21;

  let J8 = 100;
  let result = H21 === 1 ? (4 * J8) / 144 : (8 * J8) / 144;
  standingSeams2.value = result.toFixed(2);
  standingSeams3.value = "A = 2 In. X";
}

document.addEventListener("DOMContentLoaded", function () {
  let collarSizeA = document.getElementById("collarSizeA");
  let collarSizeB = document.getElementById("collarSizeB");

  if (collarSizeA) {
    collarSizeA.addEventListener("change", updateStockSizeA);
  }

  if (collarSizeB) {
    collarSizeB.addEventListener("change", updateStockSizeB);
  }
});

// ✅ Function for COLLAR A STOCK SIZE Calculation
function updateStockSizeA() {
  let dropdownValue = document.getElementById("collarSizeA").value;
  let inputField = document.getElementById("stockSizeA");

  if (dropdownValue === "") {
    inputField.value = "";
    return;
  }

  let selectedValue = parseFloat(dropdownValue);
  if (isNaN(selectedValue)) {
    inputField.value = "Invalid Selection";
    return;
  }

  // Applying the formula for COLLAR A
  let result = selectedValue * 3.14159 + 0.5;

  // Applying MROUND to round to the nearest 0.0625
  result = mround(result, 0.0625);

  // Set calculated value in input field
  inputField.value = result.toFixed(4);
}

// ✅ Function for COLLAR B STOCK SIZE Calculation
function updateStockSizeB() {
  let dropdownValue = document.getElementById("collarSizeB").value;
  let inputField = document.getElementById("stockSizeB");

  if (dropdownValue === "") {
    inputField.value = "";
    return;
  }

  let selectedValue = parseFloat(dropdownValue);
  if (isNaN(selectedValue)) {
    inputField.value = "Invalid Selection";
    return;
  }

  let formulaType = "ROUND"; // Replace this with actual logic to determine if "ROUND" or not

  let result;
  if (formulaType === "ROUND") {
    result = mround(selectedValue * 3.14159 + 0.5, 0.0625);
  } else {
    result = selectedValue * 4 + 0.5;
  }

  inputField.value = result.toFixed(4);
}

// ✅ MROUND function (Excel-like rounding)
function mround(value, multiple) {
  return Math.round(value / multiple) * multiple;
}

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".collar-form-input-text");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (
        this.value.trim() !== "" &&
        !this.value.includes(".000 In") &&
        this.dataset.c === "false"
      ) {
        this.value += " .000 In";
      }
    });

    input.addEventListener("focus", function () {
      if (this.value.includes(".000 In")) {
        this.value = this.value.replace(" .000 In", "");
      }
    });
  });

  function validateShortLongFields() {
    const shortField = document.getElementById("shortField").value.trim();
    const longField = document.getElementById("longField").value.trim();
    const shortStatus = document.getElementById("shortStatus");
    const longStatus = document.getElementById("longStatus");

    // Dummy values for C fields (Replace these with actual values dynamically)
    let C19 =
      Number(document.querySelector(".collar-form-input-text").value) || 0;
    let C20 =
      Number(document.querySelectorAll(".collar-form-input-text")[1].value) ||
      0;
    let C21 = 5; // Example
    let C22 = 10;
    let C16 = 2;
    let C17 = 3;
    let C25 = 4;
    let C26 = 6;
    let C27 = 1;
    let C28 = 2;
    let J7 = 15;
    let J8 = 20;

    console.clear();
    console.log("Validating Fields...");
    console.log("SHORT Field Value:", shortField);
    console.log("LONG Field Value:", longField);

    // SHORT Formula Check
    if (shortField !== "") {
      console.log(
        `Checking SHORT: ${C19} + ${C21} + ${C16} = ${J8} OR ${C25} + ${C27} + ${C17} = ${J8}`
      );
      if (C19 + C21 + C16 === J8 || C25 + C27 + C17 === J8) {
        shortStatus.textContent = "OK";
        shortStatus.className = "ok";
        console.log("SHORT: OK ✅");
      } else {
        shortStatus.textContent = "ERROR";
        shortStatus.className = "error";
        console.log("SHORT: ERROR ❌");
      }
    } else {
      shortStatus.textContent = "";
      console.log("SHORT Field is empty.");
    }

    // LONG Formula Check
    if (longField !== "") {
      console.log(
        `Checking LONG: ${C20} + ${C22} + ${C16} = ${J7} OR ${C26} + ${C17} + ${C28} = ${J7}`
      );
      if (C20 + C22 + C16 === J7 || C26 + C17 + C28 === J7) {
        longStatus.textContent = "OK";
        longStatus.className = "ok";
        console.log("LONG: OK ✅");
      } else {
        longStatus.textContent = "ERROR";
        longStatus.className = "error";
        console.log("LONG: ERROR ❌");
      }
    } else {
      longStatus.textContent = "";
      console.log("LONG Field is empty.");
    }
  }

  document
    .getElementById("shortField")
    .addEventListener("input", validateShortLongFields);
  document
    .getElementById("longField")
    .addEventListener("input", validateShortLongFields);
});
