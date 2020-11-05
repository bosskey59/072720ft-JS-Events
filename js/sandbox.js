console.log("in sandbox")

function declaration(){
  console.log("declaration")
}

const expression = function(){
  console.log("expression")
}

const arrowExpression = (a,b) => (
  "hello world " + a + b
)

function delayFunc(callback, seconds){
  setTimeout(callback(), seconds*1000)
}

const nums = [1,2,3,4,5,6]


const printNums = function(num){
  console.log(num)
}
const plus100 = function(num){
  console.log(num+100)
}

// nums.forEach(function(element, index, originalArray){
//   console.log(element, index, originalArray)
// } )

function myEach(arr, callback){
  let i = 0
  while(i < arr.length){
    callback(arr[i], i, arr)
    i++
  }
}

// myEach(nums, printNums)
// myEach(nums, plus100)

// function one(){
//   console.log("1")

//   setTimeout(() => {
//     console.log("3 secs passed")
//   }, 3000);
// }

// function two(){
//   console.log("2")

//   setTimeout(function(){
//     console.log("1 secs passed")
//   }, 1000);
// }

// one()
// two()

const timer = setInterval(() => {
  console.log("2 seconds passed")
}, 2000);

