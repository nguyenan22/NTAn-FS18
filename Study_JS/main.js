console.log('test JS')
// alert("hello") //gọi hàm
// console.log() //in ra giá trị log
// console.error() //in ra giá trị lỗi
// confirm("bạn có khỏe không ")// in ra thông báo chọn yes or no
// prompt("hôm nay thề nào") //in ra thông báo , nhập giá trị trả lời
// setTimeout(function() {
//     alert("chào bạn")
// },2000) //thực hiện công việc sau khoảng thời gian quy định
// setInterval(() =>{
//     console.log(`hello  ${Math.random}`)
// },2000) //thực hiện công việc sau mổi thời gian set




// CÁCH KHAI BÁO BIẾN
// ES5 ====> var
// ES6 ====> let, const(do not unique)
// pascal case: viết hoa chữ cái đầu
//camel case: viết hoa chữ cái thứ 2
//snake case:viết thường hết
// var UserName="Trường An" //pascal case
// var userName="ahihi" //camel case
// var user_name="sdndjnf" //snake case
// // let b="10";
// let b=10;

// function myfunctions() {   ///declare functions
//     console.log(a+b)
// }


// var myfunctions=function() { //express functions
//     console.log(a+b)
// }
    
// var myfunctions = () => { //arrow functions
//     console.log(a+b)
// }
// myfunctions();

// var userName="Nguyễn Trường An";
// var age=18;
// var nextAge=age+11;
// console.log("Tên:",userName,"Tuổi:",age,"Tuổi mới: ",nextAge)




// let b=8;
// console.log( ++b*3 - b--*2) //a=1 a+1
// console.log(a)
// let name='nguyễn'
// console.log(name+="  an")
// var lastName = 'An';
// var firstName = ' Nguyễn Trường';
// var fullName = firstName +" "+ lastName;
// console.log(fullName)
// var a = 1;
// var b = -1;
// var c = 0;
// var d = 0;

// var e = a <= b;
// var f = c === d;
// var g = a >= c;

// console.log(e, f, g)
// Nguyen Le Ben Chi
// hãy tạo biến canBuyAlcohol để thể hiện xem giá trị của biến age có đủ tuổi mua rượu hay không(?).
// log ' được nhậu'
// Theo luật, người từ 18 tuổi trở lên mới được phép mua rượu
// age=prompt("Bạn bao nhiêu tuổi ?")
// canBuyAlcohol= age >= 18
// if (canBuyAlcohol){
//     console.log("được nhậu")
// }
// else
//     console.log("được uống nước ngọt")
/**
 * 0
 * false
 * "" vs ''
 * null
 * NaN
 * undefine
 */
// let a;
//     console.log(a)

// age=18;
// let canBuyAlcohol=18;
// let result=canBuyAlcohol <= age? console.log("dc nhậu") : console.log("k dc nhậu")
// let coures = [
//     backenkend = {
//         name: 'java',
//         count:'5$'
//     },
//     {
//         name: 'PHP',
//         count:'5$'
//     },
//     frontend = {
//         name: 'reactjs'
//     }
// ]
// console.log("Output1:",frontend.name)
// console.log("Output2:",coures[1].name)
// (function result(number1,number2) {
//     return console.log(number1*number2)
// })(10,20)
// // console.log(result(10,20))
// const odds=  (number) => {
//     let result=(number % 2 ===0)? "số chẵn" : "số lẻ"
//     return console.log(result)
// }
// odds(22)
// const checkValue=(value1,value2) =>{
//     var check=(value1>value2)? "value1 lớn nhất" : "value2 lớn nhất"
//     return console.log(check)
// }

// checkValue(3,3)
// const luythua=(a,n) =>{
//     return console.log(`Lũy thừa ${a}^${n}:`, a**n)
// }
// // luythua(2,5)
// const positinegative=(number) =>{
//     if (number === 0) return console.log("không âm, không dương")
//     else {
//         var result=(number > 0) ? "số dương":"số âm";
//     }
//     return console.log(result)
// }
// positinegative(-1)
// let date = new Date
// let today={}
// today.weekdays=date.getDay()+1;
// today.day=date.getDate(),
// today.month=date.getMonth(),
// today.year=date.getFullYear(),

// console.log(today);

// let nextYear=()=>{
//     return date.getFullYear()+1
// }
// console.log(nextYear())
// console.log(date.getDate())
// let getRandom=(min,max) =>{
//     return Math.round(Math.random() *(max-min) + min);
// }
// console.log(getRandom(1,24))
// console.log(Math.random())
// let phanThuong=["1tr","10tr","50tr","100tr"]
// let giftRandom=(phanThuong) =>{
//     return phanThuong[Math.floor(Math.random()*phanThuong.length)];
// }
// console.log(giftRandom(["1tr","10tr","50tr","100tr"]))
// map sẽ giúp chuyển từ mảng cũ thành 1 mảng mới vs số phần tử mảng như mảng cũ
// reduce
// let coures = [
//     {
//         id: 1,
//         name: 'PHP',
//         coin: 100,

//     },
//     {
//         id: 2,
//         name: 'Reactjs',
//         coin: 200,

//     },
//     {
//         id: 3,
//         name: 'NodeJs',
//         coin: 300
//     },
//     {
//         id: 4,
//         name: 'JS',
//         coin: 150
//     },
//     {
//         id: 5,
//         name: 'Java',
//         coin: 180
//     },
//     {
//         id: 6,
//         name: 'NodeJs',
//         coin: 35
//     }
// ]
// let c=coures.reduce((a,b) =>a+b.coin,0)
// console.log(c)
// for(let i=0;i < coures.length;i++) {
//     console.log(coures[i].name)
//     // return val.name
// }

// var sports = [
//     {
//         name: 'Bơi lội',
//         gold: 11
//     },
//     {
//         name: 'Boxing',
//         gold: 3
//     },
//     {
//         name: 'Đạp xe',
//         gold: 4
//     },
//     {
//         name: 'Đấu kiếm',
//         gold: 5
//     },
// ]
// let resultGold = (arr) =>arr.reduce((acc,curVal)=> acc+curVal.gold,0)   
// console.log(resultGold(sports))
// const sports = [
//     {
//         name: 'Bóng rổ',
//         like: 6
//     },
//     {
//         name: 'Bơi lội',
//         like: 5
//     },
//     {
//         name: 'Bóng đá',
//         like: 10
//     },
// ]
// console.log(getMostFavoriteSport(sports)) 
// // Output: [{ name: 'Bóng rổ, like: 6 }, { name: 'Bóng đá, like: 10 }]
// let favoriteSports=(arr)=>{
//     return arr.filter((sport) => {
//         if (sport.name !="Bơi lội")
//         return sport
//     }
//     )
// }

// console.log(favoriteSports(sports))
// Expected results
// console.log(calculateRating(watchList)); // Output: 8.675
var watchList = [
    {
      "Title": "Inception",
      "Year": "2010",
      "Rated": "PG-13",
      "Released": "16 Jul 2010",
      "Runtime": "148 min",
      "Genre": "Action, Adventure, Crime",
      "Director": "Christopher Nolan",
      "Writer": "Christopher Nolan",
      "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
      "Plot": "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
      "Language": "English, Japanese, French",
      "Country": "USA, UK",
      "imdbRating": "8.8",
      "imdbVotes": "1,446,708",
      "imdbID": "tt1375666",
      "Type": "movie",
    },
    {
      "Title": "Interstellar",
      "Year": "2014",
      "Rated": "PG-13",
      "Released": "07 Nov 2014",
      "Runtime": "169 min",
      "Genre": "Adventure, Drama, Sci-Fi",
      "Director": "Christopher Nolan",
      "Writer": "Jonathan Nolan, Christopher Nolan",
      "Actors": "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
      "Plot": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      "Language": "English",
      "Country": "USA, UK",
      "imdbRating": "8.6",
      "imdbVotes": "910,366",
      "imdbID": "tt0816692",
      "Type": "movie",
    },
    {
      "Title": "The Dark Knight",
      "Year": "2008",
      "Rated": "PG-13",
      "Released": "18 Jul 2008",
      "Runtime": "152 min",
      "Genre": "Action, Adventure, Crime",
      "Director": "Christopher Nolan",
      "Writer": "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
      "Actors": "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
      "Plot": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
      "Language": "English, Mandarin",
      "Country": "USA, UK",
      "imdbRating": "9.0",
      "imdbVotes": "1,652,832",
      "imdbID": "tt0468569",
      "Type": "movie",
    },
    {
      "Title": "Batman Begins",
      "Year": "2005",
      "Rated": "PG-13",
      "Released": "15 Jun 2005",
      "Runtime": "140 min",
      "Genre": "Action, Adventure",
      "Director": "Christopher Nolan",
      "Writer": "Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)",
      "Actors": "Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
      "Plot": "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from the corruption that Scarecrow and the League of Shadows have cast upon it.",
      "Language": "English, Urdu, Mandarin",
      "Country": "USA, UK",
      "imdbRating": "8.3",
      "imdbVotes": "972,584",
      "imdbID": "tt0372784",
      "Type": "movie",
    },
    {
      "Title": "Avatar",
      "Year": "2009",
      "Rated": "PG-13",
      "Released": "18 Dec 2009",
      "Runtime": "162 min",
      "Genre": "Action, Adventure, Fantasy",
      "Director": "James Cameron",
      "Writer": "James Cameron",
      "Actors": "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
      "Plot": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      "Language": "English, Spanish",
      "Country": "USA, UK",
      "imdbRating": "7.9",
      "imdbVotes": "876,575",
      "imdbID": "tt0499549",
      "Type": "movie",
    }
  ];
  // console.log(calculateRating(watchList)); // Output: 8.675 Christopher nolan đạo diễn
// let calculateRating=(arr) =>{
//     let directorFilter=arr.filter(director =>{
//         if (director.Director==="Christopher Nolan"){
//             return director
//         }
//     })
//     let point=directorFilter.reduce((a,b) => a+parseFloat(b.imdbRating),0)
//     return (point/directorFilter.length)
// }

// let calculateRating=(arr) => arr.filter((director) => {
//     if (director.Director==="Christopher Nolan"){
//        return director
//     }
// })

// console.log(calculateRating(watchList))
// console.log(count)
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]
// const months = ['Jan','Feb' , 'April', 'June'];
// let arrMonth=(arr)=>{
//   months.splice(2, 0, arr)
//   return months
// } 
// console.log(arrMonth('March'))
// const a = ["Wind", "Water", "Fire"];
// 'Wind + Water + Fire'
// const changeString=(arr)=>{
//   let a = arr.toString(arr)
//   console.log(a.replace(",","+"))
  
//   return a.replaceAll(",","+")
// }
// console.log(changeString(["Wind", "Water", "Fire"]))
// const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
// Expected output: "tomato"
// const lastArray=(arr)=>{
//   return arr.pop()
// }
// console.log(lastArray(['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']))
// const animals = ['pigs', 'goats', 'sheep'];
 // ['pigs', 'goats', 'sheep', 'football', 'swimming']
//  const addSport=(arr,Sport1,Sport2) =>{
//   arr.push(Sport1,Sport2)
//   return arr
//  }
//  console.log(addSport(['pigs', 'goats', 'sheep'],"football","swimming"))
// const names = ["Andrew", "Tyrone", "Paul", "Maria", "Gayatri"];
//  "Andrew"
// function getName(arr,name) {
//   return arr.find(a => a == name)
// }
// console.log(getName(names,"Andrew"))
// const filtered = [12, 5, 8, 130, 44]
// filtered is [12, 130, 44]
// const filterValue=(arr,number) => arr.filter(result => result >= number)
// console.log(filterValue([12, 5, 8, 130, 44],12))
// const inventory = [
//   { name: "apples", quantity: 2 },
//   { name: "bananas", quantity: 0 },
//   { name: "cherries", quantity: 5 },
// ];

// let findObject=(arr,obj) => {
//   for (const i of arr){
//     if (i.name=obj) {
//        return i
//       }
//     }
// }
// console.log(findObject(inventory,"cherries"))
// Expected results:

// console.log(arrToObj(arr)); // { name: 'La Minh', age: 18 }
// function toObject(arr) {
//   var rv = {};
//   for (var i = 0; i < arr.length; ++i)
//     rv[i] = arr[i];
//   return rv;
// }
// console.log(toObject(arr))
// var arr = [
//   ['name', 'La Minh'],
//   ['age', 18],
// ];
// var obj={}
// for (const i of arr){
//   obj[i[0]]=i[1]
// }
// console.log(obj)
// const array1 = [1, 4, 9, 16];
// function tinh(a,number){
//   return a*number
// }
// let result=(arr,number)=>{
//   function tinh(a){
//     return a*number
//   }
//   return arr.map(tinh)
// }

// let result=(arr,number) => arr.map(a => a*number)
// console.log(result([1, 4, 9, 16],4));
// var key=0
// console.log(++key)
// const key=6
// key=9
// console.log(key)
// let result=(arr) =>{
//     let arr1=[]
//     for (const i in arr){
//         arr1[i]=(arr[i]/(Number(i)+1))
//     }
//     return arr1
// }
// console.log(result([1,4,9]))
// let result=(arr)=>{
//     let sum=0
//     for (const i of arr){
//         sum +=i
//         console.log (typeof i)
//     }
//     return sum
// }
// console.log(result([1,2,3,4,5,6,7]))
// const arraySparse = [1, 3, /* empty */, 7];
// let obj={}
// const arraySparse = [1, 3, /* empty */, 7];
// const result=(arr) =>{
//     let obj={}
//     for (const i of arraySparse){
//         if (i !== undefined){
//             obj["element"]= i
//             console.log(obj)
//         }
//     }
//     return


// }

// console.log(result(arraySparse))

// const countArr = ( arr , count = 0,arrayTemp = []) =>{
//     if(!(count < arr.length)) {
//         arrayTemp.forEach(element => {
//             console.log({"element":element})
//         });
//             console.log({"numCallbackRuns":arrayTemp.length})
//         return
//     }
//     //arr[count] !== undefined
//     if(1 * arr[count] === arr[count]){
//         arrayTemp.push(arr[count])
//     }
//     return countArr( arr , count +1,arrayTemp)
// }
// countArr(arraySparse)
// const result=(arr)=>{

// }
// const arraySparse = [1, 3, /* empty */, 7];
// const checkEmpty = (arr) => {
//     let temp = arr.filter(i => i !== '');
//     let obj = [];
//     let count = 0;
//     obj = temp.map((value) => obj[count++] = {"element": value});
//     obj.push({"numCallbackRuns": count});
//     return obj;
// };
// console.log(checkEmpty(arraySparse));
// let arr=[]
// let obj={}
// for (const i in arraySparse){
//     if (arraySparse[i] !== undefined){
//         obj={"element":arraySparse[i]}
//         arr[i]=obj
        
//     }
// }
// console.log(arr)
// gán attribute hợp lệ
// let heading=document.querySelector('h1')
// heading.title='heading_title'
// heading.class='heading_class'
//lấy attribute hợp lệ
// console.log(heading.title='heading_title')
// gán attribute không hợp lệ
// heading.setAttribute('href',www.google.com)


// <h1>Học lập trình để đi làm</h1>
//     <p>Truy cập <a>nestech.edu.vn</a> để học lập trình các bạn nhé!!!</p>

// Thêm thuộc tính title có giá trị " Học lập trình để đi làm" cho thẻ h1.
// Thêm thuộc tính data-title có giá trị "Học lập trình" cho thẻ h1.
// Thêm thuộc tính href có giá trị "https://nestech.edu.vn/" cho thẻ a.
// Thêm thuộc tính target có giá trị "_blank" cho thẻ a.
// let tagTitle=document.getElementsByTagName('h1')[0]
// let aTag=document.querySelector('a')
// console.log(tagTitle)
// tagTitle.title="Học lập trình để đi làm"
// tagTitle.setAttribute('data-title',"Học lập trình")
// aTag.href="https://nestech.edu.vn/"
// // aTag.setAttribute('target',"_blank")
// aTag.target="_blank"

{/* <h1 class="heading">Nestech</h1>
Các bạn hãy thay đổi nội dung của thẻ h1 thành Nestech - Học lập trình để đi làm */}

// let changeContent=document.querySelector('h1')
// changeContent.innerText="Nestech - Học lập trình để đi làm"
// let arrCourse = ['HTML','JS','PHP']
// let addUL=document.querySelector('ul')
// let render=(arr)=>{
//   let result=''
//   for (const i of arr){
//     result += `<li>Khóa học ${i}</li>`
// }
//   return addUL.innerHTML=result
// }
// console.log(render(arrCourse))
// const goldPrice=
// [
//   {
//     "buy": "65.800",
//     "sell": "66.600",
//     "type": "Vàng SJC 1L - 10L"
//   },
//   {
//     "buy": "52.950",
//     "sell": "53.950",
//     "type": "Vàng nhẫn SJC 99,99 1 chỉ, 2 chỉ, 5 chỉ"
//   },
//   {
//     "buy": "52.950",
//     "sell": "54.050",
//     "type": "Vàng nhẫn SJC 99,99 0,5 chỉ"
//   },
//   {
//     "buy": "52.750",
//     "sell": "53.550",
//     "type": "Vàng nữ trang 99,99%"
//   },
//   {
//     "buy": "51.720",
//     "sell": "53.020",
//     "type": "Vàng nữ trang 99%"
//   },
//   {
//     "buy": "38.317",
//     "sell": "40.317",
//     "type": "Vàng nữ trang 75%"
//   },
//   {
//     "buy": "29.373",
//     "sell": "31.373",
//     "type": "Vàng nữ trang 58,3%"
//   },
//   {
//     "buy": "20.483",
//     "sell": "22.483",
//     "type": "Vàng nữ trang 41,7%"
//   }
// ]
// let a=document.querySelector('tbody')
// let render=(arr)=>{
//   let result=''
//   for (const i of arr){
//     result +=`<tr>
//               <td>${i['type']}</td>
//               <td>${i['buy']}</td>
//               <td>${i['sell']}</td>
//               <tr>` 
// }
//   return a.innerHTML=result
// }
// console.log(render(goldPrice))
// const detailtCoin=[
//   {
//     "id": 1,
//     "name": "Bitcoin",
//     "price": 19340.953647943366,
//     "percent_change_24h": 3.18974865,
//     "percent_change_1h": 0.13874144
//   },
//   {
//     "id": 1027,
//     "name": "Ethereum",
//     "price": 1319.766681320235,
//     "percent_change_24h": 3.07108724,
//     "percent_change_1h": 0.09324792
//   },
//   {
//     "id": 825,
//     "name": "Tether",
//     "price": 1.0000356256544913,
//     "percent_change_24h": 0.00616275,
//     "percent_change_1h": -0.00081655
//   },
//   {
//     "id": 3408,
//     "name": "USD Coin",
//     "price": 0.9999707419817206,
//     "percent_change_24h": -0.01333926,
//     "percent_change_1h": 0.00731704
//   },
//   {
//     "id": 1839,
//     "name": "BNB",
//     "price": 280.4971307183375,
//     "percent_change_24h": 3.86797039,
//     "percent_change_1h": -0.07656999
//   },
//   {
//     "id": 52,
//     "name": "XRP",
//     "price": 0.4378728623269723,
//     "percent_change_24h": 3.59775661,
//     "percent_change_1h": 0.24123988
//   },
//   {
//     "id": 4687,
//     "name": "Binance USD",
//     "price": 0.9998212428351202,
//     "percent_change_24h": -0.04704566,
//     "percent_change_1h": 0.03799726
//   },
//   {
//     "id": 2010,
//     "name": "Cardano",
//     "price": 0.43205242562096685,
//     "percent_change_24h": 0.46973443,
//     "percent_change_1h": -0.0513443
//   },
//   {
//     "id": 5426,
//     "name": "Solana",
//     "price": 33.29481291691432,
//     "percent_change_24h": 3.62047747,
//     "percent_change_1h": -0.06248286
//   },
//   {
//     "id": 74,
//     "name": "Dogecoin",
//     "price": 0.06011837389674329,
//     "percent_change_24h": 0.9993402,
//     "percent_change_1h": -0.16297579
//   }
// ]
// let coin=document.querySelector('tbody')
// let render=(arr)=>{
//   let result=''
//   for (const i of arr){
//     result +=`<tr>
//               <td>${i['name']}</td>
//               <td>${parseFloat((i['price']).toFixed(2))}</td>
//               <td>${parseFloat((i['percent_change_24h']).toFixed(2))}%</td>
//               <td>${parseFloat((i['percent_change_1h']).toFixed(2))}%</td>
//               <tr>` 
// }
//   return coin.innerHTML=result
// }
// console.log(render(detailtCoin))
const detailNews=[
     {
        "id": "1",
        "name": "Thế Giới"
       },
     {
        "id": "2",
         "name": "Thể Thao"
     },
       {
         "id": "3",
       "name": "Thời Sự"
      },
      {
         "id": "4",
        "name": "Bóng Đá"
      },
      {
        "id": "5",
        "name": "Xã Hội"
       },
       {
        "id": "6",
        "name": "Tin Tức"
       },
       {
         "id": "7",
       "name": "Bất Động Sản"
       },
      {
      "id": "8",
        "name": "Thị Trường"
       }
]
// let a=document.getElementsByClassName('box')[0]
// let render=(arr)=>{
//   let result=''
//   for (const i of arr){
//     result +=`<li>${i['name']}</li>`
// }
//   return a.innerHTML=`<ul>${result}</ul>`
// }
// render(detailNews)
// let a=document.getElementsByClassName('box')[0]
// a.innerHTML=`<ul></ul>`
// let b=document.getElementsByTagName('ul')[0]
// let render=(arr)=>{
//   let result=''
//   for (const i of arr){
//     result +=`<li>${i['name']}</li>`
// }
//   return b.innerHTML=result
// }
// render(detailNews)
// DOM CSS
// let boxElement=document.getElementsByClassName('box')[0]
// console.log(boxElement)
// Object.assign(boxElement.style,{
//   width:'10px',
//   height:'10px',
//   backgroundColor:'red'

// })
// boxElement.classList.

// let boxH1=document.querySelector('h1')
// let boxP=document.querySelector('p')
// boxH1.classList.add('title')
// boxP.classList.replace('sub-title','content')
// console.log(boxH1.classList.value)
// let elements=document.querySelectorAll('div')
// console.log(elements)
// elements.forEach((element) => {
//   element.classList.add('box');
// });
// let elements=document.querySelectorAll('div')
// for (const i of elements){
//   i.classList.add('box')
// }
let elements=document.getElementsByTagName('div')
console.log(elements)
for (const i in elements){
  console.log(i)
  elements[i].classList.add('box')
}