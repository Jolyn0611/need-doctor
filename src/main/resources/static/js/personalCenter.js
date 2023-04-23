$(document).ready(function () {
    $(".personal_input").attr("readonly", "readonly")
    $("#save_btn").hide();
    $("#modify_btn").click(function () {
        $("#modify_btn").hide()
        $("#save_btn").show();
        $(".personal_input").removeAttr("readonly")
        $("#name").attr("readonly", "readonly")
    }),
        $("#save_btn").click(function () {
            $("#modify_btn").show()
            $("#save_btn").hide();
            $(".personal_input").attr("readonly", "readonly")
            $.ajax({
                url: '/mihu/modifyInfo',
                type: 'POST',
                data: {
                    name: $("#name").val(),
                    gender: $("#gender").val(),
                    birth: $("#birth").val(),
                    email: $("#email").val(),
                    number: $("#number").val(),
                },
                success: function (result) {
                },
                error: function () {
                    alert("请求处理出错！");
                }
            })
        }),
        $("#cancel_btn").click(function () {
            $("#cancel_modal").modal('show')
            $("#con_btn").click(function () {
                $.ajax({
                    url: '/mihu/cancel',
                    type: 'POST',
                    data: {
                        name: "Tetett",
                    },
                    success: function (result) {
                        $("#cancel_modal").modal('hide')
                        $("#succeed_modal").modal('show')
                        $("#succeed_button").click(function (){
                            $("#succeed_modal").modal('hide')
                        })

                    },
                    error: function () {
                        alert("请求处理出错！");
                    }
                })
            })

        })
})
function getPost(s) {
    location.href="/mihu/getPost/myPost/Tetett/"+s
}