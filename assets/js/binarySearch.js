// If search is already triggered, disable search functionality
let letMeSearch = true;

let create = (type = "sorted") => {
  // Checking if search functionality is available or not
  if (!letMeSearch) return;

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

  // Clear Binary Search Div before creating new divs
  binarySearchDiv.innerHTML = "";
  divs = [];
  let number_of_divs = 0,
    lastElement = 1,
    max = 0,
    min = 999999999999999,
    presentElement = 0;

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
      console.log(presentElement);
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
    binarySearchDiv.appendChild(newDiv);
  }

  // Create Low, Mid and High Pointers
  let lowSpan = document.createElement("div");
  lowSpan.innerHTML = "Low";
  lowSpan.classList = "pointer";
  lowSpan.id = "lowSpan";
  binarySearchDiv.appendChild(lowSpan);
  // Create Low, Mid and High Pointers
  let midSpan = document.createElement("div");
  midSpan.innerHTML = "MID";
  midSpan.classList = "pointer";
  midSpan.id = "midSpan";
  binarySearchDiv.appendChild(midSpan);
  // Create Low, Mid and High Pointers
  let highSpan = document.createElement("div");
  highSpan.innerHTML = "High";
  highSpan.classList = "pointer";
  highSpan.id = "highSpan";
  binarySearchDiv.appendChild(highSpan);

  // Random Search Element
  let randomSearchElement = getRoundedInt(min, max);
  searchElement.value = randomSearchElement;
};

let binarySearchDiv = document.getElementById("binarySearch");
let searchElement = document.getElementById("searchElement");
let alert = document.getElementById("alert");
let customArray = document.getElementById("customArray");
let divs = [];
create();
console.log(divs);
let divElements = binarySearchDiv.children;

// Trigger Create whenever the custom array changes
customArray.addEventListener("keyup", () => {
  create();
});

let search = () => {
  // Checking if search functionality is available or not
  if (!letMeSearch) return;

  if (!isSorted(divs)) {
    alert.innerHTML =
      "<div class='danger py-2 px-5'>Entered Array is not sorted</div>";
    setTimeout(() => {
      alert.innerHTML = "";
    }, 1000);
    return;
  }

  // Disable search functionality once triggered;
  letMeSearch = false;
  let value = searchElement.value;
  if (value.length == 0 || parseInt(value) < 1)
    binarySearch(0, 0, divs.length - 1);
  else binarySearch(parseInt(value), 0, divs.length - 1);
};
document.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    search();
  }
});

let clear = (low, mid, high) => {
  divElements[low].classList.remove("low");
  divs[low].innerHTML = "";
  divElements[mid].classList.remove("mid");
  divs[mid].innerHTML = "";
  divElements[high].classList.remove("high");
  divs[high].innerHTML = "";
};

let binarySearch = (target, low, high) => {
  midSpan = document.getElementById("midSpan");

  if (low > high) {
    // Element is not found in array
    alert.innerHTML = "<div class='danger py-2 px-5'>Element not found</div>";

    // Removing Pointers
    lowSpan.style.display = "none";
    midSpan.style.display = "none";
    highSpan.style.display = "none";

    // Search functionality is restored
    letMeSearch = true;

    setTimeout(() => {
      alert.innerHTML = "<div style='height:40px'></div>";
    }, 2000);
    return;
  }

  let mid = parseInt((low + high) / 2);
  divElements[mid].classList.add("mid");
  divElements[low].classList.add("low");
  divElements[high].classList.add("high");

  // Setting positions of low, mid and high Elements
  leftTop = divElements[low].offsetTop + divElements[low].offsetHeight + 5;
  leftLeft = divElements[low].offsetLeft;

  lowSpan.style =
    "display: inline; position: absolute; left:" +
    leftLeft +
    "px; top:" +
    leftTop +
    "px;";

  midTop = divElements[mid].offsetTop + divElements[mid].offsetHeight + 5;
  if (mid == low || mid == low + 1) midTop = leftTop + 25;
  midLeft = divElements[mid].offsetLeft;

  midSpan.style =
    "display: inline; position: absolute; left:" +
    midLeft +
    "px; top:" +
    midTop +
    "px;";

  highTop = divElements[high].offsetTop + divElements[high].offsetHeight + 5;
  if (high == mid || high == mid + 1) highTop = midTop + 30;
  highLeft = divElements[high].offsetLeft;

  highSpan.style =
    "display: inline; position: absolute; left:" +
    highLeft +
    "px; top:" +
    highTop +
    "px;";

  // Binary Search
  if (divs[mid] == target) {
    clear(low, mid, high);

    // Removing Pointers
    lowSpan.style.display = "none";
    midSpan.style.display = "none";
    highSpan.style.display = "none";

    // Search functionality is restored
    letMeSearch = true;

    alert.innerHTML = `<div class='success py-2 px-5'>Element found at index ${mid}</div>`;
    setTimeout(() => {
      alert.innerHTML = "<div style='height:40px'></div>";
    }, 2000);

    // Found the div
    divElements[mid].classList.add("correct");
    setTimeout(() => {
      divElements[mid].classList.remove("correct");
    }, 2000);
    return;
  }

  if (divs[mid] > target) {
    setTimeout(() => {
      clear(low, mid, high);

      binarySearch(target, low, mid - 1);
    }, 1000);
    return;
  }
  setTimeout(() => {
    clear(low, mid, high);

    binarySearch(target, mid + 1, high);
  }, 1000);
};
