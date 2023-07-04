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
// luythua(2,5)
// const positinegative=(number) =>{
//     if (number === 0) return console.log("không âm, không dương")
//     else {
//         var result=(number > 0) ? "số dương":"số âm";
//     }
//     return console.log(result)
// }
// positinegative(-1)
// let course="java,python,java";
// const lastName="An";
// var random="12"
// console.log(course,lastName,random)
// typeof: kiem tra kieu du lieu

// console.log(course.indexOf("java",5))
// console.log(course.length)
// console.log(course.lastIndexOf("java",0))
// console.log(course.slice(5,11))
// console.log(course.replace("java","react"))
// console.log(course.toLocaleUpperCase())
// console.log(lastName.toLocaleLowerCase())
// console.log(course.split(","))


// let le = (strings) => {
//     return strings.length
// }
// console.log(le("Nguyen Truong An"))

// let upcase= (strings) =>{
//   if (strings === strings.toLocaleUpperCase()){
//     return console.log("giữ nguyên chữ hoa",strings)
//   }
//   else {
//     return console.log("chữ thường thành hoa",strings.toLocaleUpperCase())
//   }
// }
// upcase("test")
// upcase("TEST")
// let findIndexString=(strings,find)=>{
//     return strings.indexOf(find)
// }
// console.log(findIndexString("truong nguyen an","an"))


// toString:chuyển sang String
// let checktype=(value)=>{
//     return resutl=(typeof value==="number")? value:"không phải giá trị số"
// }
// console.log(checktype("một"))
// let a=1;
// console.log(typeof a)
// let a=5
// let b=6
// if (!(a>b)) {
//     console.log(a,b)
// }
// console.log("1")
// let num = 2  --> true
// let num2 = num/'g' --> false
// let num3 = NaN --> false
// console.log(typeof (num/'g'));
// let a=5
// let b=6
// let num=NaN
// var result=(number)=>{
//     if ((typeof number =="number") && (number != NaN)){
//             return "là số"
//     }
//     else {
//         return "không là số"
// }
// }
// console.log(result(num))
// }
// const result=(number)=>{
//     if (isNaN(number)) {
//         return "not number"
//     }
//     else{
//         return "number"
//     }
// }
// console.log(result(1/2))
// const result=(number)=>{
//     if ((typeof number =="number") && (!isNaN(number))){
//         return "number"
//     }
//     else {
//         return "not number"
//     }
// }
// console.log(result(2/4))
// console.log(typeof(1/'6'))
// console.log(1/'6')
// let arr=[1,2,3,4,5,5]
// pop xóa phần tử cuối mảng
// join chuyển mảng thành chuổi có thể thêm ký tự ngăn cách
// shift xóa phần từ ở đầu mảng
// push thêm phần tử vào cuối mảng
// unshift thêm phần tử vào đầu mảng
// arr.push(1)
// console.log(arr)
// splice xóa --> trả về các phần tử xóa, thêm các phần tử tại các vị trí chỉ định
// concat nối mảng với nhau
// arr.unshift("truong an","troi mua")
// arr.splice(0,0,1,3)
// console.log(arr)
// const joinWithCharacter= (array,character) => {
//    result= array.join(character)
//     return result
// }
// console.log(joinWithCharacter(["MEC","TOY","MAZ"]," - "))

// const getFirstElement =(array) => {
//     return array[0]
// }
// console.log(getFirstElement(['Monkey', 'Tiger', 'Elephant']))
// let gioiTinh="Sex"
// let nghe="career"
// let info={ 
//     lastName:"An",
//     firstName:"Nguyen",
//     course:"FullStack",
//     "family-name":"TAn",
//     [gioiTinh]:"Male"
// }
// info.time="6 months"
// info["a-g-e"]=27
// info[nghe]="dev"
// console.log(info)
// console.log(info[gioiTinh])
// let coure = [
//     backenkend= [{
//         name: 'java',
//         count:'5$'
//     },
//     {
//         name: 'PHP',
//         count:'5$'
//     }],
//     frontend= {
//         name: 'reactjs'
//     } 
// ]
// console.log(coure[0][0].name,coure[1].name,coure[0][1].name)
// let coures = {
//     backenkend: [{
//         name: 'java',
//         count:'5$'
//     },
//     {
//         name: 'PHP',
//         count:'5$'
//     }],
//     frontend: {
//         name: 'reactjs'
//     } 
// }
// console.log(coures.backenkend[1].name)

// localStorage.setItem("lastName","An")
// let info={ 
//     lastName:"An",
//     firstName:"Nguyen",
//     course:"FullStack",
//     "family-name":"TAn",
// }
// localStorage.setItem("infoName",JSON.stringify(info))
// console.log(JSON.parse(localStorage.getItem("infoName")))
// let date=new Date
// var date=new Date
// function nextYear() {
//     return date.getFullYear() +1
// }
// console.log(nextYear)
// console.log(date)
// let checkNumber=(value) =>{
//     if ((value % 3 == 0) && (value % 5==0)){
//         return `chia hết cho 3 và 5`}
//     else if (value%3==0) {
//         return `chia hết cho 3`}
//     else if (value%5==0) {
//         return `chia hết cho 5`
//     }
//     else {
//         return `không chia hết cho 3 và 5`
//     }
//     }
// console.log(checkNumber(30))
// switch(number){
//     case 2:
//         console.log('dây là số 2')
//         // continue
//     break;
//     default:
//         console.log('day là default')
//         break;
// }
// let day= new Date
// console.log(day.getDate(),day.getDay(),day.getMonth())
// switch(day.getDay()+1){
//     case 2:
//         console.log("hôm nay là thứ 2")
//         break;
//     case 3:
//         console.log("hôm nay là thứ 3")
//         break;
//     case 4:
//         console.log("hôm nay là thứ 4")
//         break;
//     case 5:
//         console.log("hôm nay là thứ 5")
//         break;
//     case 6:
//         console.log("hôm nay là thứ 6")
//         break;
//     case 7:
//         console.log("hôm nay là thứ 7")
//         break;
//     case 8:
//         console.log("hôm nay là thứ cn")
//         break;
//     default:
//         console.log("không phải là ngày trong tuần")
// }
// for (let i=0;i<11;i+=2) {
//     if (i%2===0){
//         console.log(`${i} chia hết cho 2`)
//     }
// }

// let getRandNumbers=(min,max,lenght)=>{
//     var arr=[]
//     for (let i=0; i < lenght;i++) {
//         arr.push(Math.round(Math.random() * (max - min) + min))}
//     return arr
// }
// console.log(getRandNumbers(10,20,6))

// function getTotal(arr){

let getTotal = (arr) =>{
    let tong=0
    let len=arr.length
    for (let i=0;i < len;i++){
        tong+=arr[i]
    }
    return tong
}

// function getTotal(arr) {
//     let sum = 0;
//     for(let i = 0; i < arr.length; i++)
//         sum += arr[i];
//     return sum;
// }




// let getTotal = (arr) =>{
//     let tong = 0;
//     for (let i=0 ; i< arr.length;i++)
//         tong += arr[i];
//     return tong;
// }

console.log(getTotal([1,2,3]))