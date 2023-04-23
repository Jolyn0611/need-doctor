$(document).ready(function () {

    var userImgRequestPath = $("#userImgRequestPath").val();

    var replyUserId = null;
    var insertCommentId = null;
    var deleteCommentId = null;
    var deleteCommentReplyId = null;



    getCommentByPid();


    // 获取评论和评论回复
    function getCommentByPid() {
        $.ajax({
            async: false,//所有的请求均为同步请求
            url: "comment/getCommentByPid",
            data: {
                "pid": 1
            },
            type: "POST",
            success: function (commentList) {
                $.each(commentList, function (index, comment) {
                    var user = getCommentUserByUserId(comment.uid); // 获取评论用户信息

                    var url = "otherPage?otherId=" + user.uid;

                    var str = "\n" +
                        "                            <div id=\"deleteComment" + comment.cid + "\"  style=\"margin-top: 10px\">\n" +
                        "                                <div  class=\"commentList\">\n" +
                        "                                    <div  class=\"comment\">\n" +
                        "                                        <a href='" + url + "'><img class=\"commentUserImg img-responsive userImg\"\n" +
                        "                                            src=\"" + userImgRequestPath + user.userImg + "\"></a>\n" +
                        "                                        <span class=\"commentUserName\"><a href='" + url + "'><span>" + user.uid + "</span></a> &nbsp;\n" +
                                                                 +  "</span></span></span>\n" +
                        "                                        <span class=\"commentTime\" >" + comment.createTime + "</span>\n" +
                        "                                    <div class=\"commentContent\"> " + comment.content + " </div>" +
                        "                                        <div id=\"commentOperate" + comment.cid + "\"  style=\"float: right;\">\n" +
                        "                                            <a data-replyUserId='' data-replyUserInfo='" + user.uid + "'  data-replyCommentId='" + comment.cid + "' class=\"commentOperate reply\" data-toggle=\"modal\"\n" +
                        "                                               data-target=\"#replyModal\">回复</a>&nbsp;\n" +
                        "                                        </div>\n" +
                        "                                    </div>\n" +
                        "                                </div>\n" +
                        "       <div id=\"commentReply" + comment.cid + "\"  class=\"commentReply \">" +
                        "       </div>" +
                        "                            </div>";


                    $("#commentList").append(str);

                    if ($("#sessionUserId").val() == user.uid) {
                        $("#commentOperate" + comment.cid + "").append("<a data-commentId='" + comment.cid + "' class=\"commentOperate\">删除</a>")
                    }


                    // 填充回复
                    getCommentReplyByCommentId(comment.cid);

                })

            },
            error: function () {
                alert("获取评论失败")
            }
        })
    }


    // 获取评论用户，返回一个用户对象
    function getCommentUserByUserId(userId) {
        var user;
        $.ajax({
            async: false,
            url: "getUser",
            type: "GET",
            data: {"userId": userId},
            success: function (userInfo) {
                user = userInfo

            },
            error: function () {
                alert("获取评论用户信息失败！")
            }
        });
        return user;
    }

    // 获取评论的回复
    function getCommentReplyByCommentId(commentId) {
        var commentLevelTwoList;
        $.ajax({
            async: false,
            url: "comment/getCommentReplyByCommentId",
            data: {"commentId": commentId},
            type: "POST",
            success: function (commentReplyList) {
                commentLevelTwoList = commentReplyList;
                $.each(commentReplyList, function (index, commentReply) {
                    var user = getCommentUserByUserId(commentReply.uid); // 获取评论用户信息

                    var str = "    <div id=\"deleteCommentReply" + commentReply.id + "\"  style='padding: 5px'>\n" +

                        "\n" +
                        "                                        <a href='" + url + "'><span style=\"color: #ff7200;\" >" + user.uid + ":</span></a>\n" +
                        "                                        <div style=\"display: inline-block;\">" + commentReply.replyContent + "</div>\n" +
                        "                                        <br>\n" +
                        "                                        <div id=\"commentReply" + commentReply.activityCommentReplyId + "\" style=\"float: right;\">\n" +
                        "                                            <a data-replyCommentId='" + commentReply.activityCommentId + "'  data-replyUserId='" + user.uid + "' class=\"commentOperate reply\" data-toggle=\"modal\"\n" +
                        "                                               data-target=\"#replyModal\">回复</a>&nbsp;\n" +
                        "                                        </div>\n" +
                        "                                        <span style=\" color: #b0b0b0;\">" + commentReply.createTime + "</span>\n" +

                        "                                    </div>\n"


                    // 渲染二级评论
                    $("#commentReply" + commentReply.activityCommentId + "").append(str);
                    // 如果当前登录用户是评论用户的话就渲染出删除按钮
                    if ($("#sessionUserId").val() == user.userId) {
                        $("#commentReply" + commentReply.activityCommentReplyId + "").append("<a data-commentReplyId='" + commentReply.activityCommentReplyId + "' class=\"commentOperate\">删除</a>")
                    }
                })
            },
            error: function () {
                alert("获取评论回复出错！")
            }
        });

    }


    // 发表一级评论
    $("#publishCommentBtn").click(function () {
        $.ajax({
            async: false,
            url: "comment/insertActivityCommentByActivityComment",
            data: {
                "activityId": $("#activityId").val(),
                "userId": $("#sessionUserId").val(),
                "activityCommentContent": $("#commentContent").val()
            },
            type: "POST",
            success: function (commentId) {
                if (commentId !== -1) {

                    var user = getCommentUserByUserId($("#sessionUserId").val()); // 获取评论用户信息
                    var str = "\n" +
                        "                            <div id=\"deleteComment" + commentId + "\" style=\"margin-top: 10px\">\n" +
                        "                                <div  class=\"commentList\">\n" +
                        "                                    <div  class=\"comment\">\n" +
                        "                                        <img class=\"commentUserImg img-responsive userImg\"\n" +
                        "                                            src=\"" + userImgRequestPath + user.userImg + "\">\n" +
                        "                                        <span class=\"commentUserNameAndLevel\"><span>" + user.userName + "</span> &nbsp;\n" +
                        "                                    <span  class=\"commentLevel\">LV.<span>" + user.userLevel + "</span></span></span>\n" +
                        "                                        <span class=\"commentTime\" >" + getFormatDate() + "</span>\n" +
                        "                                    <div class=\"commentContent\"> " + $("#commentContent").val() + " </div>" +
                        "                                        <div id=\"levelOneCommentOperate" + commentId + "\"  style=\"float: right;\">\n" +
                        "                                            <a data-replyUserId='' data-replyUserInfo='" + user.userName + "'  data-replyCommentId='" + commentId + "' class=\"commentOperate reply\" data-toggle=\"modal\"\n" +
                        "                                               data-target=\"#replyModal\">回复</a>&nbsp;\n" +
                        "<a data-commentId='" + commentId + "'  class=\"commentOperate\">删除</a>" +
                        "                                        </div>\n" +
                        "                                    </div>\n" +
                        "                                </div>\n" +
                        "       <div id=\"commentReply" + commentId + "\"  class=\"commentReply \">" +
                        "       </div>" +
                        "                            </div>";
                    $("#commentList").prepend(str);
                    $("#commentContent").val("");
                }
            },
            error: function () {
                alert("插入一级评论失败！")
            }
        })
    });


    // 发表评论回复
    $("#publishCommentReplyBtn").click(function () {


        $.ajax({
            async: false,
            url: "comment/insertActivityCommentReplyByActivityComment",
            type: "POST",
            data: {
                "activityCommentId": insertCommentId,
                "activityCommentReplyUserId": replyUserId,
                "activityId": $("#activityId").val(),
                "userId": $("#sessionUserId").val(),
                "activityCommentReplyContent": $("#publishCommentReplyContent").val()
            },
            // 返回一个数组 分别为commentId和commentReplyId
            success: function (activityCommentReply) {
                if (activityCommentReply !== null) {
                    var user = getCommentUserByUserId($("#sessionUserId").val()); // 获取评论用户信息
                    var str = "    <div id=\"deleteCommentReply" + activityCommentReply.activityCommentId + "\" style='padding: 5px'>\n" +

                        "\n" +
                        "                                        <span style=\"color: #ff7200;\" >" + user.userName + ":</span>\n" +
                        "                                        <div style=\"display: inline-block;\">" + $("#publishCommentReplyContent").val() + "</div>\n" +
                        "                                        <br>\n" +
                        "                                        <div id=\"commentReply" + activityCommentReply.activityCommentId + "\" style=\"float: right;\">\n" +
                        "                                            <a data-replyCommentId='" + activityCommentReply.activityCommentId + "'  data-replyUserId='" + user.userId + "' class=\"commentOperate reply\" data-toggle=\"modal\"\n" +
                        "                                               data-target=\"#replyModal\">回复</a>&nbsp;\n" +
                        "<a data-commentReplyId='" + activityCommentReply.activityCommentReplyId + "' class=\"commentOperate\">删除</a>" +
                        "                                        </div>\n" +
                        "                                        <span style=\" color: #b0b0b0;\">" + getFormatDate() + "</span>\n" +

                        "                                    </div>\n"


                    // 渲染二级评论
                    $("#commentReply" + activityCommentReply.activityCommentId + "").prepend(str);


                    $("#publishCommentReplyContent").val("");
                }
            },
            error: function () {
                alert("!!")
            }
        })

    });


    // 当点击回复超链接时
    $(document).on('click', 'a[data-replyUserId]', function () {
        replyUserId = $(this).attr("data-replyUserId");
        insertCommentId = $(this).attr("data-replyCommentId");
        var replyUserInfo = $(this).attr("data-replyUserInfo");

        if (replyUserId.length !== 0) {
            var user = getCommentUserByUserId(replyUserId);
            $("#publishCommentReplyContent").val("回复 " + user.userName + ": ");
        }

        if (replyUserInfo !== null) {
            $("#publishCommentReplyContent").attr("placeHolder", "回复 " + replyUserInfo + ": ");
        }

    });


// 当点击删除评论超链接时
    $(document).on('click', 'a[data-commentId]', function () {
        deleteCommentId = $(this).attr("data-commentId");
        $.ajax({
            async: false,
            url: "comment/deleteActivityCommentByCommentId",
            type: "POST",
            data: {commentId: deleteCommentId},
            success: function (deleteResult) {
                if (deleteResult === true) {
                    $("#deleteComment" + deleteCommentId + "").remove();
                }
            },
            error: function () {
                alert("删除评论失败！")
            }
        })


    });

    // 当点击删除评论回复超链接时

    $(document).on('click', 'a[data-commentReplyId]', function () {
        deleteCommentReplyId = $(this).attr("data-commentReplyId");
        $.ajax({
            async: false,
            url: "comment/deleteActivityCommentReplyByCommentId",
            type: "POST",
            data: {commentId: deleteCommentReplyId},
            success: function (deleteResult) {
                if (deleteResult === true) {
                    $("#deleteCommentReply" + deleteCommentReplyId + "").remove();
                }
            },
            error: function () {
                alert("删除评论回复失败！")
            }
        })


    });


    // 获取当前时间 插入时用
    function getFormatDate() {
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
        var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
        var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
        var minute = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
        var second = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }

    // 设置删除权限
    $(function () {
        if ($("#userId").val() === $("#sessionUserId").val()) {
            $("#cancelBtn").css("display", "")
        }
    });

    // 删除结伴
    $("#cancelBtn").click(function () {
        $.ajax({
            async: false,
            url: "activity/deleteActivityByActivityId",
            type: "POST",
            data: {"activityId": $("#activityId").val()},
            success: function (deleteResult) {
                if (deleteResult) {
                    window.location.href = "activity/jiebanIndex";
                }
            },
            error: function () {
                alert("删除结伴失败！")
            }

        })
    })


    $('#participatorForm')
        .bootstrapValidator(
            {

                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphiconglyphicon-ok',
                    invalid: 'glyphiconglyphicon-remove',
                    validating: 'glyphiconglyphicon-refresh'
                },

                fields: {
                    participatorPhone: {
                        message: 'The phone is not valid',
                        validators: {
                            notEmpty: {
                                message: '手机号码不能为空'
                            },
                            stringLength: {
                                min: 11,
                                max: 11,
                                message: '请输入11位手机号码'
                            }

                        }
                    }

                }

            });

// 百度地图api


    try {
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 11);
        map.enableScrollWheelZoom(true);


        $(function theLocation() {
            var city = document.getElementById("cityName").value;
            if (city != "") {
                map.centerAndZoom(city, 11);      // 用城市名设置地图中心点
            }
        });

        $("#selectMap").click(function theLocation() {
            var city = document.getElementById("cityName").value;
            if (city != "") {
                map.centerAndZoom(city, 11);      // 用城市名设置地图中心点
            }
        });

    } catch (e) {
        showModal("加载该地地图失败，请检查网络设置或关闭代理刷新重试！")
    }

});


