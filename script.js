/** @format */

document.addEventListener("DOMContentLoaded", function () {
  function updateMeasurements() {
    const j7 = document.getElementById("j7");
    const j8 = document.getElementById("j8");
    const longSide = document.getElementById("long_side");
    const shortSide = document.getElementById("short_side");

    if (j7 && longSide) {
      longSide.value = j7.value;
    }
    if (j8 && shortSide) {
      shortSide.value = j8.value;
    }
  }

  document.getElementById("j7")?.addEventListener("input", updateMeasurements);
  document.getElementById("j8")?.addEventListener("input", updateMeasurements);
});

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

function calculateShortLong() {
  let A1 = parseFloat(document.getElementById("A1").value) || 0;
  let A2 = parseFloat(document.getElementById("A2").value) || 0;
  let A3 = parseFloat(document.getElementById("A3").value) || 0;
  let A4 = parseFloat(document.getElementById("A4").value) || 0;

  let C19 = A1,
    C20 = A2,
    C21 = A3,
    C22 = A4;
  let C16 = 5,
    C17 = 3,
    C25 = 2,
    C27 = 4,
    C26 = 6,
    C28 = 7;
  let J7 = 20,
    J8 = 15;

  let shortField = document.getElementById("SHORT");
  let longField = document.getElementById("LONG");

  // SHORT Calculation
  if (C19 === 0) {
    shortField.value = "";
    shortField.classList.remove("success", "error");
  } else if (C19 + C21 + C16 !== J8) {
    shortField.value = "ERROR A";
    shortField.classList.remove("success");
    shortField.classList.add("error");
    console.error("SHORT - ERROR A: Calculation does not match J8");
  } else {
    shortField.value = "Correct";
    shortField.classList.remove("error");
    shortField.classList.add("success");
    console.log("SHORT - Correct");
  }

  // LONG Calculation
  if (C20 === 0) {
    longField.value = "";
    longField.classList.remove("success", "error");
  } else if (C20 + C22 + C16 !== J7) {
    longField.value = "ERROR A";
    longField.classList.remove("success");
    longField.classList.add("error");
    console.error("LONG - ERROR A: Calculation does not match J7");
  } else {
    longField.value = "Correct";
    longField.classList.remove("error");
    longField.classList.add("success");
    console.log("LONG - Correct");
  }
}

// Attach event listeners to inputs
document.querySelectorAll(".collar-form-input-text").forEach((input) => {
  input.addEventListener("input", function () {
    calculateShortLong();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function calculateTotalPerSqFt() {
    const h20 = document.getElementById("h20");
    const j62 = document.getElementById("j62");
    const totalPerSqFt = document.getElementById("total_per_sq_ft");

    if (h20 && j62 && totalPerSqFt) {
      const h20Value = parseFloat(h20.value) || 0;
      const j62Value = parseFloat(j62.value) || 0;

      totalPerSqFt.value = h20Value === 1 ? (j62Value + 135).toFixed(2) : "";
    }
  }

  function updateInstallCollars() {
    const h31 = document.getElementById("h31");
    const installCollarsLabel = document.getElementById(
      "install_collars_label"
    );
    const j12 = document.getElementById("j12");
    const installCollarsInput = document.getElementById("install_collars");

    if (h31 && installCollarsLabel) {
      installCollarsLabel.textContent = h31.checked
        ? "MAKE COLLARS="
        : "INSTALL COLLARS=";
    }

    if (j12 && installCollarsInput) {
      installCollarsInput.value = j12.value.trim() !== "" ? 70 : "";
    }
  }

  function updateChaseCover() {
    const h20 = document.getElementById("h20");
    const j62 = document.getElementById("j62");
    const chaseCover = document.getElementById("chase_cover");

    if (h20 && j62 && chaseCover) {
      const h20Value = parseFloat(h20.value) || 0;
      const j62Value = parseFloat(j62.value) || 0;

      chaseCover.value = h20Value === 2 ? (j62Value + 200).toFixed(2) : "";
    }
  }

  document.getElementById("h20")?.addEventListener("input", () => {
    calculateTotalPerSqFt();
    updateChaseCover();
  });
  document.getElementById("j62")?.addEventListener("input", () => {
    calculateTotalPerSqFt();
    updateChaseCover();
  });

  document
    .getElementById("h31")
    ?.addEventListener("change", updateInstallCollars);
  document
    .getElementById("j12")
    ?.addEventListener("input", updateInstallCollars);
});

document.addEventListener("DOMContentLoaded", function () {
  function updateThreePieceChaseCover() {
    const h20 = document.getElementById("h20");
    const j62 = document.getElementById("j62");
    const threePieceChaseCover = document.getElementById(
      "three_piece_chase_cover"
    );

    if (h20 && j62 && threePieceChaseCover) {
      const h20Value = parseFloat(h20.value) || 0;
      const j62Value = parseFloat(j62.value) || 0;

      threePieceChaseCover.value =
        h20Value === 3 ? (j62Value + 200).toFixed(2) : "";
    }
  }

  document
    .getElementById("h20")
    ?.addEventListener("input", updateThreePieceChaseCover);
  document
    .getElementById("j62")
    ?.addEventListener("input", updateThreePieceChaseCover);
});

document.addEventListener("DOMContentLoaded", function () {
  function updateStormCollars() {
    const c30 = document.getElementById("c30");
    const stormCollars = document.getElementById("storm_collars");

    if (c30 && stormCollars) {
      stormCollars.value = c30.checked ? 50 : "";
    }
  }

  document
    .getElementById("c30")
    ?.addEventListener("change", updateStormCollars);
});

document.addEventListener("DOMContentLoaded", function () {
  function updateTotalPrePainted() {
    const h6 = document.getElementById("h6");
    const j39 = parseFloat(document.getElementById("j39")?.value) || 0;
    const j40 = parseFloat(document.getElementById("j40")?.value) || 0;
    const j41 = parseFloat(document.getElementById("j41")?.value) || 0;
    const j42 = parseFloat(document.getElementById("j42")?.value) || 0;
    const j43 = parseFloat(document.getElementById("j43")?.value) || 0;
    const l44 = parseFloat(document.getElementById("l44")?.value) || 0;
    const totalPrePainted = document.getElementById("total_pre_painted");

    if (h6 && totalPrePainted) {
      totalPrePainted.value =
        h6.value !== "STAINLESS STEEL"
          ? (j39 + j40 + j41 + j42 + j43 + l44).toFixed(2)
          : "";
    }
  }

  document
    .getElementById("h6")
    ?.addEventListener("change", updateTotalPrePainted);
  document
    .getElementById("j39")
    ?.addEventListener("input", updateTotalPrePainted);
  document
    .getElementById("j40")
    ?.addEventListener("input", updateTotalPrePainted);
  document
    .getElementById("j41")
    ?.addEventListener("input", updateTotalPrePainted);
  document
    .getElementById("j42")
    ?.addEventListener("input", updateTotalPrePainted);
  document
    .getElementById("j43")
    ?.addEventListener("input", updateTotalPrePainted);
  document
    .getElementById("l44")
    ?.addEventListener("input", updateTotalPrePainted);
});

document.addEventListener("DOMContentLoaded", function () {
  function updateQuoteTotal() {
    const j44 = document.getElementById("j44");
    const j45 = document.getElementById("j45");
    const quoteTotal = document.getElementById("quote_total");

    if (j44 && j45 && quoteTotal) {
      const j44Value = j44.value.trim();
      const j45Value = parseFloat(j45.value) || 0;

      quoteTotal.value = j44Value === "" ? j45Value : j44Value;
    }
  }

  document.getElementById("j44")?.addEventListener("input", updateQuoteTotal);
  document.getElementById("j45")?.addEventListener("input", updateQuoteTotal);
});

document.addEventListener("DOMContentLoaded", function () {
  function updateSolder() {
    const h29 = document.getElementById("h29");
    const solderLabel = document.getElementById("solder_label");
    const solderAmount = document.getElementById("solder_amount");

    if (h29 && solderLabel && solderAmount) {
      const h29Value = h29.value.trim();
      if (h29Value === "N/A") {
        solderLabel.textContent = "";
        solderAmount.value = "";
      } else {
        solderLabel.textContent = "SOLDER-";
        solderAmount.value = Math.ceil(parseFloat(h29Value) * 0.5) || "";
      }
    }
  }

  document.getElementById("h29")?.addEventListener("input", updateSolder);
});

document.addEventListener("DOMContentLoaded", function () {
  function updateMaterial() {
    const f2 = document.getElementById("f2"); // Checkbox or boolean input
    const z1 = parseFloat(document.getElementById("z1")?.value) || 0;
    const y1 = parseFloat(document.getElementById("y1")?.value) || 0;
    const h62 = parseFloat(document.getElementById("h62")?.value) || 0;
    const materialAmount = document.getElementById("material_amount");

    if (f2 && materialAmount) {
      const multiplier = f2.checked ? z1 : y1;
      materialAmount.value = Math.round(multiplier * h62) || "";
    }
  }

  document.getElementById("f2")?.addEventListener("change", updateMaterial);
  document.getElementById("z1")?.addEventListener("input", updateMaterial);
  document.getElementById("y1")?.addEventListener("input", updateMaterial);
  document.getElementById("h62")?.addEventListener("input", updateMaterial);
});
