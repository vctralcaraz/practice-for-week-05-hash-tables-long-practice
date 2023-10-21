function anagrams(str1, str2) {
  // Your code here
  const set1 = new Set(str1.split(''));

  for(let i = 0; i < str2.length; i++) {
    let char = str2[i];

    if(!set1.has(char)) {
      return false;
    }
  }

  return true;
}


function commonElements(arr1, arr2) {
  // Your code here
  const set1 = new Set(arr1);
  const arr = [];

  for(let i = 0; i < arr2.length; i++) {
    let el = arr2[i];

    if(set1.has(el)) {
      arr.push(el);
    }
  }

  return arr;
}


function duplicate(arr) {
  // Your code here
  let memo = {};

  for(let i = 0; i < arr.length; i++) {
    let el = arr[i];

    if(el in memo) {
      return el;
    }

    memo[el] = 1;
  }
}


function twoSum(nums, target) {
  // Your code here
  const set1 = new Set(nums);

  for(let i = 0; i < nums.length; i++) {
    let el = nums[i];
    let complement = target - el;

    if(complement !== el && set1.has(complement)) return true;
  }

  return false;
}


function wordPattern(pattern, strings) {
  // Your code here
  const memo = {};
  
  for (let i = 0; i < pattern.length; i++) {
    if (!memo[pattern[i]]) {
      for (key in memo) {
        if (memo[key] === strings[i]) {
          return false;
        }
      }

      memo[pattern[i]] = strings[i]; 
    } else if (memo[pattern[i]] !== strings[i]) {
      return false;
    }
  }

  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];