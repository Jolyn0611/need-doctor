$(document).ready(function(){

    $("#images").on("change", function(){
        var images=document.getElementById("images");
        //for(var i=0;i<images.files.length;i++){
        getfileName(images);
        /*if(imgName != ""){
            $('.file-placeholder').append(imgName+"&nbsp;&nbsp;");
        }*/
        //}
        /*$(".uploadImg").remove();
        $("#imgBox").append("<img class='uploadImage' th:src=\"@{/img/defaultImage.png}\" width='100' height='100' alt='' />&nbsp;&nbsp;")
        $("#imgBox").css("padding", '8px');*/
    });

    $(".uploadBtn").click(function(){

        //var img=document.getElementById("images");
        //alert(img.files.length);
        if(check()){
            var formData=new FormData($("#releaseForm1")[0]);

            $.ajax({
                url:'upload',
                type:'POST',
                data: formData,
                processData: false, //不使用默认方式处理上传的数据，默认会转成字符串
                contentType: false, //不使用默认的内容类型作为发送的数据的类型
                success: function(images){ //通过方法参数获取返回的图片路径
                    var tip= document.getElementById("tip");
                    tip.innerHTML='';
                    $(".uploadImg").remove();
                    $.each(images,function(index, item){
                        $("#imgBox").append("<img id='img"+index+"' src='../img/"+item+"' className='img-thumbnail fixed' width='200' height='200' alt='图片无法正常显示'/>&nbsp");
                    })
                    //$("#imgBox").after("<br><br>");
                    alert("发布房源信息成功! 请等待审核!");
                    $(".step-two").removeClass("active");
                    $(".step-three").addClass("active");
                    $("#a").attr("href","javascript:void(0);");
                    var obj = document.getElementById("a");
                    obj.style.cssText="text-decoration:line-through;color:dimgray";

                },
                error: function(req,status,error){
                    alert("请求处理出错!!!"+error);
                }
            });
        }

    });
});
//选择文件获取文件名称
function getfileName(images){
    var images = images.files;
    var imagesName = "";
    for(var i=0;i<images.length;i++){
        if(i==images.length-1){
            imagesName += images[i].name;
        }else{
            imagesName += images[i].name+' ';
        }
        $('.btn-behind').html(imagesName);
        $('.btn-down').html("共上传了"+images.length+"张图片");
    }
}
function check(){
    var price=$('input[name="price"]').val();
    var address=document.getElementById('ad').value;
    if(address==""||address==null){
        alert("房屋地址不能为空！");
        document.getElementById("ad").focus();
        return false;
    }
    if(price==""||price==null){
        alert("价格不能为空！");
        document.getElementById("pri").focus();
        return false;
    }
    return true;
}