/**
 * To implement addition, substraction, Multiplication, Division
 * operations for two arrays
 * Requirement: the input should only be positive integers and
 * should not be greating than 9 at every index
 */

/**subFunction to check if the input is valid or not
 * @private 
 * @param {Array} Number input array should be number
 * @return {boolean} wheather the input is valid or not
 */
function checkInput(numArray) {
  //To check if the input is array or not
  if (!Array.isArray(numArray)) {  
    throw new Error("Given input is not an Array"); 
  }

  //To check if the array is empty or not
  if (numArray.length === 0) {     
    throw new Error("Given Input is Empty");
  }

  //To check if the array consist only integer and value b/w 0 and 9 or not
  for (let i = 0; i < numArray.length; i++) {    
    if (!Number.isInteger(numArray[i]) || numArray[i] < 0 || numArray[i] > 9)
      throw new Error("Please input valid Integer between 0 - 9")
  }
  return true;
}

/**subFunction to remove all leading zeros from input
 * @private
 * @param {Array} Number take the input array
 * @return {Array} after removing all the leading zeros
 */
function removeLeadingZeros(numArray) {
  arrIndex = 0;

  //To remove Initial zero's from array Ex; [0,0,1,2] -> [1,2]
  while (numArray[arrIndex] === 0) {
    numArray.shift();
  }
  return numArray;
}

/**Function to return addition of two arrays
 * @param {Array<Number>} num1 input array should be number
 * @param {ArrayM<Number>} num2 input array should be number
 * @throws {Error} if input is not integer or it is <0 or >9
 * @return {Array} result array of addition
 */
function additionOfTwoArray(num1, num2) {
  //check if the input is valid
  if (checkInput(num1) === false || checkInput(num2) === false) {
    return;
  }

  //remove preceeding zeros
  num1 = removeLeadingZeros(num1);
  num2 = removeLeadingZeros(num2);
  
  let ans = []; //ans to be returned
  let num1Index = num1.length - 1;
  let num2Index = num2.length - 1;
  let carry = 0;

  //Addition till smallest length array to be done 
  while (num1Index >= 0 && num2Index >= 0) {
    let addedValue = num1[num1Index] + num2[num2Index]+carry;
    let temp = addedValue % 10;
    carry = Math.floor(addedValue / 10);
    ans.unshift(temp);
    num1Index -= 1;
    num2Index -= 1;
  }

  //Addition of longest size array with carry
  while (num1Index >= 0) {
    let addedValue = num1[num1Index] + carry;
    let temp = addedValue % 10;
    carry = Math.floor(addedValue / 10);
    ans.unshift(temp);
    num1Index -= 1;
  }
  while (num2Index >= 0) {
    let addedValue = num2[num2Index] + carry;
    let temp = addedValue % 10;
    carry = Math.floor(addedValue / 10);
    ans.unshift(temp);
    num2Index -= 1;
  }
  //insert if carry is remaining
  if(carry!==0){ans.unshift(carry)}

  //return the answer
  return ans.length===0?[0]:ans;

}

/**subfunction to do subtraction of Smaller num from Larger
 * @private
 * @param {Array<Number>} greaterNum input array should be number
 * @param {Array<Number>} smallerNum input array should be number
 * @return {Array} result of subtraction
 */
function subtractSmallerFromLower(greaterNum, smallerNum) {
  
  let smallerNumIndex = smallerNum.length - 1;
  let greaterNumIndex = greaterNum.length - 1;
  let carry = 0;

  //ans to return
  let ans = [];   

  //to do subtraction till smallest length array 
  while (smallerNumIndex >= 0) {
    //if carry is remaining then subtract from current integer
    if (carry === 1) greaterNum[greaterNumIndex] -= 1;
    let temp = 0;

    //if number is smaller then take carry from other number
    if (greaterNum[greaterNumIndex] < smallerNum[smallerNumIndex]) {
      temp = greaterNum[greaterNumIndex] + 10 - smallerNum[smallerNumIndex];
      carry = 1;
    }
    //if greaterNum is bingger than other number 
    else {
      temp = greaterNum[greaterNumIndex] - smallerNum[smallerNumIndex];
      carry = 0;
    }
    ans.unshift(temp);
    smallerNumIndex -= 1;
    greaterNumIndex -= 1;
  }

  //subtraction of rest of array elements from longest size array
  while (greaterNumIndex >= 0) {
    if (carry === 1) greaterNum[greaterNumIndex] -= 1;
    if (greaterNum[greaterNumIndex] < 0) {
      ans.unshift(9);
      carry = 1;
    } else {
      ans.unshift(greaterNum[greaterNumIndex]);
      carry = 0;
    }
    greaterNumIndex -= 1;
  }
  return ans.length===0?0:ans;
}

/**Function to return Subtraction of two Arrays
 * @param {Array<Number>} num1 input array should be number
 * @param {Array<Number>} num2 input array should be number
 * @throws {Error} if input is not integer or it is <0 or >9 or in Decimal
 * @return {Array} result array of Substraction
 */
function SubtractionOfArray(num1, num2) {
  //check if the input is valid
  if (checkInput(num1) === false || checkInput(num2) === false) {
    return;
  }

  //remove preceding zeros
  num1 = removeLeadingZeros(num1);
  num2 = removeLeadingZeros(num2);
  let ans = [];

  //check for cases
  // if 1st number length is greater than 2nd
  if (num1.length > num2.length) {
    ans = subtractSmallerFromLower(num1, num2);
    removeLeadingZeros(ans);
  } 
  //if 2nd number length is greater than 1st
  else if (num2.length > num1.length) {
    ans = subtractSmallerFromLower(num2, num1);
    removeLeadingZeros(ans);
    ans.unshift("-");
  }
  //if both number have same length then check for individual index  
  else {
    let num1Index = num1.length - 1;
    let num2Index = num2.length - 1;

    while (
      num1Index > 0 &&
      num2Index > 0 &&
      num1[num1Index] === num2[num2Index]
    ) {
      num1Index -= 1;
      num2Index -= 1;
    }
    //if both the number are same
    if (num1[num1Index] === num2[num2Index]) return [0];
    // if 1st number is greater than 2nd
    else if (num1[num1Index] > num2[num2Index]) {
      ans = subtractSmallerFromLower(num1, num2);
      removeLeadingZeros(ans);
    }
    //if 2nd number is greater than 1st 
    else {
      ans = subtractSmallerFromLower(num2, num1);
      removeLeadingZeros(ans);
      ans.unshift("-");
    }
  }

  return ans;
}

/**subFuntion to multiply one number with entire array
 * @private 
 * @param {Number} num to be multiplied
 * @param {Array<Number>} numArray to be multiplied
 * @return {Array} Array after multiplication
 */
function multiplyWithNumber(numArray, num, initialZero) {
  let ans = [];
  let carry = 0;

  //to append initial zero for final calculation
  for (let zeroCount = 0; zeroCount < initialZero; zeroCount++) {
    ans.unshift(0);
  }
  for (let numIndex = numArray.length - 1; numIndex >= 0; numIndex--) {
    let temp = (numArray[numIndex] * num) + carry;
    ans.unshift(temp%10);
    carry = Math.floor(temp/10);
  }
  if(carry!==0) ans.unshift(carry)
  
  return ans;
}

/**Function to return the multiplication of two Arrays
 * @param {Array<Number>} num1 input array should be number
 * @param {Array<Number>} num2 input array should be number
 * @throws {Error} if input is not integer or it is <0 or >9 or in Decimal
 * @return {Array} result array of Multiplication
 */
function multiplicationofTwoArray(num1, num2) {
  //check if the input is valid
  if (checkInput(num1) === false || checkInput(num2) === false) {
    return;
  }

  // //remove preceding zeros
  // num1 = removeLeadingZeros(num1);
  // num2 = removeLeadingZeros(num2);
  let ans = [0];

  //multiply entire num1 array with elemetents of num2 array one by one 
  // then add it to the ans 
  for (let num2Index = num2.length - 1; num2Index >= 0; num2Index--) {
    let initialZero = (num2.length - 1) - num2Index;
    ans=additionOfTwoArray(ans,
      multiplyWithNumber(num1,num2[num2Index],initialZero))
  }
  
  
  return ans;
}

console.log(`Addition of two Arrays: ${additionOfTwoArray([5,2,1],[5,2,1]).join("")}`)
console.log(`Subtraction of two Arrays: ${SubtractionOfArray([0,0,0,0,1],[1,0,1,0]).join("")}`)
console.log(`Multiplication of two Arrays: ${multiplicationofTwoArray([0,0,0,0,1], [5,0,6,3,2]).join("")}`);
