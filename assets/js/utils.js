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
