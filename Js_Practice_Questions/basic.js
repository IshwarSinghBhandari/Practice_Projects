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


