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
const positinegative=(number) =>{
    if (number === 0) return console.log("không âm, không dương")
    else {
        var result=(number > 0) ? "số dương":"số âm";
    }
    return console.log(result)
}
positinegative(-1)