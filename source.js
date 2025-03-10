function trapWater() {
  let input = document.getElementById("heightsArr");
  if (!input.value) {
    alert("Please enter heights array!!!");
    return;
  }
  let values = input.value.split(",");
  if (values.length < 3) {
    let error = document.getElementById("error");
    error.innerHTML = "Please enter at least 3 heights!!!";
  }
  if (values.some((val) => isNaN(val))) {
    alert("Please enter valid numbers!!!");
    return;
  }
  let heights = values.map(Number);
  let n = heights.length;
  let leftMax = new Array(n).fill(0);
  let rightMax = new Array(n).fill(0);
  let trappedWater = 0;

  leftMax[0] = heights[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
  }

  rightMax[n - 1] = heights[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
  }

  let waterArr = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let waterLevel = Math.min(leftMax[i], rightMax[i]);
    if (waterLevel > heights[i]) {
      waterArr[i] = waterLevel - heights[i];
      trappedWater += waterArr[i];
    }
  }

  drawWaterTank(heights, waterArr);
  let result = document.getElementById("result");
  result.innerHTML = trappedWater;
}

function drawWaterTank(heights, waterArr) {
  let maxHeight = Math.max(...heights);
  let grid = document.getElementById("grid");
  let tableHTML = "<table>";

  for (let row = maxHeight; row > 0; row--) {
    tableHTML += "<tr>";
    for (let col = 0; col < heights.length; col++) {
      if (heights[col] >= row) {
        tableHTML += "<td class='wall'></td>";
      } else if (heights[col] + waterArr[col] >= row) {
        tableHTML += "<td class='water'></td>";
      } else {
        tableHTML += "<td></td>";
      }
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  grid.innerHTML = tableHTML;
}
