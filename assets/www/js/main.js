/**
 * Created with JetBrains PhpStorm.
 * User: xuwenmin
 * Date: 13-10-22
 * Time: 上午11:37
 * To change this template use File | Settings | File Templates.
 */
require.config({
    baseUrl: "js",
    paths:{
        "zepto":"zepto.min",
        "underscore":"underscore.min",
        // "touch":"extend/touch",
        "offset":"extend/offset",
        "position":"extend/position",
        "base":"base"
    },
    shim:{
       /* "touch":{
            deps:["position"]
        },*/
        "position":{
            deps:["offset"]
        },
        "offset":{
            deps:["zepto"]
        },
        "zepto":{
            exports:"$"
        },
        "underscore":{
            exports:"_"
        },
        "base":{
           deps:["underscore","position"] 
        }
    },
    // 处理js cache问题
    urlArgs:"bust=" + (new Date()).getTime() 
});
require(['base']);

