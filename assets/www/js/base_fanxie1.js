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
//按下退去按钮绑定事件
var returnexit = (function() {
    var onDeviceReady = function() {
        //添加回退按钮事件
        document.addEventListener("backbutton", eventBackButton, false);
    };
    var eventBackButton = function() {
        if(window.location.hash=="#index"){
            alert('再按一次将退出系统!');
            document.removeEventListener("backbutton", eventBackButton, false); // 注销返回键
            document.addEventListener("backbutton", exitApp, false); //绑定退出事件
            // 3秒后重新注册
            var intervalID = window.setInterval(function() {
                window.clearInterval(intervalID);
                document.removeEventListener("backbutton", exitApp, false); // 注销返回键
                document.addEventListener("backbutton", eventBackButton, false); // 返回键
            }, 3000);
        }
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
//财务指标--货币资金 图表
var createchart_cwzb=function(){
    var data = [
        {
            name : '北京',
            value:[2,1,12,20,26,30,32,29,22,12,0,2],
            color:'#00ac82',
            line_width:3
        }
    ];
    var chart = new iChart.LineBasic2D({
        render : 'cwzb_hbzj',
        data: data,
        title : {
            text:'参考值:20',
            color:'#666',
            textAlign:'right',
            fontsize:12,
            offsetx:-20
        },
        width : parseFloat($("body").offset().width),
        height : 200,
        coordinate:{
            height:'80%',
            background_color:null,
            gridlinesVisible:false,
            axis:{
                color:"#d9d9d9",
                width : [0, 0, 1, 0]
            },
            scale:[{
                position:'left',
                start_scale:0,
                end_scale:40,
                scale_enable : false,
                listeners:{
                    parseText:function(t,x,y){
                        return {text:""}
                    }
                }
            },{
                position:'bottom',
                label : {color:'#666',font : '微软雅黑',fontsize:11,fontweight:600},
                scale_enable : false,
                labels:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
            }]
        },
        listeners:{
            parsePoint:function(d,v,x,y,j){
                if(v<20)
                {
                    return {color:'#eb3d3d'}
                }else if(v==20){
                    return {color:'#ff9600'}
                }
            }
        },
        border:{
            enable:false
        },
        sub_option:{
            hollow_inside:false,//设置一个点的亮色在外环的效果
            point_size:10,
            hollow:false,
            smooth:true,
            label:{
                color:"blank",
                fontsize:0
            }
        }
    });
    chart.plugin(new iChart.Custom({
        drawFn:function(){
            var coo = chart.getCoordinate(),
                x = coo.get('originx'),
                W = coo.width,
                S = coo.getScale('left'),
                H = coo.height,
                y = H;
            var base=(coo.height/S.distance)*20+chart.y;
            var startx= x,endx=x;
            var len=W/10;
            for(var i=1;i<len;i++){
                endx= startx+10;
                chart.target.line(startx,base,endx,base,1,'#999');
                startx=startx+20;
                if(startx>(x+W)) break;
            }
            /*chart.target.line(x,base,x+W,base,1,'#d9d9d9')
             .textAlign('start')
             .textBaseline('middle')
             .textFont('600 12px Verdana');*/
        }
    }));
    chart.draw();
};
//风险预警--现金流量--现金到期债务比 图表
var createchart_fxyj_xjll_xjdqzwb=function(){
    var data = [
        {
            name : '北京',
            value:[2,1,12,20,26,30,32,29,22,12,0,2],
            color:'#00ac82',
            line_width:3
        }
    ];
    var chart = new iChart.LineBasic2D({
        render : 'fxyj_xjll_xjdqzwb',
        data: data,
        title : {
            text:'参考值:20',
            color:'#666',
            textAlign:'right',
            fontsize:12,
            offsetx:-20
        },
        width : parseFloat($("body").offset().width),
        height : 200,
        coordinate:{
            height:'80%',
            background_color:null,
            gridlinesVisible:false,
            axis:{
                color:"#d9d9d9",
                width : [0, 0, 1, 0]
            },
            scale:[{
                position:'left',
                start_scale:0,
                end_scale:40,
                scale_enable : false,
                listeners:{
                    parseText:function(t,x,y){
                        return {text:""}
                    }
                }
            },{
                position:'bottom',
                label : {color:'#666',font : '微软雅黑',fontsize:11,fontweight:600},
                scale_enable : false,
                labels:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
            }]
        },
        listeners:{
            parsePoint:function(d,v,x,y,j){
                if(v<20)
                {
                    return {color:'#eb3d3d'}
                }else if(v==20){
                    return {color:'#ff9600'}
                }
            }
        },
        border:{
            enable:false
        },
        sub_option:{
            hollow_inside:false,//设置一个点的亮色在外环的效果
            point_size:10,
            hollow:false,
            smooth:true,
            label:{
                color:"blank",
                fontsize:0
            }
        }
    });
    chart.plugin(new iChart.Custom({
        drawFn:function(){
            var coo = chart.getCoordinate(),
                x = coo.get('originx'),
                W = coo.width,
                S = coo.getScale('left'),
                H = coo.height,
                y = H;
            var base=(coo.height/S.distance)*20+chart.y;
            var startx= x,endx=x;
            var len=W/10;
            for(var i=1;i<len;i++){
                endx= startx+10;
                chart.target.line(startx,base,endx,base,1,'#999');
                startx=startx+20;
                if(startx>(x+W)) break;
            }
            /*chart.target.line(x,base,x+W,base,1,'#d9d9d9')
             .textAlign('start')
             .textBaseline('middle')
             .textFont('600 12px Verdana');*/
        }
    }));
    chart.draw();
};
//首页动画效果
var animateindex=(function(){
    var curx=1;
    var cury=1;
    var number=1;
    var timeid;
    //动画执行函数
    var animate1=function(){
        if(timeid){
            clearInterval(timeid);
        }
        var sumcount=88;
        timeid=setInterval(function(){
            var _num=parseInt((100/360)*number);
            if(_num>sumcount || _num>100){
                clearInterval(timeid);
                return;
            }
            var html="<p class=\"pf_f1\">"+_num+" <img src=\"images/index_1.png\" alt=\"\" />"+"</p>"+"<p class=\"pf_f2\">比较健康,建议优化</p>";
            if(curx<=180)  {
                $(".m_pingfen .pf_left")[0].style.webkitTransform = 'rotate(' + curx + 'deg)';
                curx++;
                $(".m_pingfen .pf_display").html(html);
            }else{
                $(".m_pingfen .pf_right")[0].style.webkitTransform = 'rotate(' + cury+ 'deg)';
                cury++;
                $(".m_pingfen .pf_display").html(html);
            }
            if(curx>180){
                $(".m_pingfen .pf_right").show();
            }
            number++;
            if(cury>180){
                curx=1;
                $(".m_pingfen .pf_right").hide();
                cury=1;
                number=1;
            }
        },1);
    };
    //清空动画参数
    var clear=function(){
        curx=1;
        cury=1;
        number=1;
        $(".m_pingfen .pf_left")[0].style.webkitTransform = 'rotate(' + 0 + 'deg)';
        $(".m_pingfen .pf_right").hide();
    };
    var stop=function(){
        if(timeid){
            clearInterval(timeid);
        }
    }
    //重新开始动画
    var start=function(){
        clear();
        animate1();
    }
    return {
        action:function(){
            animate1();
        },
        reload:function(){
            start();
        },
        stop:function(){
            stop();
        }
    }
})();
$(function() {
//    returnexit.init();//初始化绑定退出系统事件
    var $target = $(".main1");
    var curx = 0;
    var curwidth,touchevent,curmodel;
    if(_platform.android || _platform.iPhone){
        curwidth = parseFloat($("body").offset().width); //获取当前设备的width
        touchevent="touchstart";
    } else{
        curwidth=480;
        touchevent="click";
    }
    //路由事件
    $(window).on("hashchange",function(event){
        animateindex.stop();
        var hash=window.location.hash;
        if(!hash) return;
        var reg=/(#(.*)!\/(.*))|(#(.*))/;
        var result=hash.match(reg);
        var hashobj={};//hash对象,保存hash和传的参数信息
        if(result){
            if(result[2]){
                hashobj.hash=result[2];
                var _para= result[3];
                var _obj={};
                var _args=_para.split('&');
                for(var i=0;i<_args.length;i++){
                    var ss=_args[i].split('=');
                    _obj[ss[0]]=ss[1];
                }
            }else if(result[5]){
                hashobj.hash=result[5];
            }
        }
        var url="tmpl/"+hashobj.hash+".html";
        $.ajax({
            url: url,
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
                var dotobj=doT.template(msg);
                if(curmodel=="page1"){
                    $("#page2").html(dotobj(_obj));
                    $("#loaddiv").hide();
                    $target[0].style.webkitTransform = 'translateX(' + -curwidth+ 'px)';
                  /*  _.delay(function(){
                        $target.removeClass("translate-actionnext").removeClass("translate-actionpre").addClass("translate-actionpre");
                    },0);*/
                }else if(curmodel=="page2"){
                    $("#page1").html(dotobj(_obj));
                    $("#loaddiv").hide();
                 /*   _.delay(function(){
                        $target.removeClass("translate-actionnext").removeClass("translate-actionpre").addClass("translate-actionnext");
                    },0);*/
                    $target[0].style.webkitTransform = 'translateX(' + 0+ 'px)';
                }
                if(curmodel=="page1"){
                    curmodel="page2";
                }else{
                    curmodel="page1";
                }
                if(hashobj.hash=="cwzb_hbzj"){
                    _.delay(function(){
                        createchart_cwzb();
                    },0);
                }else if(hashobj.hash=="fxyj_xjll_xjdqzwb") {
                    _.delay(function(){
                        createchart_fxyj_xjll_xjdqzwb();
                    },0);
                }else if (hashobj.hash=="index"){
                    _.delay(function(){
                        animateindex.reload();
                    });
                }
            },
            error: function() {
                $("#loaddiv").hide();
            }
        });
    })
    curmodel="page1";
    window.location.hash="index";
//    $(window).trigger("hashchange");
    //动态绑定跳转下一页的事件
    $target.delegate("[to]",touchevent,function(event){
        event.stopPropagation();
        event.preventDefault();
        window.location.hash=$(this).attr("to");
    });
    //动态绑定返回上一页的事件
    $target.delegate(".pre[from]",touchevent,function(event){
        event.stopPropagation();
        event.preventDefault();
        window.location.hash=$(this).attr("from");
    });
    //动态绑定收起和展开事件
    $target.delegate(".hassub",touchevent,function(){
        var groupname=$(this).attr("rel");
        if($(this).hasClass("active")){
            $("[name="+groupname+"]").hide();
            $(this).removeClass("active");
        }
         else{
            $("[name="+groupname+"]").show();
            $(this).removeClass("active").addClass("active");
            $(this).siblings(".hassub").each(function(){
                $(this).removeClass("active");
                var groupname=$(this).attr("rel");
                $("[name="+groupname+"]").hide();
            });
        }
    });
});