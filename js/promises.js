done = true

const firstFunc = function(){
    console.log("oven started preheat")
    return new Promise(function(resolve, reject){
        if (done){
            resolve("Oven ready to bake")    
        }else{
            reject("Promise Failed")
        }
    })
}

const secondFunc = function(data){
    return new Promise(function(resolve, reject){
        resolve(data+"very useful but confusing at first!")
    })
}

function amazingFunc(){
    return "This Functions is doing a lot of cool stuff!"
}

let newVar

// console.log("js file")
// firstFunc()
// .then(info => secondFunc(info))
// .then(console.log)

async function myRequest(){
    const result = await firstFunc();
    newVar = await secondFunc(result);
    console.log(newVar)
 }

 myRequest()
 console.log(newVar)
 

