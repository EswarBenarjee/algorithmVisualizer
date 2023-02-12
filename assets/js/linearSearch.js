// If search is already triggered, disable search functionality
let letMeSearch = true;

let create = () => {
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

  // Clear linear Search Div before creating new divs
  linearSearchDiv.innerHTML = "";
  divs = [];
  let number_of_divs = 0;

  if (nums.length == 0) {
    // Generate random Number of Divs
    number_of_divs = getRoundedInt(10, 25);

    // Create Elements
    for (let i = 0; i < number_of_divs; i++) {
      presentElement = getRoundedInt(-100, 100);
      divs.push(presentElement);
    }
  } else {
    // Custom Entering of values
    number_of_divs = nums.length;
    divs = nums;
  }

  let max = Math.max(...divs);
  let min = Math.min(...divs);

  // Maintaining to update the height of divs
  let heights = [];
  for (let i = 0; i < number_of_divs; i++) {
    heights.push(
      ((divs[i] - min + 1) / (max - min)) * (linearSearchDiv.clientHeight - 50)
    );
  }

  // Create Divs
  for (let i = 0; i < number_of_divs; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList = "generatedDiv";
    newDiv.innerHTML = divs[i];
    // Set the div height according to the value in it
    newDiv.style.height = heights[i] + "px";
    linearSearchDiv.appendChild(newDiv);
  }

  // Create present element Pointers
  let presentIndexSpan = document.createElement("div");
  presentIndexSpan.innerHTML = "presentIndex";
  presentIndexSpan.classList = "pointer";
  presentIndexSpan.id = "presentIndexSpan";
  linearSearchDiv.appendChild(presentIndexSpan);
};

let linearSearchDiv = document.getElementById("linearSearch");
let searchElement = document.getElementById("searchElement");
let alert = document.getElementById("alert");
let customArray = document.getElementById("customArray");
let divs = [];
create();
let divElements = linearSearchDiv.children;

// Trigger Create whenever the custom array changes
customArray.addEventListener("keyup", () => {
  create();
});

let search = () => {
  // Checking if search functionality is available or not
  if (!letMeSearch) return;

  // Disable search functionality once triggered;
  letMeSearch = false;
  let value = searchElement.value;
  // Checking if the entered value is null or not
  if (value.trim() == "") {
    alert.innerHTML =
      "<div class='danger py-2 px-5'>Please enter a value to search</div>";
    setTimeout(() => {
      alert.innerHTML = "<div style='height:40px'></div>";
    }, 2000);
    letMeSearch = true;
    return;
  }
  linearSearch(value, 0);
};

document.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    search();
  }
});

let clear = (presentIndex) => {
  divElements[presentIndex].classList.remove("mid");
  divs[presentIndex].innerHTML = "";
};

let linearSearch = (target, presentIndex) => {
  let presentIndexSpan = document.getElementById("presentIndexSpan");

  if (presentIndex >= divs.length) {
    // Element is not found in array
    alert.innerHTML = "<div class='danger py-2 px-5'>Element not found</div>";

    // Removing Pointers
    presentIndexSpan.style.display = "none";

    // Search functionality is restored
    letMeSearch = true;

    setTimeout(() => {
      alert.innerHTML = "<div style='height:40px'></div>";
    }, 2000);
    return;
  }

  // If presentIndex is greater than the length of the array
  if (presentIndex > divs.length) {
    // Search functionality is restored
    letMeSearch = true;

    setTimeout(() => {
      alert.innerHTML = `<div class='danger py-2 px-5'>Element not found</div>`;
      setTimeout(() => {
        alert.innerHTML = "<div style='height:40px'></div>";
      }, 2000);
    }, 1000);
    return;
  }

  divElements[presentIndex].classList.add("mid");

  // Setting positions of present Element
  var rect = divElements[presentIndex].getBoundingClientRect();

  let presentIndexTop = rect.bottom + 5;
  presentIndexSpan.style =
    "display: inline; position: absolute; left:" +
    rect.left +
    "px; top:" +
    presentIndexTop +
    "px;";

  // linear Search
  if (divs[presentIndex] == target) {
    // Removing Pointers
    clear(presentIndex);
    presentIndexSpan.style.display = "none";

    // Search functionality is restored
    letMeSearch = true;

    alert.innerHTML = `<div class='success py-2 px-5'>Element found at index ${presentIndex}</div>`;
    setTimeout(() => {
      alert.innerHTML = "<div style='height:40px'></div>";
    }, 2000);

    // Found the div
    divElements[presentIndex].classList.add("correct");
    setTimeout(() => {
      divElements[presentIndex].classList.remove("correct");
      clear(presentIndex);
    }, 2000);
    return;
  }

  setTimeout(() => {
    clear(presentIndex);
    linearSearch(target, presentIndex + 1);
  }, 1000);
};
