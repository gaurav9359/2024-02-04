/**
 * Problem Statement - To implement code for 4 Problems related to Js Numbers
 * 1)To make a function named getSimple2sComplement(Number, Number)
 *         - It will take two numbers as input and return an array of 2s complement
 * 2)To make a function named getSimpleDecimalFrom2sComplement(Number, Number)
 *          -It will take array of binary and return the two's Complement
 * 3)To make a function named getJsNumberRepresentation(Number)
 *          -It will take any number and represent it in Js way
 * 4)To make a function named getNumberFromJsRepresentation(Number)
 *          -It will take array of Js representation and return a number
 */



// 1st Problem

/**subfunction to convert decimal to binary
 * @param {Number} takes decimal number
 * @param {Number} takes number of bits
 * @return {Array} returns the binary Representation
 */

function convertBinary(num,numOfBits){
    let ans= new Array(numOfBits).fill(0)
    num=num<0?num=num*(-1):num

    let i=0;
    
    while(num!==0){
        let temp=num&1;
        ans[i]=temp
        num=num>>1
        i++;
    }
    return ans
}

/** Function to convert Decimal to 2's complement
 * @param {Number} num to be Represented
 * @param {Number} numOfBits of bits
 * @throws {Error} if the parameters are not number
 * @returns {Array} of binary Representation
 */


function getSimple2sComplement(num,numOfBits){
    //if the parameters are not number throw error
    if(typeof num!== 'number' || num>=(2**(numOfBits-1)-1)|| num<=(-1*(2**(numOfBits-1)))){
        console.log('input is not ')
        return 
    }

    //convert decimal to binary
    let ans=convertBinary(num,numOfBits)

    //if the number is positive 
    if(num>=0){
        return ans.reverse()
    }
    //if the number is negative
    else{
        ans[numOfBits-1]=1
        return ans.reverse();
    }
    
}

// 2nd Problem

/**Converts Binary into Decimal
 * @param {Array} input binary array
 * @throws {Error} if the input array element is not 0 or 1
 * @return decimal
 */

function binaryToDecimal(binaryNum){
    let ans=0;
    let j=0
    for(let i=binaryNum.length-1;i>0;i--){
        
        let temp=binaryNum[i]*(2**j);
        ans+=temp
        j++
    }
    return ans;

}

/** Function to convert from 2's Complement to Decimal
 * @param {Array} binaryNum binary representation of number
 * @throws {Error} if the parameters are not number or it is greater than 52
 * @return {Number} Decimal representation of binary input
 */

function getSimpleDecimalFrom2sComplement(binaryNum){
    // //check if the input is correct, return otherwise
    for(let i=0;i<binaryNum.length;i++){
        if(binaryNum[i]!==1 && binaryNum[i]!==0){
            return 'invalid input'
        }
    }

    //convert binary into decimal and store into ans
    let ans= binaryToDecimal(binaryNum)
    console.log(ans)

    //if the first bit is 1(for negative)
    if(binaryNum[0]===1) return -1*(ans+1);

    //if the first bit is 1(for negative)
    else return ans

}

//3rd Problem

/**Function to convert Number to JsNumber Representation
 * @param {Number} num number to be converted
 * @throws {Error} if the input is not valid
 * @returns {Array} of Number in Js Representation
 */

function getJsNumberRepresentation(num){
    //check if the num is valid input 

    //procedure

    //return 
}

/**Function to convert JsNumber Representation to Number
 * @param {Array} jsNum JsNumber input
 * @throws {Error} if the array is not valid
 * @return {Number} decimal number
*/

function getNumberFromJsRepresentation(jsNum){
    //check if the parameter is correct

    //procedure

    //return 
}


console.log(getSimple2sComplement(-8,11).join(''))
let sample_input=[1,1,0,0,0]

console.log(getSimpleDecimalFrom2sComplement(sample_input))







