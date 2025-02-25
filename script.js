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
