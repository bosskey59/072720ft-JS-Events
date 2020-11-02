document.addEventListener("DOMContentLoaded", function(){
  mountFormListener()
  mountTitleClick()
  mountMouseEvent()

  const title = document.querySelector("#title")
  const author = document.querySelector("#author")
  const content = document.querySelector("#content")
})



const getPostData = function(form){
  return {
    title: title.value,
    author: author.value,
    content: content.value
  }
}

const htmlify = (obj) =>{
  return(`
    <div class="card">
      <div class="card-content">
        <span class="card-title">${obj.title}</span>
        <p>By: ${obj.author}</p>
        <p>${obj.content}</p>
      </div>
    </div>
  `)
}

function clearForm(){
  title.value = ""
  author.value = ""
  content.value = ""
}


function mountFormListener(){
  const postForm = document.querySelector("#blog-form")
  postForm.addEventListener("submit", function(event){
    event.preventDefault()
    // want to grab all info from the form
    const postObj = getPostData(event.target)
    
    // create a htmlified post from info
    const htmlPost = htmlify(postObj)
    
    // push it to the DOM to display
    document.querySelector(".post-lists").innerHTML += htmlPost

    // clear out form 
    // clearForm()
    event.target.reset() 

  })
  // debugger
}


// mess with the title color

let currentIndex = 0
const colors = ["red","blue","green","black"]
const maxIndex = colors.length

function colorChange(element){
  element.style.color = colors[currentIndex++]
  if(currentIndex === maxIndex){
    currentIndex = 0
  }
}

function mountTitleClick(){
  const header = document.querySelector(".header .center")
  header.addEventListener("click", function(e){
    colorChange(e.target)

  })
}


const mountMouseEvent = function(){
  const postsTitle = document.querySelector(".post-lists .center")
  postsTitle.addEventListener("mouseover", function(e){
    colorChange(e.target)
  })
}

