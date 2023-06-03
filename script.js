//your JS code here. If required.
function getRandomTime() {
  return Math.floor(Math.random() * 3000) + 1000; // Generates a random time between 1 and 3 seconds
}

function createPromise(name) {
  const time = getRandomTime();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name, time });
    }, time);
  });
}

const tableBody = document.getElementById("output");
const promises = [
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3"),
];

const loadingRow = document.createElement("tr");
const loadingCell = document.createElement("td");
loadingCell.colSpan = 2;
loadingCell.textContent = "Loading...";
loadingRow.appendChild(loadingCell);
tableBody.appendChild(loadingRow);

Promise.all(promises)
  .then((results) => {
    tableBody.innerHTML = ""; // Clear the loading row

    results.forEach((result) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = result.name;
      const timeCell = document.createElement("td");
      timeCell.textContent = (result.time / 1000).toFixed(3);

      row.appendChild(nameCell);
      row.appendChild(timeCell);
      tableBody.appendChild(row);
    });

    const totalRow = document.createElement("tr");
    const totalNameCell = document.createElement("td");
    totalNameCell.textContent = "Total";
    const totalTimeCell = document.createElement("td");
    const totalTime = results.reduce((total, result) => total + result.time, 0);
    totalTimeCell.textContent = (totalTime / 1000).toFixed(3);

    totalRow.appendChild(totalNameCell);
    totalRow.appendChild(totalTimeCell);
    tableBody.appendChild(totalRow);
  })
  .catch((error) => {
    console.error(error);
  });
