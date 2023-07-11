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