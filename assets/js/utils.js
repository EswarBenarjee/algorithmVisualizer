// Random Number Generator
let getRoundedInt = (start = 1, end = 30) => {
  // Returns a random integer between start and end
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

// Is Sorted Function
let isSorted = (nums) => {
  for (let i = 0; i < nums.length - 1; i++) {
    console.log(nums[i], nums[i + 1]);
    if (nums[i] > nums[i + 1]) return false;
  }
  return true;
};

// Replace body with text if screeen height is more than screen width
let replaceBody = () => {
  // Check for mobile devices
  if (window.innerWidth < 768) {
    document.body.innerHTML =
      "<div class='d-block m-auto p-3 pt-5 mt-5 text-center'>Please use a Tablet or Desktop or Laptop. <i class='fa-solid fa-laptop'></i></div>";
  }
};
replaceBody();

// Selecting the Code Block according to Query Parameter
const queryString1 = window.location.search;
const urlParams1 = new URLSearchParams(queryString1);

if (
  urlParams1.get("code") == "cpp" ||
  urlParams1.get("code") == "python" ||
  urlParams1.get("code") == "java"
) {
  document.getElementById(urlParams1.get("code")).click();
} else if (urlParams1.get("code") != null) {
  // error code
  Swal.fire(
    "Error!",
    "Please select a valid code block from the dropdown menu.",
    "error"
  );
}

// Share Project
const share = () => {
  console.log("Sharing content");
  navigator.share({
    title: "Algorithm Visualizer",
    text: "An Algorithm Visualizer by Eswar Benarjee!",
    url: "https://eswarbenarjee.in/algorithmVisualizer",
  });
};

// Generate zombie video on below screen randomly
// let zombieVideoDiv = document.createElement("video");
// zombieVideoDiv.id = "zombie-video";
// zombieVideoDiv.autoplay = true;
// zombieVideoDiv.loop = true;
// zombieVideoDiv.style.position = "absolute";
// document.body.appendChild(zombieVideoDiv);

// console.log("Zombie Video Loaded");

// let zombieVideo = () => {
//   let video = document.getElementById("zombie-video");
//   video.src = `assets/img/zombie_walk.mp4`;
//   Swal.fire({
//     title: "Zombie Alert!",
//     text: "Congrats, you've got a zombie in your code.",
//     icon: "warning",
//   }).then(() => {
//     zombieVideoDiv.style.display = "inline";
//     zombieVideoDiv.play();
//   });
// };

// let randomNum = getRoundedInt(1, 5);
// console.log(randomNum);
// if (randomNum == 1) zombieVideo();
