// If search is already triggered, disable search functionality
let letMeSearch = true;

let create = (type = "random") => {
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

  // Clear Linear Search Div before creating new divs
  linearSearchDiv.innerHTML = "";
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
    linearSearchDiv.appendChild(newDiv);
  }

  // Create Present Element Pointer
  let presentIndexSpan = document.createElement("div");
  presentIndexSpan.innerHTML = "present";
  presentIndexSpan.classList = "pointer";
  presentIndexSpan.id = "presentIndexSpan";
  linearSearchDiv.appendChild(presentIndexSpan);

  // Random Search Element
  let randomSearchElement = getRoundedInt(min, max);
  searchElement.value = randomSearchElement;
};

let linearSearchDiv = document.getElementById("linearSearch");
let searchElement = document.getElementById("searchElement");
let alert = document.getElementById("alert");
let customArray = document.getElementById("customArray");
let divs = [];
create();
console.log(divs);
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
  if (value.length == 0) {
    alert.innerHTML =
      "<div class='danger py-2 px-5'>Enter search element</div>";
    setTimeout(() => {
      alert.innerHTML = "";
      letMeSearch = true;
    }, 1000);
    return;
  } else linearSearch(parseInt(value), 0, divs.length - 1);
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
