// If sort is already triggered, disable sort functionality
let letMeSort = true;
let number_of_divs = 0,
  lastElement = 60,
  max = 0,
  min = 999999999999999,
  presentElement = 0;

let create = (type = "random") => {
  (number_of_divs = 0),
    (lastElement = 60),
    (max = 0),
    (min = 999999999999999),
    (presentElement = 0);
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

  // Clear Insertion Sort Div before creating new divs
  insertionSortDiv.innerHTML = "";
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
        presentElement = getRoundedInt(lastElement - 5, lastElement - 1);
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
    insertionSortDiv.appendChild(newDiv);
  }

  // Create Left and Right Pointers
  let leftIndexSpan = document.createElement("div");
  leftIndexSpan.innerHTML = "Left";
  leftIndexSpan.classList = "pointer";
  leftIndexSpan.id = "leftIndexSpan";
  insertionSortDiv.appendChild(leftIndexSpan);
  // Create Left and Right Pointers
  let rightIndexSpan = document.createElement("div");
  rightIndexSpan.innerHTML = "Right";
  rightIndexSpan.classList = "pointer";
  rightIndexSpan.id = "rightIndexSpan";
  insertionSortDiv.appendChild(rightIndexSpan);

  // Create right border and span for the present window
  let rightBorder = document.createElement("div");
  rightBorder.classList = "rightBorder";
  rightBorder.id = "rightBorder";
  insertionSortDiv.appendChild(rightBorder);

  let rightBorderSpan = document.createElement("div");
  rightBorderSpan.innerHTML = "Border";
  rightBorderSpan.classList = "pointer";
  rightBorderSpan.id = "rightBorderSpan";
  insertionSortDiv.appendChild(rightBorderSpan);
};

let insertionSortDiv = document.getElementById("insertionSort");
let searchElement = document.getElementById("searchElement");
let alert = document.getElementById("alert");
let customArray = document.getElementById("customArray");
let divs = [];
create();
console.log(divs);
let divElements = insertionSortDiv.children;

// Trigger Create whenever the custom array changes
customArray.addEventListener("keyup", () => {
  create();
});

let sort = () => {
  // Checking if search functionality is available or not
  if (!letMeSort) return;

  // Disable search functionality once triggered;
  letMeSort = false;

  insertionSort(0);
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
  rightBorder.style.display = "none";
  rightBorderSpan.style.display = "none";
};

let insertionSort = async (left) => {
  let right = left + 1;

  // If the left index is at the element before end of the array, then the array is sorted
  if (left == divs.length - 1) {
    clear(left - 1, right - 1);
    alert.innerHTML = "<div class='success py-2 px-5'>Array is Sorted</div>";

    // Removing Pointers
    leftIndexSpan.style.display = "none";
    rightIndexSpan.style.display = "none";
    rightBorder.style.display = "none";
    rightBorderSpan.style.display = "none";

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
  leftTop = divElements[left].offsetHeight + divElements[left].offsetTop + 5;
  leftLeft = divElements[left].offsetLeft;

  leftIndexSpan.style =
    "display: inline; position: absolute; left:" +
    leftLeft +
    "px; top:" +
    leftTop +
    "px;";

  // Setting positions of border and border span Elements
  rightBorderTop = insertionSortDiv.offsetTop;
  rightBorderLeft =
    divElements[left].offsetLeft + divElements[left].offsetWidth + 0.5;

  rightBorder.style =
    "display: inline; position: absolute; left:" +
    rightBorderLeft +
    "px; top: " +
    rightBorderTop +
    "px;";

  // Setting positions of border and border span Elements
  rightBorderSpanTop = rightBorderTop + rightBorder.offsetHeight;
  rightBorderSpanLeft =
    divElements[left].offsetLeft +
    divElements[left].offsetWidth -
    leftIndexSpan.offsetWidth / 2;

  rightBorderSpan.style =
    "display: inline; position: absolute; left:" +
    rightBorderSpanLeft +
    "px; top: " +
    rightBorderSpanTop +
    "px;";

  // Setting positions of left and right Elements
  rightTop = divElements[right].offsetTop + divElements[right].offsetHeight + 5;
  rightLeft = divElements[right].offsetLeft;

  if (right == left + 1) rightTop += 25;

  rightIndexSpan.style =
    "display: inline; position: absolute; left:" +
    rightLeft +
    "px; top:" +
    rightTop +
    "px;";

  // Pull the right element into the window
  let exchange = (right) => {
    if (right <= 0 || divs[right - 1] < divs[right]) {
      // Increase the left index by one
      setTimeout(() => {
        insertionSort(left + 1);
      }, 500);
      return;
    }

    // Exchanging left and right elements
    if (left + 1 == right) {
      // Setting positions of left Elements
      leftTop =
        divElements[left + 1].offsetHeight +
        divElements[left + 1].offsetTop +
        5;
      leftLeft = divElements[left + 1].offsetLeft;

      leftIndexSpan.style =
        "display: inline; position: absolute; left:" +
        leftLeft +
        "px; top:" +
        leftTop +
        "px;";
    }

    // Setting positions of right Elements
    rightTop =
      divElements[right - 1].offsetTop +
      divElements[right - 1].offsetHeight +
      5;
    rightLeft = divElements[right - 1].offsetLeft;

    if (right == left + 1 || right == left - 1) rightTop += 25;

    rightIndexSpan.style =
      "display: inline; position: absolute; left:" +
      rightLeft +
      "px; top:" +
      rightTop +
      "px;";

    // Exchange right and element left to it
    let temp = divs[right];
    divs[right] = divs[right - 1];
    divElements[right].innerHTML = divs[right - 1];
    divElements[right].style.height = (divs[right - 1] * 100) / max + min + "%";

    divs[right - 1] = temp;
    divElements[right - 1].innerHTML = temp;
    divElements[right - 1].style.height = (temp * 100) / max + min + "%";
    console.log(temp);

    setTimeout(() => {
      exchange(right - 1);
    }, 1000);
  };
  setTimeout(() => {
    exchange(right);
  }, 500);
};

// let bubbleSort = (left, right) => {
//   // Get the pointers at left and right indexes
//   divElements[left].classList.add("left");
//   divElements[right].classList.add("right");

//   // Setting positions of left and right Elements
//   var rect = divElements[left].getBoundingClientRect();

//   leftTop = rect.bottom + 5;

//   leftIndexSpan.style =
//     "display: inline; position: absolute; left:" +
//     rect.left +
//     "px; top:" +
//     leftTop +
//     "px;";

//   var rect = divElements[right].getBoundingClientRect();

//   rightTop = rect.bottom + 5;
//   if (right == left + 1) rightTop += 20;

//   rightIndexSpan.style =
//     "display: inline; position: absolute; left:" +
//     rect.left +
//     "px; top:" +
//     rightTop +
//     "px;";

//   // Swap the elements if left is greater than right most element
//   if (divs[left] > divs[right]) {
//     // Interchange left and right elements
//     let temp = divs[left];

//     divs[left] = divs[right];

//     divElements[left].innerHTML = divs[left];
//     divElements[left].style.height = (divs[left] * 100) / max + min + "%";

//     divs[right] = temp;

//     divElements[right].innerHTML = divs[right];
//     divElements[right].style.height = (divs[right] * 100) / max + min + "%";
//   } else {
//     // We don't need to exchange
//   }

//   setTimeout(() => {
//     clear(left, right);
//     if (right == divs.length - 1) {
//       divElements[left].classList.add("sorted");
//       bubbleSort(left + 1, left + 2);
//     } else {
//       bubbleSort(left, right + 1);
//     }
//   }, 1000);
// };
