// Random Number Generator
let getRoundedInt = (start = 1, end = 10000000000) => {
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
