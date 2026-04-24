//  1. Reverse a string in JavaScript.-----------------

const str = "Ishwar Singh";
// method #1
let revStr = str.split('').reverse().join('');
// console.log(revStr)

// method #2
let revStr = ''
for(let i=1; i< str.length; i++)
{
    revStr += str[str.length-i]
}
// console.log(revStr)

// 2. Check if a string is a palindrome.-------------------




