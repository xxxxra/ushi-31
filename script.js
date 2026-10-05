const openLabelBtn = document.getElementById("openLabel");
const paperStack = document.getElementById("paperStack");
const paperInspection = document.getElementById("paperInspection");
const paperBackLabel = document.getElementById("paperBackLabel");
const paperFinal = document.getElementById("paperFinal");
const toBackLabel = document.getElementById("toBackLabel");
const toFinal = document.getElementById("toFinal");
const restart = document.getElementById("restart");
const rows = [...document.querySelectorAll(".check-row")];

let checked = 0;
let opened = false;

function showPaper(target) {
  [paperInspection, paperBackLabel, paperFinal].forEach((paper) => {
    if (paper === target) paper.classList.remove("hidden");
    else paper.classList.add("hidden");
  });
}

function openInspection() {
  if (opened) return;
  opened = true;
  paperStack.style.pointerEvents = "auto";
  showPaper(paperInspection);
}

function resetChecks() {
  checked = 0;
  rows.forEach((row, index) => {
    row.classList.remove("is-done", "is-ready");
    row.disabled = index !== 0;
    row.querySelector("em").textContent = "□";
  });
  rows[0].classList.add("is-ready");
  toBackLabel.hidden = true;
}

openLabelBtn.addEventListener("click", openInspection);

rows.forEach((row, index) => {
  row.addEventListener("click", () => {
    if (index !== checked) return;
    row.classList.remove("is-ready");
    row.classList.add("is-done");
    row.disabled = true;
    row.querySelector("em").textContent = "✓";
    checked += 1;

    if (checked < rows.length) {
      rows[checked].disabled = false;
      rows[checked].classList.add("is-ready");
    } else {
      toBackLabel.hidden = false;
    }
  });
});

toBackLabel.addEventListener("click", () => showPaper(paperBackLabel));
toFinal.addEventListener("click", () => showPaper(paperFinal));

restart.addEventListener("click", () => {
  resetChecks();
  opened = false;
  paperStack.style.pointerEvents = "none";
  [paperInspection, paperBackLabel, paperFinal].forEach(p => p.classList.add("hidden"));
});

resetChecks();
paperStack.style.pointerEvents = "none";