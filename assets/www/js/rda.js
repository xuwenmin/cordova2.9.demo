/**
 * Created with JetBrains PhpStorm.
 * User: xuwenmin
 * Date: 13-8-30
 * Time: 下午12:37
 * To change this template use File | Settings | File Templates.
 */
$.fn.silder = function() {
    var $self = $(this);
    var $left = $(this).find(".silderleft").eq(0);
    var $right = $(this).find(".silderright").eq(0);
    var $target = $(this).find(".silder").eq(0);
    var canvas = $(this)[0],
        istouch, startX, startY, endX, endY, curX, isright, isleft, curleft;
    // touch start listener

    function touchStart(event) {
        event.preventDefault();
        if (istouch || !event.touches.length) return;
        var touch = event.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
        istouch = true;
        /*
         spirit = document.createElement("div");
         spirit.className = "spirit";
         spirit.style.left = startX;
         spirit.style.top = startY;
         canvas.appendChild(spirit);*/
    }
    // add touch start listener
    $target[0].addEventListener("touchstart", touchStart, false);

    function touchMove(event) {
        event.preventDefault();
        if (!istouch || !event.touches.length) return;
        var touch = event.touches[0],
            x = touch.pageX - startX,
            y = touch.pageY - startY;
        endX = touch.pageX;
        endY = touch.pageY;
        curX = x;
        if (x <= 50 && x >= 0 && !curleft) {
            if (x > 25) {
                $right.hide();
                $left.show();
                $self.removeClass("mainr");
                isright = false;
                isleft = true;
                $target.removeClass("silder_r").addClass("silder_r");
                $target[0].style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
                $target.find("a").eq(0).html($right.text());

            } else {
                $right.show();
                $left.hide();
                isright = true;
                isleft = false;
                $self.removeClass("mainr").addClass("mainr");
                $target.removeClass("silder_r");
                $target[0].style.webkitTransform = 'translate(' + x + 'px, ' + 0 + 'px)';
                $target.find("a").eq(0).html($left.text());
            }

        }

        if (curleft && x <= 0) {
            x = x + 50;
            if (x >= 0 && x <= 50) {

                if (x > 25) {
                    $right.hide();
                    $left.show();
                    $self.removeClass("mainr");
                    isright = false;
                    isleft = true;
                    $target.removeClass("silder_r").addClass("silder_r");
                    $target[0].style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
                    $target.find("a").eq(0).html($right.text());

                } else {
                    $right.show();
                    $left.hide();
                    isright = true;
                    isleft = false;
                    $target.removeClass("silder_r");
                    $self.removeClass("mainr").addClass("mainr");
                    $target[0].style.webkitTransform = 'translate(' + x + 'px, ' + 0 + 'px)';
                    $target.find("a").eq(0).html($left.text());
                }
            }
        }
    }

    canvas.addEventListener("touchmove", touchMove, false);

    function touchEnd(event) {
        //canvas.removeChild(spirit);
        if (!istouch) return;
        if (isleft) {
            $target[0].style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
            curleft = true;
        } else if (isright) {
            $target[0].style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
            curleft = false;
        }
        if (!isleft && !isright) {
            if (!isleft && !isright) {
                if (curX > 2) {
                    $target[0].style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
                    $right.hide();
                    $left.show();
                    isright = false;
                    isleft = true;
                    $self.removeClass("mainr");
                    $target.removeClass("silder_r").addClass("silder_r");
                    curleft = true;
                    $target.find("a").eq(0).html($right.text());
                }
                if (curX < -2) {
                    $target[0].style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
                    $right.show();
                    $left.hide();
                    isright = true;
                    isleft = false;
                    $target.removeClass("silder_r");
                    $self.removeClass("mainr").addClass("mainr");
                    curleft = false;
                    $target.find("a").eq(0).html($left.text());
                }
            }
        }
        istouch = false;
    }
    canvas.addEventListener("touchend", touchEnd, false);

    //绑定直接点击左边和右边的时候,直接移动到两侧
    $left.on("touchend", function() {
        isright = true;
        isleft = false;
        $right.show();
        $left.hide();
        $self.removeClass("mainr").addClass("mainr");
        $target.removeClass("silder_r");
        curleft = false;
        $target[0].style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';

        $target.find("a").eq(0).html($left.text());
    });
    $right.on("touchend", function() {

        isright = false;
        isleft = true;
        $right.hide();
        $left.show();
        $self.removeClass("mainr");
        $target.removeClass("silder_r").addClass("silder_r");
        curleft = true;
        $target[0].style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';

        $target.find("a").eq(0).html($right.text());
    });
    return this;
};
/*
*    function onResolveSuccess(fileEntry) {
 fileEntry.file(gotFile, fail);
 }
 function gotFile(file){
 //alert(file.fullPath);
 var reader = new FileReader();
 reader.onloadstart=function(){
 alert("开始读文件!");
 };
 reader.onloadend = function(evt) {
 alert("读取文件成功!");
 $("#divinfo").html(evt.target.result);
 };
 reader.readAsText(file);
 }
 function fail(evt) {
 alert(evt.target.error.code);
 }
 window.resolveLocalFileSystemURI("qm_a.txt",onResolveSuccess, fail);
* */
var qmreadfile=function(filename,sunc,fail){

}
$(function() {
    $(".header .righticon a").click(function(e) {
        e.preventDefault();
        window.location = "9_1.html";
    });
    $("#aback").click(function(e) {
        e.preventDefault();
        // window.location="test2.html";
        window.history.back();
    });


    $("#findabc").keyup(function() {
        var val = $(this).val();
        if (!val) {
            $("#qm_info").hide();
        } else {
            //开始加载动态的数据
            findarg(val);
        }
    });
    var datainfo = ["你好", "你好吗", "xuwm111", "xu", "xuwm", "我", "我们"];
    var findarg = function(val) {
        if (!val) return;
        var reg = new RegExp(val, "i");
        var args = _.filter(datainfo, function(num) {
            return reg.exec(num);
        });
        var html = "";
        for (var i in args) {
            html += "<li>" + args[i] + "</li>";
        }
        if (html) {
            html = "<ul>" + html + "</ul>";
            $("#qm_info").empty().append(html).show();
        } else {
            $("#qm_info").hide();
        }
    };
    $("#qm_info").delegate("ul li", "click", function() {
        $("#findabc").val($(this).html());
        $("#qm_info").hide();
    });
    $("#left2_1").click(function() {
        if ($(".bubble:visible").length) {
            $(".bubble").hide();
        } else {
            $(".bubble").show();
        }
    });
    $(".content .ultitle li").click(function() {
        //$(this).siblings().removeClass("activeli");
        $(this).removeClass("activeli").addClass("activeli").siblings().removeClass("activeli");
        var eq = $(".content .ultitle li").index($(this));
        $(".content .bigdescinfo").eq(eq).show().siblings(".bigdescinfo").hide();
    });
    $(".content .content4_2 li").click(function() {
        if ($(this).next(".li_desc:visible").length) {
            $(this).siblings(".li_desc").hide().end().next(".li_desc").hide();
        } else {
            $(this).siblings(".li_desc").hide().end().next(".li_desc").show();
        }
    });
    $(".content .contentlist5_2 li").click(function() {
        var $lidesc = $(this).find(".li_desc");
        if ($lidesc.length) {
            if ($lidesc.eq(0).is(":visible")) {
                $lidesc.eq(0).hide();
                $(this).find(".list_desc img").show();
                $(this).find(".list_img").show();
            } else {
                $lidesc.eq(0).show();
                $(this).find(".list_desc img").hide();
                $(this).find(".list_img").hide();
            }
        }
    });
    $(".content_left").click(function() {
        if ($(".bubbleleft:visible").length) {
            $(".bubbleleft").hide();
        } else {
            $(".bubbleleft").show();
        }
    });
    $(".content_right").click(function() {
        if ($(".bubbleright:visible").length) {
            $(".bubbleright").hide();
        } else {
            $(".bubbleright").show();
        }
    });
    //模拟点击文本框,外层的DIV有box 阴影效果.by xuwm on 20130904
    $(".content .bigdescinfo ul li div.input input").on("focus", function() {
        $(this).removeClass("focus").addClass("focus");
        $(this).parent().removeClass("focus").addClass("focus");
    })

    $(".content .bigdescinfo ul li div.input input").on("blur", function() {
        $(this).removeClass("focus");
        $(this).parent().removeClass("focus");
    })

    //模拟点击文本框,外层的DIV有box 阴影效果.by xuwm on 20130904
    $(".content .bigdescinfo div.input input").on("focus", function() {
        $(this).removeClass("focus").addClass("focus");
        $(this).parent().removeClass("focus").addClass("focus");
    })

    $(".content .bigdescinfo div.input input").on("blur", function() {
        $(this).removeClass("focus");
        $(this).parent().removeClass("focus");
    })


    //绑定登录首页的单击事件
    //6个img的单击事件

    var indexgo = ["2_1.html", "4_1.html", "3_1.html", "5_1.html", "6_1.html", "7_1.html"];
    $(".indexgo img").each(function(index) {
        $(this).click(function() {
            window.location = indexgo[index];
        })
    })

    //绑定页脚的切换事件
    var agoarg = ["1_1_ios.html", "2_1.html", "3_1.html", "8_1.html"];

    $(".footer .bottominfo").each(function(index) {
        $(this).click(function() {
            window.location = agoarg[index];
        });
    });
    //绑定所有返回的时候跳转到首页
    $(".header img[src*='2_10']").click(function() {

        if ($(this).hasClass("find8_1")) {
            //绑定8_系统的返回到8_1
            window.location = "8_1.html";
        } else if ($(this).hasClass("find4_1")) {
            //绑定8_系统的返回到8_1
            window.location = "4_1.html";
        } else if ($(this).hasClass("find5_1")) {
            //绑定8_系统的返回到8_1
            window.location = "5_1.html";
        } else if ($(this).hasClass("find6_1")) {
            //绑定8_系统的返回到8_1
            window.location = "6_1.html";
        } else if ($(this).hasClass("find7_1")) {
            //绑定8_系统的返回到8_1
            window.location = "7_1.html";
        } else {
            window.location = "1_1_ios.html";
        }
    });

    //固定页脚在底部

    //绑定注册页面的JS
    $(".content .bigdescinfo .register a.areg").click(function(e) {
        e.preventDefault();
        window.location = "10_1.html";
    });

    //绑定注册到最后一步
    $(".content .buttondiv  a.aregtonext").click(function(e) {
        e.preventDefault();
        window.location = "10_3.html";
    });

    //绑定最后一步到完成页
    $(".content .buttondiv  a.aendtoover").click(function(e) {
        e.preventDefault();
        window.location = "10_4.html";
    });

    //绑定完成到注册成功
    $(".content .buttondiv  a.aovertoyes").click(function(e) {
        e.preventDefault();
        window.location = "10_5.html";
    });

    //绑定注册成功到登录
    $(".content .buttondiv  a.ayestologin").click(function(e) {
        e.preventDefault();
        window.location = "9_1.html";
    });

    //登录成功后跳到登录页面
    $(".content .bigdescinfo  a.alogintoindex").click(function(e) {
        e.preventDefault();
        window.location = "1_2.html";
    });

    //绑定2_1里的搜索跳转
    $(".header .righticon img.find2_1").click(function() {
        window.location = "2_3.html";
    });

    //绑定2_1 中的li跳转
    $(".content .list2_1 li").click(function() {
        window.location = "2_4.html";
    });

    //绑定2_4 中的li跳转
    $(".list2_4 li").click(function() {
        window.location = "2_5.html";
    });

    //绑定3_1里的搜索跳转
    $(".header .righticon img.find3_1").click(function() {
        window.location = "3_3.html";
    });

    //绑定3_1 中的li跳转
    $(".content .list3_1 li").click(function() {
        window.location = "3_5.html";
    });

    //绑定3_5同意查看详情按钮
    $(".content .buttondiv a.find3_5").click(function() {
        window.location = "3_4.html";
    });

    //绑定账户设置的查看信息
    var agoarg8_1 = ["8_2.html", "8_3.html", "8_4.html", "8_5.html", "8_6.html"];
    $(".content .list8_1 li").each(function(index) {
        $(this).click(function() {
            window.location = agoarg8_1[index];
        });
    });

    //绑定4_1 中li_desc中的跳转
    var agoarg4_1 = ["4_3.html", "4_7.html"];
    $(".content .content4_2 .li_desc div[class*=lidiv]").each(function(index) {
        $(this).click(function() {
            if (agoarg4_1[index]) {
                window.location = agoarg4_1[index];
            }
        });
    });

    //绑定5_1中跳转到图表
    $(".contentlist5_2 img.list5_1").click(function(e) {
        e.stopPropagation();
        window.location = "5_4.html";
    });

    //绑定5_4中发送信息
    $(".content .descinfo img.send5_4").click(function(e) {
        e.stopPropagation();
        window.location = "5_5.html";
    });

    //绑定6_1两按钮跳转
    $(".content .buttondiv a.a6_1_1").click(function(e) {
        e.preventDefault();
        window.location = "6_2.html";
    });
    $(".content .buttondiv a.a6_1_2").click(function(e) {
        e.preventDefault();
        window.location = "6_6.html";
    });

    //绑定6_2下一步跳转到6_3最后一步
    $(".content .buttondiv a.a62next").click(function(e) {
        e.preventDefault();
        window.location = "6_3.html";
    });
    $(".content .buttondiv a.a63end").click(function(e) {
        e.preventDefault();
        window.location = "6_5.html";
    });

    //绑定7_1到7_2同意委托
    $(".content .buttondiv a.a71to72").click(function(e) {
        e.preventDefault();
        window.location = "7_2.html";
    });
    //绑定7_2到7_3同意委托
    $(".content .buttondiv a.a72to73").click(function(e) {
        e.preventDefault();
        window.location = "7_3.html";
    });
    //绑定7_3到7_4同意委托
    $(".content .buttondiv a.a73to74").click(function(e) {
        e.preventDefault();
        window.location = "7_4.html";
    });
    //绑定7_4到7_5同意委托
    $(".content .buttondiv a.a74to75").click(function(e) {
        e.preventDefault();
        window.location = "7_5.html";
    });
    //绑定7_5到7_6同意委托
    $(".content .buttondiv a.a75to76").click(function(e) {
        e.preventDefault();
        window.location = "7_6.html";
    });
    //绑定7_6到7_7同意委托
    $(".content .buttondiv a.a76to77").click(function(e) {
        e.preventDefault();
        window.location = "7_7.html";
    });

    //全局控制线的宽度
    $(".linediv").css("padding", "1px 0 0 0");

    //绑定7_5里的启用和不启用事件
    $(".content_list").delegate(".dright", "click", function() {
        //不启用
        $(this).prev().removeClass("dleft").addClass("dleft1");
        $(this).removeClass("dright").addClass("dright1");
    });
    //绑定7_5里的启用和不启用事件
    $(".content_list").delegate(".dleft1", "click", function() {
        //不启用
        $(this).next().removeClass("dright1").addClass("dright");
        $(this).removeClass("dleft1").addClass("dleft");
    });

    //绑定10_3中的男和女的切换事件
    $(".content .bigdescinfo").delegate(".dright", "click", function() {
        //不启用
        $(this).prev().removeClass("dleft1").addClass("dleft1");
        $(this).removeClass("dright1").addClass("dright1");
    });
    $(".content .bigdescinfo").delegate(".dleft1", "click", function() {
        //不启用
        $(this).next().removeClass("dright1").addClass("dright");
        $(this).removeClass("dleft1").addClass("dleft");
    });

    $(".qmsilder").each(function() {
        $(this).silder();
    });

    var str3='<div class="content"><div class="descinfo"><ul><li><span>我的投资项目:</span><span>11</span><span>个</span></li> <li><span>RDA监控项目:</span>'+
    '<span>11</span><span>个</span></li></ul></div>';
    var str2='<div class="content"><div class="descinfo"><ul><li><span>this s test!:</span><span>11</span><span>个</span></li> <li><span>RDA监控项目:</span>'+
        '<span>11</span><span>个</span></li></ul></div>';


    var Approuter=Backbone.Router.extend({
        routes:{
            "/pages/:id":"loadpage"
        },
        loadpage:function(id){
            switch (id)
            {
                case "1_1":
                    break;
                case "2_1":
                    $.ajax({
                        url:"tmpl/2_1.tpl",
                        dataType:"text",
                        success:function(msg){
                            $("body").html(msg);
                        }
                    });
                    break;
                case "3_1":
                    $.ajax({
                        url:"tmpl/3_1.tpl",
                        dataType:"text",
                        success:function(msg){
                            $("body").html(msg);
                        }
                    });

                    break;
                case "8_1":

                    break;
            }
        }
    });
    //var approu=new Approuter;
    //Backbone.history.start();

});