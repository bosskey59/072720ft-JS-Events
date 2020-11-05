document.addEventListener("DOMContentLoaded", function(){
  mountFormListener()
  mountTitleClick()
  mountMouseEvent()
  mountEditDestroy()
  fetchPosts()

  const title = document.querySelector("#title")
  const author = document.querySelector("#author")
  const content = document.querySelector("#content")
  const submit = document.querySelector("#submit")
})

function mountBlogsToDom(posts){
  posts.forEach(function(post){
     // create a htmlified post from info
     const htmlPost = htmlify(post)
     // push it to the DOM to display
     renderPost(htmlPost)
  })

  // for(post of posts){
  //   // create a htmlified post from info
  //   const htmlPost = htmlify(post)
  //   // push it to the DOM to display
  //   document.querySelector(".post-lists").innerHTML += htmlPost
  // }
}

function mountEditDestroy(){
  // fire this off after posts have been displayed.
  // collect all edit buttons querySelector all
  // iterating through and adding a event listener

  document.querySelector(".post-lists").addEventListener("click", function(e){
    if(e.target.className === "edit"){
      // get all info of post
      const [currentTitle, currentAuthor, currentContent] = e.target.parentElement.querySelectorAll("span")
      const id = e.target.parentElement.id
      // putting that info into the form
      title.value = currentTitle.innerText
      author.value = currentAuthor.innerText
      content.value = currentContent.innerText
      // we need make some change to form to know if we are editing or creating
      submit.value = "Edit Post"
      const form = document.querySelector("#blog-form")
      form.dataset.action = "update"
      form.dataset.post = id

    }else if( e.target.className === "delete"){
      console.log("delete clicked")
    }
  })
}

function fetchPosts(){
  fetch("http://localhost:3000/api/v1/posts")
  .then(resp => resp.json())
  .then( posts => {
    document.querySelector(".post-lists").innerHTML = `<h3 class="center">List of Posts</h3>`
    mountBlogsToDom(posts)
  })

  // console.log(fetch("http://localhost:3000/posts")
  // .then(function(resp){
  //   return resp.json()
  // }))
  // .then(function(posts){
  //   mountBlogsToDom(posts)
  // })

  
}

const getPostData = function(form){
  return {
    title: title.value,
    author: author.value,
    content: content.value
  }
}

const htmlify = (obj) =>{
  return(`
    <div class="card" >
      <div class="card-content" id=${obj.id}>
        <span class="card-title">${obj.title}</span>
        <p>By:<span>${obj.author}</span></p>
        <p><span>${obj.content}</span></p>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    </div>
  `)
}

function clearForm(){
  title.value = ""
  author.value = ""
  content.value = ""
}

function renderPost(html){
  document.querySelector(".post-lists").innerHTML += html
}


function mountFormListener(){
  const postForm = document.querySelector("#blog-form")
  postForm.addEventListener("submit", function(event){
    event.preventDefault()
    // want to grab all info from the form
    const postObj = getPostData(event.target)

    // decide what type of request to send
    if(event.target.dataset.action === "update"){
      const post = {...postObj, id: event.target.dataset.post}
      updatePost(post)
      .then(resp => resp.json())
      .then(data =>{
        fetchPosts()
      })

      // send patch request to actually make edit
      // reset form/ change it back create
    }else{
      createPost(postObj)
    }
    event.target.reset() 

  })
  // debugger
}

function updatePost(postObj){
  return fetch(`http://localhost:3000/api/v1/posts/${postObj.id}`,{
    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({post:postObj}) // body data type must match "Content-Type" header
  })
}


// post request
function createPost(postObj){
  // send a fetch request to create post on backend
  fetch("http://localhost:3000/api/v1/posts",{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({post:postObj}) // body data type must match "Content-Type" header
  })
  .then(resp => resp.json())
  .then(post =>{

    // create a htmlified post from info
    const htmlPost = htmlify(post)
    
    // push it to the DOM to display
    renderPost(htmlPost)

    // clear out form 
    // clearForm()
    

  })
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

