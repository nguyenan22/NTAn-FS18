let elementTitle=document.getElementById("title").value
let elementAuthor=document.getElementById("author").value
let elementButton=document.getElementById("button")
console.log(elementTitle,elementAuthor)

let createObject=() =>{
    return {
        title: elementTitle,
        author:elementAuthor
    }
}

let main=(data) =>{
    elementButton.onclick=() =>{
        fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
  }
  )
}
}
main(createObject())