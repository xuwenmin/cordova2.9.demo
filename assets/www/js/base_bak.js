$.fn.qmtouchin = function() {
    var $self = $(this);
    var canvas = $self.find(".content")[0],
        istouch, startX, startY, endX, endY, curX = 0,
        isright, isleft, curleft, curdiv;
    var target = $self.find(".main")[0];
    var cachemanger = {}; //cache object
    var curwidth = parseFloat($("body").offset().width); //获取当前设备的width
    //基本的touchstart,touchmove,touchend事件
    var touchStart = function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (istouch || !event.touches.length) return;
        var touch = event.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
        istouch = true;
        isleft = false;
        isright = false;
        $(target).removeClass("animal");
    }
    var touchMove = function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!istouch || !event.touches.length) return;
        var touch = event.touches[0],
            x = (touch.pageX - startX),
            y = touch.pageY - startY;
        startX = touch.pageX;
        startY = touch.pageY;
        curX = curX + x;
        target.style.webkitTransform = 'translateX(' + curX + 'px)';
        if (x < 0) {
            isleft = true;
            isright = false;
        } else {
            isright = true;
            isleft = false;
        }
    }
    var touchEnd = function(event) {
        event.preventDefault();
        event.stopPropagation();
        istouch = false;
        //此处检查,当前移动到哪个div里
        //检查curX在哪个范围内
        $(target).removeClass("animal").addClass("animal");
        if (isleft) {
            if (curX < 0 && curX >= -curwidth) {
                //2
                target.style.webkitTransform = 'translateX(' + -curwidth + 'px)';
                curX = -curwidth;
                curdiv = ".div2";
            } else if (curX < -curwidth && curX >= -curwidth * 2) {
                //3
                target.style.webkitTransform = 'translateX(' + -curwidth * 2 + 'px)';
                curX = -curwidth * 2;
                curdiv = ".div3";
            } else if (curX < -curwidth * 2 && curX >= -curwidth * 3) {
                //4
                curX = -curwidth * 3;
                curdiv = ".div4";
                target.style.webkitTransform = 'translateX(' + -curwidth * 3 + 'px)';
            } else if (curX < -curwidth * 3) {
                curX = -curwidth * 3;
                curdiv = ".div4";
                target.style.webkitTransform = 'translateX(' + -curwidth * 3 + 'px)';
            }
        }
        if (isright) {
            if (curX < 0 && curX >= -curwidth) {
                //2
                target.style.webkitTransform = 'translateX(0)';
                curX = 0;
                curdiv = ".div1";
            } else if (curX < -curwidth && curX >= -curwidth * 2) {
                //3
                target.style.webkitTransform = 'translateX(' + -curwidth + 'px)';
                curX = -curwidth;
                curdiv = ".div2";
            } else if (curX < -curwidth * 2 && curX >= -curwidth * 3) {
                //4
                curX = -curwidth * 2;
                curdiv = ".div3";
                target.style.webkitTransform = 'translateX(' + -curwidth * 2 + 'px)';
            } else if (curX > 0) {
                target.style.webkitTransform = 'translateX(0px)';
                curX = 0;
                curdiv = ".div1";
            }
        }
        _.delay(function() {
            $(target).removeClass("animal");
            isleft = false;
            isright = false;
            //此处开始执行异步操作.by xuwm 
            if (!cachemanger[curdiv]) {
                $.ajax({
                    url: "data/getdata.php",
                    type: "get",
                    dataType: "json",
                    beforeSend: function() {
                        //开始加载时
                        $("#loaddiv").position({
                            my: 'left-16 center',
                            at: 'center',
                            of: document.body
                        }).show();
                    },
                    success: function(msg) {
                        $("#loaddiv").hide();
                        //给模板加载数据，并填充到当前div中
                        var tmpl = $("#abc").html();
                        var doobj = doT.template(tmpl);
                        $self.find(curdiv).append(doobj(msg));
                        cachemanger[curdiv] = true;
                    },
                    error: function() {
                        $("#loaddiv").hide();
                    }
                });
            }
        }, 1000);
    }
    var _init = function() {
        canvas.addEventListener("touchstart", touchStart, false);
        canvas.addEventListener("touchmove", touchMove, false);
        canvas.addEventListener("touchend", touchEnd, false);
    }
    _init();
    return this;
};
var qmtouchout = (function() {
    var canvas = $("._wrapper")[0],
        istouch, startX, startY, endX, endY, curX = 0,
        isright, isleft, curleft, curdiv;
    var target = $(".main1")[0];
    var cachemanger = {}; //cache object
    var curwidth = parseFloat($("body").offset().width); //获取当前设备的width

    var $wraps = $(".main1").find(".wrapper"); //参与拖动的所有页面
    var wraplen = $wraps.length; //参与拖动的页面数量
    //基本的touchstart,touchmove,touchend事件
    var touchStart = function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (istouch || !event.touches.length) return;
        var touch = event.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
        istouch = true;
        isleft = false;
        isright = false;
        $(target).removeClass("animal");
    }
    var touchMove = function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!istouch || !event.touches.length) return;
        var touch = event.touches[0],
            x = (touch.pageX - startX),
            y = touch.pageY - startY;
        startX = touch.pageX;
        startY = touch.pageY;
        curX = curX + x;
        target.style.webkitTransform = 'translateX(' + curX + 'px)';
        if (x < 0) {
            isleft = true;
            isright = false;
        } else {
            isright = true;
            isleft = false;
        }
    }
    var touchEnd = function(event) {
        event.preventDefault();
        event.stopPropagation();
        istouch = false;
        //此处检查,当前移动到哪个div里
        //检查curX在哪个范围内
        $(target).removeClass("animal").addClass("animal");
        if (isleft) {
            var n = parseInt(-curX / curwidth) + 1; //倍数
            if (n >= wraplen) n--;
            curX = -curwidth * n;
            target.style.webkitTransform = 'translateX(' + curX + 'px)';
            curdiv = ".div" + (n + 1);
        }
        if (isright) {
            if (curX > 0) {
                curX = 0;
                target.style.webkitTransform = 'translateX(0px)';
                curdiv = ".div1";
            } else {
                var n = parseInt(-curX / curwidth) + 1; //倍数
                curX = -curwidth * (n - 1);
                target.style.webkitTransform = 'translateX(' + curX + 'px)';
                curdiv = ".div" + n;
            }
        }
        _.delay(function() {
            $(target).removeClass("animal");
            isleft = false;
            isright = false;
            //此处开始执行异步操作.by xuwm 
            if (!cachemanger[curdiv]) {
                $.ajax({
                    url: "tmpl/a.tpl",
                    type: "get",
                    dataType: "text",
                    beforeSend: function() {
                        //开始加载时
                        $("#loaddiv").position({
                            my: 'left-16 center',
                            at: 'center',
                            of: document.body
                        }).show();
                    },
                    success: function(msg) {
                        //给模板加载数据，并填充到当前div中
                        var doobj = doT.template(msg);
                        $.ajax({
                            url: 'data/data.json',
                            dataType: "json",
                            success: function(data) {
                                $(target).find(curdiv).append(doobj(data));
                                cachemanger[curdiv] = true;
                                $("#loaddiv").hide();
                            }
                        });
                    },
                    error: function() {
                        $("#loaddiv").hide();
                    }
                });
            }
        }, 1000);
    }
    var _init = function() {
        canvas.addEventListener("touchstart", touchStart, false);
        canvas.addEventListener("touchmove", touchMove, false);
        canvas.addEventListener("touchend", touchEnd, false);
    }
    return {
        inittouch: function() {
            _init();
        }
    }
})();

//按下退去按钮绑定事件
var returnexit = (function() {
    var onDeviceReady = function() {
        //添加回退按钮事件
        document.addEventListener("backbutton", eventBackButton, false);
    };
    var eventBackButton = function() {
        alert('再点击一次退出!');
        document.removeEventListener("backbutton", eventBackButton, false); // 注销返回键
        document.addEventListener("backbutton", exitApp, false); //绑定退出事件
        // 3秒后重新注册
        var intervalID = window.setInterval(function() {
            window.clearInterval(intervalID);
            document.removeEventListener("backbutton", exitApp, false); // 注销返回键
            document.addEventListener("backbutton", eventBackButton, false); // 返回键
        }, 3000);
    };

    var exitApp = function() {
        navigator.app.exitApp();
    };
    var _init = function() {
        document.addEventListener("deviceready", onDeviceReady, false);
    };
    return {
        init: function() {
            _init();
        }
    }
})();
//跳转管理对象
var gotopage = (function() {
    //保存一个跳转页的历史，方便以后跳转用
    var gotolist = {
        //封面会跳到page2,来源为空
        1:{
            fromid:"",
            wd:0
        }
    };
//    var curwidth=480;
    //设置跳转页的跳转距离，以方便下次跳回来
    var _setpage = function(toid,width,fromid) {
        if(!gotolist[toid]){
            gotolist[toid]={};
            gotolist[toid].wd=width;
            gotolist[toid].fromid=fromid;
        }
        return width;
        //假如跳转之前距离不是1，则隐藏之间页面
       
    };
    //获取指定跳转页的跳转距离
    var _getpage = function(id) {
        return gotolist[id];
    };
    return {
        setpage: function(toid,width,fromid) {
            return _setpage(toid,width,fromid);
        },
        getpage: function(id) {
            return _getpage(id);
        }
    }
})();
var _platform=(function(){
    //检测平台
    var browser={
        versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核                
                presto: u.indexOf('Presto') > -1, //opera内核                
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核                
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核                
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端                
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器                
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器                
                iPad: u.indexOf('iPad') > -1, //是否iPad                
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部            
            };
        }()
    };
    return  browser.versions ;
})();
$(function() {

    var $target = $(".main1");
    var curx = 0;
    var curwidth,touchevent;
    if(_platform.android || _platform.iPhone){
        curwidth = parseFloat($("body").offset().width); //获取当前设备的width
        touchevent="touchstart";
    } else{
        curwidth=480;
        touchevent="click";
    }
    //动态的绑定向下页跳转的记录
    var nextid=0;//记录当前页跳转的指针
    $("[to]").each(function() {
        $(this).on(touchevent, function() {
            var toid = $(this).attr("to");
            var fromid= $(this).attr("from");
            $("#page"+toid).show();
            nextid++;
            //隐藏from与to之间的页
            var len=toid-fromid-1;
            var str="";
            for(var i=1;i<=len;i++){
                str="#page"+(parseInt(i)+parseInt(fromid));
                $(str).hide();
            }
            var pageobj=gotopage.getpage(toid);
            var wd;
            if(!pageobj){
                wd=gotopage.setpage(toid,-curwidth*nextid,fromid);
            }else{
                wd=pageobj.wd;
            }
            $target[0].style.webkitTransform = 'translateX(' + wd + 'px)';
        });
    });

    //动态绑定向上一页跳转的记录
    $(".wrapper img.pre").on(touchevent,function(){
         var curid=$(this).attr("from");
         var pageobj=gotopage.getpage(curid);
         $("#page"+pageobj.fromid).show();
         var topageobj=gotopage.getpage(pageobj.fromid);
         $target[0].style.webkitTransform = 'translateX(' + topageobj.wd + 'px)';
         nextid--;
/*         _.delay(function(){
            if(nextid!=0){
                $("#page"+curid).hide();
            }
         },0);*/
    });
    
    _.delay(function(){
        $(".wrapper").hide();
        $("#page1,#page2").show();
    },0);

    $(".hassub").on(touchevent,function(){
        var groupname=$(this).attr("rel");
        $("[name="+groupname+"]").show();
        $(this).removeClass("active").addClass("active");
        $(this).siblings(".hassub").each(function(){
            $(this).removeClass("active");
            var groupname=$(this).attr("rel");
            $("[name="+groupname+"]").hide();
        });
    });

});