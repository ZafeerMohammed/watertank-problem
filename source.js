function trapWater() {

  let input = document.getElementById("heightsArr");
  let error = document.getElementById("error");
  let result = document.getElementById("result");
  let grid = document.getElementById("grid");

  // This clears old results
  error.innerHTML = "";
  result.innerHTML = "";
  grid.innerHTML = "";


  // Check : [if user has typed anything]
  if (!input.value) {
    
    alert("Hey! Please enter some wall heights first.");
    
    return;
    
  }
  
  
  // Takes input value -> split by commas -> removes extra spaces
  // 1, 2,6 -> this could give error bcuz of space before 2.
  // Eg => 1, 2,6 -> 1,2,6
  
  let values = input.value.split(",").map(val => val.trim());

  
  
  
  // Need atleast 3 values
  if (values.length < 3) {
    
    error.innerHTML = "Oops! You need at least 3 heights to trap water.";
    
    return;
    
  }


  // Check : [everything is a number]
  if (values.some(val => isNaN(val))) {

    alert("Try entering numbers.");

    return;

  }


  // Convert strings -> numbers
  let heights = values.map(Number);


  // Check : [Negative height]
  if (heights.some(val => val < 0)) {

    alert("Negative height? Try positive numbers!");

    return;

  }


  // Set up : [Traping water]
  let n = heights.length;

  let leftMax = new Array(n).fill(0);

  let rightMax = new Array(n).fill(0);

  let trappedWater = 0;



  leftMax[0] = heights[0];

  rightMax[n - 1] = heights[n - 1];


  // Filling up the leftMax and rightMax array with the highest wall seen
  for (let i = 1, j = n - 2; 
      i < n && j >= 0; 
      i++, j--) {

    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);

    rightMax[j] = Math.max(rightMax[j + 1], heights[j]);

  }


  
  // Calculate : [How much water each spot can hold]
  let waterArr = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {

    
    let waterLevel = Math.min(leftMax[i], rightMax[i]);

    
    if (waterLevel > heights[i]) {

      waterArr[i] = waterLevel - heights[i];

      trappedWater += waterArr[i]; // Adding amount to the total

    }

  }



  // visual format
  drawWaterTank(heights, waterArr);

  // Pay off : [Total water trapped]
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
