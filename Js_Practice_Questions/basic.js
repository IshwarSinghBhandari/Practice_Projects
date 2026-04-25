//  1. Reverse a string in JavaScript.-----------------

// const str = "Ishwar Singh";
// // method #1
// let revStr = str.split('').reverse().join('');
// console.log(revStr)
// // method #2
// let revStr2 = ''
// for(let i=1; i< str.length; i++)
// {
//     revStr2 += str[str.length-i]
// }
// console.log(revStr2)

// 2. Check if a string is a palindrome.-------------------

// const string = 'madam'
// const string = 'abcdf'
// let strRev= string.split('').reverse().join('')
// if(string === strRev){
//     console.log("The string is palindrome")
// }
// else {
//     console.log("The string is not palindrome")
// }

// 3. Check if a number is prime.-----------------------

// function PrimeNumber(num) {
//   if (num <= 1) return false; // 1 and negatives are not prime
//   if (num === 2) return true;  // 2 is the only even prime
//   if (num % 2 === 0) return false; // exclude even numbers early
// //   for (let i = 2; i < num; i ++) {
//   for (let i = 2; i < Math.sqrt(num); i ++) { //For Time Complexity
//    if(num % i === 0){
//      console.log(i , " num");
//     console.log(num % i);
//     return false
//    }
//   }
//    return true
// }
// if(PrimeNumber(35) === true ){
// console.log( "Is Prime Number")
// }
// else{
//     console.log( "Is Not Prime Number");
// }

// 4. Find the largest number in an array.----------------------

// const arr = [3,4,4,234,5,56,23,34];
// // #1 method
// console.log(Math.max(...arr))
// // #2 method
// let large= 0
// for( let i in arr){
//     if(large < arr[i]){
//         large = arr[i]
//     }
// }
// console.log("large number in array = " , large)

// 5. Find the factorial of a number.----------------------------

//  const num = 5;
// //  #1 method
//  const numArray = Array.from({length:num},(_,i) =>i+1 )
//  const factorial = numArray.reduce( (acc,val) => acc * val,1)
//  console.log("Factorial = ", factorial)
// #2 method
// let factorial=1
// for(let i=1 ;i<= num ; i++ ){
//     factorial *=i
// }
// console.log("Factorial = ", factorial)

// 6. Remove duplicate elements from an array.------------------------------

// const arr = [2, 3, 5, 4, 7, 8, 2, 4, 5, 5, 5, 5, 5, 5];
// // #1 method
// // const newarr = [];
// for (let i = 0; i < arr.length; i++) {
//   console.log(!newarr.includes(arr[i]));
//   if (!newarr.includes(arr[i])) {
//     newarr.push(arr[i]);
//   }
// }
// console.log(newarr);
// // #2 method
// console.log([...new Set(arr)]);

// 7. Swap two variables using a third variable.-----------------------------

// let a = 23;
// let b = 34;
// console.log("a =" ,a , "b =" , b);
// let c = a;
//    a = b;
//    b = c;
// console.log("swaped  -  a =" ,a , "b =" , b);

// 8. Swap two variables without using a third variable.-----------------------------
// // #1 method
// let a = 23;
// let b = 34;
// console.log("a =" ,a , "b =" , b);
//    a = a+b;
//    b = a-b;
//    a = a-b;
// console.log("swaped  -  a =" ,a , "b =" , b);
// // #2 method
// let a = 23;
// let b = 34;
// console.log("a =" ,a , "b =" , b);
// [a, b] = [b, a];
// console.log("swaped  -  a =" ,a , "b =" , b);

// 9. Find the second largest number in an array.--------------------------------

// let arr = [23, 53, 2, 54, 95, 7, 34, 76, 9];

// #1 method
// let large = "";
// let large2 = "";
// let secondlarge = "";
// for (let i = 0; i < arr.length; i++) {
//   if (large2 < arr[i]) {
//     large = i;
//     large2 = arr[i];
//   }
// }
// arr.splice(large, 1);
// for (let i = 0; i < arr.length; i++) {
//   if (secondlarge < arr[i]) {
//     secondlarge = arr[i];
//   }
// }
// console.log("secondlarge = ", secondlarge);

// #2 method
// let large = "";
// let secondlarge = "";

// for (let num of arr){

//     if(num >large){
//         // secondlarge = large;
//         large = num
//     }
//     else if(num > secondlarge && num < large ){
//         secondlarge = num
//     }
// }
// console.log(secondlarge)

// #3 method
// arr.sort((a,b) => b - a);
// let secondLargest = arr[1];
// console.log(secondLargest);

// 10. Convert the first letter of each word in a string to uppercase.---------------------
// const str ="ishwar singh bhandari";
// // #1 method
// let captalize = str.split(" ").map((i)=>{
//     return i.charAt(0).toUpperCase() + i.slice(1)
// }).join(' ')
// console.log(captalize)
// // #2 method
// let result = str.replace(/\b\w/g, (char) => char.toUpperCase());
// console.log(result);