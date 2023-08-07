function createId() {
  // trả về một chuỗi ngẫu nhiên gồm 12 ký tự: 0-9a-zA-Z;
  const characters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  let length = 12;
  let charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    let idx = Math.floor(Math.random() * charactersLength);
    result += characters[idx];
  }
  return result;
}

const PRODUCTS = [
  {
    id: 'hBuZdx1elR5a',
    name: 'Fushigidane',
    thumb: 'Fushigidane.png',
    shortDesc:
      'Người ta thường thấy Fushigidane nằm ngủ dưới ánh nắng. Càng đắm mình trong nắng, hạt giống trên lưng chúng càng phát triển.',
    price: 12,
  },
  {
    id: 'fDQWzrgq6gXX',
    name: 'Hitokage',
    thumb: 'Hitokage.png',
    shortDesc: 'Tính cách ưa thích đồ nóng. Nghe nói khi trời mưa khói sẽ phụt ra từ đuôi của nó.',
    price: 15,
  },
  {
    id: 'aLjNSdeJi9Q2',
    name: 'Zenigame',
    thumb: 'Zenigame.png',
    shortDesc:
      'Chiếc mai của Zenigame không chỉ để tự vệ, mà còn làm giảm tối đa lực cản nước nhờ hình dáng tròn trịa cùng bề mặt nhiều rãnh, giúp chúng bơi nhanh hơn.',
    price: 25,
  },
  {
    id: 'rOYIHlZQlwdV',
    name: 'Pikachu',
    thumb: 'Pikachu.png',
    shortDesc: 'Những Pikachu có thể tạo ra dòng điện càng mạnh thì túi má càng mềm mại và lớn nhanh.',
    price: 32,
  },
  {
    id: 'zzC3HkWp9g4s',
    name: 'Purin',
    thumb: 'Purin.png',
    shortDesc:
      'Những bản thu âm tuyển tập bài hát ru kì lạ của Purin được bán tại các cửa hàng tạp hóa. Rất nhiều người coi chúng là vật gối đầu giường.',
    price: 9,
  },
];

let carts = [
    {
      id: 'qhZ2wNwZZW63',
      productId: 'hBuZdx1elR5a',
      quantity: 2,
    },
    {
      id: 'gijYjCti3BvR',
      productId: 'fDQWzrgq6gXX',
      quantity: 1,
    },
    {
      id: 'RQpImf7zc8ao',
      productId: 'aLjNSdeJi9Q2',
      quantity: 3,
    },
    {
      id: 'LPobAEvux29H',
      productId: 'rOYIHlZQlwdV',
      quantity: 6,
    },
    {
      id: 'PpLjmYoKdRG1',
      productId: 'zzC3HkWp9g4s',
      quantity: 1,
    },
];
let listProducts=document.querySelector("#listProducts")
let renderListProducts=(arr)=>{
  let result=''
  for (const i in arr){
  result +=`<div class="row align-items-center">
  <div class="col-6 col-md-4">
    <img src="img/${arr[i].thumb}" alt="" class="img-fluid">
  </div>
  <div class="col-6 col-md-8">
    <h6>${arr[i].name}</h6>
    <div class="form-group">
      <div class="d-flex">
        <button class="btn btn-primary"> - </button>
        <input type="text" class="form-control mx-1" value="1" min="1">
        <button class="btn btn-primary"> + </button>
      </div>
      <button class="btn btn-danger btn-block mt-1 btn-add-to-cart">$${arr[i].price}</button>
    </div>
  </div>
</div> `
}
  return listProducts.innerHTML=result
}
renderListProducts(PRODUCTS)
let btn=document.querySelectorAll(".btn-primary")
let formControl=document.querySelectorAll(".form-control")
let btnAdd=document.querySelectorAll(".mt-1")
// let objName=document.querySelectorAll("h6")
let cartProducts=document.querySelector('#cardProducts')
let addQuantity=document.querySelectorAll("td input")
let subTotal=document.querySelector("#toTal")
let count=document.querySelector("#count")

let objectProduct=[]
// let objPrice=[20,20,20,20]


let render=(arr)=>{
  let result=''
  for (const i in arr){
    let increaseItem=parseInt(i)
  result +=`  <tr>
                <td>${increaseItem+1}</td>
                <td>${arr[i].name}</td>
                <td>${arr[i].pri}</td>
                <td>
                  <input type="number" class="form-control add-quantity" value=${arr[i].quantity}>
                </td>
                <td><span class="fw-bold">$${arr[i].subTotal}</span></td>
                <td>
                  <button type="button" class="btn btn-link btn-sm btn-rounded btn-block update">Update</button>
                  <button type="button" class="btn btn-link btn-sm btn-rounded btn-block delete">Delete</button>
                </td>
              </tr>
              `
  }

  return cartProducts.innerHTML=result
}
let createObj=(i) =>{
  const objProduct={
    id: createId(),
    name: PRODUCTS[i].name,
    pri: PRODUCTS[i].price,
    quantity: formControl[i].value,
    subTotal:parseInt(formControl[i].value)*PRODUCTS[i].price
  }
  objectProduct.push(objProduct)
  formControl[i].value=0
  }


let toTal =(arr) =>{
  let sum=0
  for (const i of arr){
    sum +=i.subTotal
  }
  subTotal.textContent="$"+`${sum}`
}
let updateObject=(arr) =>{
  let btnUp=document.querySelectorAll(".update")
  let quantity=document.querySelectorAll(".add-quantity")
  for (const i in btnUp){
    btnUp[i].onclick=() =>{
      arr[i].quantity=quantity[i].value
      arr[i].subTotal=parseInt(arr[i].quantity)*arr[i].pri
      saveLocalStorage(objectProduct)
      toTal(arr)
      counter(arr)
      render(arr)
      updateObject(arr)
      deleteObject(arr)
    }
}
}


let deleteObject=(arr) =>{
  let btnDe=document.querySelectorAll(".delete")
  for (const i in arr){
  btnDe[i].onclick=() =>{
      removeLocalStorage(arr,i)
      arr.splice(arr.indexOf(arr[i]), 1); 
      toTal(arr)
      counter(arr)
      render(arr)
      deleteObject(arr)
      updateObject(arr)
      toTal(arr)
  }}}


let addData =(arr) =>{
  for (const i in Object.entries(localStorage)){
    arr.push(JSON.parse(localStorage.getItem(Object.entries(localStorage)[i][0])))
  }
  return arr
}

let saveLocalStorage =(arr)=>{
  for (const i in arr){
    localStorage.setItem(arr[i].id,JSON.stringify(arr[i]))
}}

let removeLocalStorage =(arr,i)=>{
    localStorage.removeItem(arr[i].id)
  }
  
let counter=(arr) =>{
  let numberItems=0
  for (const i in arr){
    numberItems+=parseInt(arr[i].quantity)
  }
  return count.innerHTML=numberItems
}


btn[0].onclick=()=>{
  if (formControl[0].value > 0)
    formControl[0].value--
      }

btn[1].onclick=()=>{
  formControl[0].value++
}

btn[2].onclick=()=>{
  if (formControl[1].value > 0)
    formControl[1].value--
}

btn[3].onclick=()=>{
  formControl[1].value++
}
btn[4].onclick=()=>{
  if (formControl[2].value > 0)
    formControl[2].value--
}

btn[5].onclick=()=>{
  formControl[2].value++
}
btn[6].onclick=()=>{
  if (formControl[3].value > 0)
    formControl[3].value--
}

btn[7].onclick=()=>{
  formControl[3].value++
}
btn[8].onclick=()=>{
  if (formControl[4].value > 0)
  formControl[4].value--
}
btn[9].onclick=()=>{
  formControl[4].value++
}
  for (const i in btnAdd) {
    btnAdd[i].onclick =() =>{
      createObj(i)
      render(objectProduct)
      toTal(objectProduct)
      counter(objectProduct)
      saveLocalStorage(objectProduct)
      updateObject(objectProduct)
      deleteObject(objectProduct)
      
    }}

addData(objectProduct)
toTal(objectProduct) 
render(objectProduct)
counter(objectProduct)
updateObject(objectProduct)
deleteObject(objectProduct)






