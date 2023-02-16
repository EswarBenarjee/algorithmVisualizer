// If sort is already triggered, disable sort functionality
let letMeSort = true;
let number_of_divs = 0,
  lastElement = 1,
  max = 0,
  min = 999999999999999,
  presentElement = 0;

let create = (type = "random") => {
  // Checking if sort functionality is available or not
  if (!letMeSort) return;

  // Check if there is a custom array
  let value = customArray.value;
  let nums = [];
  if (value.trim() == "") {
    nums = [];
  } else {
    splitValue = value.split(",");
    for (let i = 0; i < splitValue.length; i++) {
      let value = splitValue[i].trim();
      if (value == "" || value == "-") continue;
      nums.push(parseInt(value));
    }
  }

  // Clear Bubble Sort Div before creating new divs
  bubbleSortDiv.innerHTML = "";
  divs = [];

  if (nums.length == 0) {
    // Generate random Number of Divs
    number_of_divs = getRoundedInt(10, 25);

    // Create Elements according to type
    for (let i = 0; i < number_of_divs; i++) {
      if (type == "random") {
        presentElement = getRoundedInt();
      } else if (type == "sorted") {
        if (i > 0) lastElement = divs[divs.length - 1];
        presentElement = getRoundedInt(lastElement + 1, lastElement + 5);
      } else if (type == "nearlySorted") {
        if (i > 0) lastElement = divs[divs.length - 1];
        if (lastElement > 0)
          presentElement = getRoundedInt(lastElement - 1, lastElement + 5);
        else presentElement = getRoundedInt(lastElement + 1, lastElement + 5);
      } else if (type == "manyDuplicates") {
        // Duplicate Number Creation
        if (i > 0) {
          lastElement = divs[divs.length - 1];
          if (getRoundedInt(0, 2) == 0) {
            // Include a duplicate
            presentElement = divs[divs.length - 1];
          } else {
            // Include new number
            presentElement = getRoundedInt(lastElement + 1, lastElement + 5);
          }
        } else {
          // Include new number
          presentElement = getRoundedInt(lastElement + 1, lastElement + 5);
        }
      }

      divs.push(presentElement);
      if (presentElement > max) max = presentElement;
      if (presentElement < min) min = presentElement;
    }
  } else {
    // Custom Entering of values
    number_of_divs = nums.length;
    divs = nums;
    max = Math.max(...nums);
    min = Math.min(...nums);
  }

  // Create Divs
  for (let i = 0; i < number_of_divs; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList = "generatedDiv";
    newDiv.innerHTML = divs[i];
    newDiv.style.height = (divs[i] * 100) / max + min + "%";
    bubbleSortDiv.appendChild(newDiv);
  }

  // Create Low, Mid and High Pointers
  let leftIndexSpan = document.createElement("div");
  leftIndexSpan.innerHTML = "Left";
  leftIndexSpan.classList = "pointer";
  leftIndexSpan.id = "leftIndexSpan";
  bubbleSortDiv.appendChild(leftIndexSpan);
  // Create Low, Mid and High Pointers
  let rightIndexSpan = document.createElement("div");
  rightIndexSpan.innerHTML = "Right";
  rightIndexSpan.classList = "pointer";
  rightIndexSpan.id = "rightIndexSpan";
  bubbleSortDiv.appendChild(rightIndexSpan);
};

let bubbleSortDiv = document.getElementById("bubbleSort");
let searchElement = document.getElementById("searchElement");
let alert = document.getElementById("alert");
let customArray = document.getElementById("customArray");
let divs = [];
create();
console.log(divs);
let divElements = bubbleSortDiv.children;
console.log(divElements);

// Trigger Create whenever the custom array changes
customArray.addEventListener("keyup", () => {
  create();
});

let sort = () => {
  // Checking if search functionality is available or not
  if (!letMeSort) return;

  // Disable search functionality once triggered;
  letMeSort = false;

  bubbleSort(0, 1);
};
document.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    search();
  }
});

let clear = (left, right) => {
  divElements[left].classList.remove("left");
  leftIndexSpan.style.display = "none";
  divElements[right].classList.remove("right");
  rightIndexSpan.style.display = "none";
};

let bubbleSort = (left, right) => {
  // If the left index is at the element before end of the array, then the array is sorted
  if (left == divs.length - 1) {
    divElements[left].classList.add("sorted");
    clear(left - 1, right - 1);
    alert.innerHTML = "<div class='success py-2 px-5'>Array is Sorted</div>";

    // Removing Pointers
    leftIndexSpan.style.display = "none";
    rightIndexSpan.style.display = "none";

    // Restore sort functionality
    letMeSort = true;

    setTimeout(() => {
      alert.innerHTML = "";
    }, 2000);

    return;
  }

  // Get the pointers at left and right indexes
  divElements[left].classList.add("left");
  divElements[right].classList.add("right");

  // Setting positions of left and right Elements
  leftTop = divElements[left].offsetTop + divElements[left].offsetHeight + 5;
  leftLeft = divElements[left].offsetLeft;

  leftIndexSpan.style =
    "display: inline; position: absolute; left:" +
    leftLeft +
    "px; top:" +
    leftTop +
    "px;";

  rightTop = divElements[right].offsetTop + divElements[right].offsetHeight + 5;
  if (right == left + 1) rightTop += 25;
  rightLeft = divElements[right].offsetLeft;

  rightIndexSpan.style =
    "display: inline; position: absolute; left:" +
    rightLeft +
    "px; top:" +
    rightTop +
    "px;";

  // Swap the elements if left is greater than right most element
  if (divs[left] > divs[right]) {
    // Interchange left and right elements
    let temp = divs[left];

    divs[left] = divs[right];

    divElements[left].innerHTML = divs[left];
    divElements[left].style.height = (divs[left] * 100) / max + min + "%";

    divs[right] = temp;

    divElements[right].innerHTML = divs[right];
    divElements[right].style.height = (divs[right] * 100) / max + min + "%";
  } else {
    // We don't need to exchange
  }

  setTimeout(() => {
    clear(left, right);
    if (right == divs.length - 1) {
      divElements[left].classList.add("sorted");
      bubbleSort(left + 1, left + 2);
    } else {
      bubbleSort(left, right + 1);
    }
  }, 1000);
};
