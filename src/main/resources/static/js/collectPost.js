$(document).ready(function () {
    $("#collect_btn").click(function () {
        let time = nowTime();
        // $.ajax({
        //     url:"/mihu/addCollection",
        //     type: 'POST',
        //     data:{
        //         // pid:$("#post_id").val(),
        //         pid:"11",
        //         // time:time,
        //         userId:"Tetett"
        //     },
        //     success(result){
        //
        //     },
        //     error(){
        //         alert("请求失败！")
        //     }
        // })
    })
})

function nowTime() {//获取当前时间
    let now= new Date();
    let _month = ( 10 > (now.getMonth()+1) ) ? '0' + (now.getMonth()+1) : now.getMonth()+1;
    let _day = ( 10 > now.getDate() ) ? '0' + now.getDate() : now.getDate();
    let _hour = ( 10 > now.getHours() ) ? '0' + now.getHours() : now.getHours();
    let _minute = ( 10 > now.getMinutes() ) ? '0' + now.getMinutes() : now.getMinutes();
    let _second = ( 10 > now.getSeconds() ) ? '0' + now.getSeconds() : now.getSeconds();
    return now.getFullYear() + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute + ':' + _second;
}