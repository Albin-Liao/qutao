var login = require("../common/islogin.js");
require("../common/validate.js");
$(function() {
    login.Login('../../isLogin.do');
    var url = window.location.search;
    var productId = url.substring(url.indexOf('=') + 1);
    $.ajax({
        url: "../../item/itemdetail.do",
        type: 'GET',
        dataType: 'json',
        cache:false,
        data: {
            "productId": productId,
        },
        error: function() {
            alert("请重新加载!");
        },
        success: function(reData) {
            var html = "",img = reData.imgs;
            var htmlPic = "";
            if (reData.ret) {
                var data = reData.item;
                $("input[name='title']").val(data.title);
                $("input[name='price']").val(data.price);
                $("textarea[name='productDetails']").text(data.productDetails);
                $("input[name='qq']").val(data.qq);
                $("input[name='phone']").val(data.phone);

                for (var i = 0, len = img.length; len--; i++) {
                    html += '<span class="img_wrap"><strong title="单击删除">X</strong><img src="../../' 
                    + img[i].path + '" id="' + img[i].id + '" class="last-img"/></span>';
                }
                $(html).insertBefore(".imgArray");
                $(".img_wrap").delegate("strong", "click", function() {
                    var $this = $(this);
                    htmlPic = '<input type="hidden" name="ids" value="'+ $this.siblings("img").attr("id") + '"/>';
                    $(htmlPic).insertBefore(".imgArray");
                    $this.parent("span").remove();

                });

            } else {
                alert("请重新加载！");
            } //end else
        } //end success 
    }); //end ajax



    $("#sub").click(function() {
        var img = [];
        $(".last-img").each(function() {
            var $this = $(this);
            var obj = {};
            obj.id = $this.attr("id");
            obj.path = $this.attr("scr");
            img.push(obj);
        });
        $(".imgArray").val(img); //存放到影藏控件里
        $("#form")[0].submit();
    });

    $(".file-box").delegate("input[name='picture']", 'change', function() {
        $(this).parent().find('.txt').val($(this).val());
    });

    $("#addPic").bind('click', function(event) {
        var htmlstr = ['<div class="picture">',
            '<input type="text" class="txt" />',
            '<input type="button" class="btn" value="浏览..." />',
            '<input type="file" name="picture" class="file" class="s_picture" size="28" />',
            '<input type="button" class="btn del" value="删除"/>',
            '<span class="errmsg"></span>',
            '</div>'
        ].join('');
        $(".file-box").append($(htmlstr));
        $(".del:last").click(function(){
            $(this).parent().remove();
        });

    });

    $(".hiddenId").val(productId);

});