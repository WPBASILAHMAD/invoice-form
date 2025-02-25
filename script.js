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
