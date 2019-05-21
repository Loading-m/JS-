
var _ajax=function(_url,parameters,functionName,param,type,errorName){
	var params={}
	params.url=_url;
	params.cache=false;
	if(type && ("post"==type || "get"==type)){
		params.type=type;	
	}else{
		params.type="post";
	}
	if(parameters){
		params.data=parameters;	
	}
	params.dataType="json";
	params.error=function(XMLHttpRequest, textStatus, errorThrown){
		if(errorName){
			 if(typeof functionName === 'function' ){
				errorName();
			 }else{
				 eval(errorName+"()");
			 }
		}else{
			//alert("发生意外错误，请稍候再试,"+textStatus+","+errorThrown);
		}
	}
	params.success=function(data){
			 if(typeof functionName === 'function' ){
			 	functionName(data,param);
			 }else{
				 eval(functionName+"(data"+(param?","+param:"")+")");
			 }
		};
	$.ajax(params);
};

var _ajax_jsonp=function(_url,functionName){
	
	$.getJSON(_url+"&jsoncallback=?",function(json){
			 if(typeof functionName === 'function' ){
			 	functionName(json);
			 }else{
				 eval(functionName+"(json)");
			 }
     });
};



var userAgent = navigator.userAgent.toLowerCase();
browser={
    version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
    safari: /webkit/.test( userAgent ),
    opera: /opera/.test( userAgent ),
    msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
    mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
}





function date(format, timestamp){ 
    var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
    var pad = function(n, c){
        if((n = n + "").length < c){
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"};
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
    var f = {
        // Day
        d: function(){return pad(f.j(), 2)},
        D: function(){return f.l().substr(0,3)},
        j: function(){return jsdate.getDate()},
        l: function(){return txt_weekdays[f.w()]},
        N: function(){return f.w() + 1},
        S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'},
        w: function(){return jsdate.getDay()},
        z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0},
        // Week
        W: function(){
            var a = f.z(), b = 364 + f.L() - a;
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
            if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
                return 1;
            } else{
                if(a <= 2 && nd >= 4 && a >= (6 - nd)){
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                    return date("W", Math.round(nd2.getTime()/1000));
                } else{
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                }
            }
        },
        // Month
        F: function(){return txt_months[f.n()]},
        m: function(){return pad(f.n(), 2)},
        M: function(){return f.F().substr(0,3)},
        n: function(){return jsdate.getMonth() + 1},
        t: function(){
            var n;
            if( (n = jsdate.getMonth() + 1) == 2 ){
                return 28 + f.L();
            } else{
                if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
                    return 31;
                } else{
                    return 30;
                }
            }
        },
        // Year
        L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0},
        //o not supported yet
        Y: function(){return jsdate.getFullYear()},
        y: function(){return (jsdate.getFullYear() + "").slice(2)},
        // Time
        a: function(){return jsdate.getHours() > 11 ? "pm" : "am"},
        A: function(){return f.a().toUpperCase()},
        B: function(){
            // peter paul koch:
            var off = (jsdate.getTimezoneOffset() + 60)*60;
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
            var beat = Math.floor(theSeconds/86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if ((String(beat)).length == 1) beat = "00"+beat;
            if ((String(beat)).length == 2) beat = "0"+beat;
            return beat;
        },
        g: function(){return jsdate.getHours() % 12 || 12},
        G: function(){return jsdate.getHours()},
        h: function(){return pad(f.g(), 2)},
        H: function(){return pad(jsdate.getHours(), 2)},
        i: function(){return pad(jsdate.getMinutes(), 2)},
        s: function(){return pad(jsdate.getSeconds(), 2)},
        //u not supported yet
        // Timezone
        //e not supported yet
        //I not supported yet
        O: function(){
            var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
            return t;
        },
        P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))},
        //T not supported yet
        //Z not supported yet
        // Full Date/Time
        c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()},
        //r not supported yet
        U: function(){return Math.round(jsdate.getTime()/1000)}
    };
    return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
        if( t!=s ){
            // escaped
            ret = s;
        } else if( f[s] ){
            // a date function exists
            ret = f[s]();
        } else{
            // nothing special
            ret = s;
        }
        return ret;
    });
}

function copy_clip(txt) {
    if (window.clipboardData) {
            window.clipboardData.clearData();
            window.clipboardData.setData("Text", txt);
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
            window.location = txt;
    } else if (window.netscape) {
            try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                    alert("您的firefox安全限制限制您进行剪贴板操作，请在新窗口的地址栏里输入'about:config'然后找到'signed.applets.codebase_principal_support'设置为true'");
                    return false;
            }
            var clip = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
            if (!clip)
                    return;
            var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
            if (!trans)
                    return;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = txt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip)
                    return false;
            clip.setData(trans, null, clipid.kGlobalClipboard);
    }
	alert('复制成功');
}

function cut_str(str, len){
	var char_length = 0;
	for (var i = 0; i < str.length; i++){
		var son_str = str.charAt(i);
		encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
		if (char_length >= len){
			var sub_len = char_length == len ? i+1 : i;
			return str.substr(0, sub_len);
			break;
		}
	}
	return str;
}

function isEmail(str){
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    return reg.test(str);
}

/*
 * added by liu_xc 2004.6.11
 * 约束输入框的内容
 * 适用于IE5.0及以上版本
 * oObj: 输入框控件对象
 * reg:  正则表达式
 * isChinese：是否允许打开输入法，true 允许打开，即允许输入中文，false 不能打开，默认为不允许打开
 * usage:
 *
 *   //只能输入数字和大小写字母
 *	<BODY onLoad="regInputRestriction(document.all.txt,/^[0-9a-zA-Z]*$/)">
 *	<input id="txt">
 * 	</BODY>
 */
function regInputRestriction(oObj,reg,isChinese)
{
	
	function regInput(obj, reg, inputStr)
	{
		
		var docSel	= document.selection.createRange();
		if (docSel.parentElement().tagName.toLowerCase() != "input")
			return false;
		oSel = docSel.duplicate();
		oSel.text = "";
		var srcRange = obj.createTextRange();
		oSel.setEndPoint("StartToStart", srcRange);
		var str = oSel.text + inputStr + srcRange.text.substr(oSel.text.length);
		
		return reg.test(str);
	}
	//限制输入法是否允许打开
	if(isChinese == null)
		isChinese = false;
	if(isChinese)
		oObj.style.imeMode = "auto";
	else
		oObj.style.imeMode = "disabled";
		
	//注册事件
	oObj.onkeypress = function()
	{		
		return regInput(this,reg,String.fromCharCode(event.keyCode));//输入时激发
	}
	oObj.onpaste = function()
	{
		return regInput(this,reg,window.clipboardData.getData('Text'));//粘贴时激发
	}
	oObj.ondrop = function()
	{
		return regInput(this,reg,event.dataTransfer.getData('Text'));//拖拽时激发
	}
}

function onlyInputOther(obj,reg){
	regInputRestriction(obj,reg);
}

//text框只能输入数字
function onlyInputNum(obj){
	regInputRestriction(obj,/^[0-9]*$/);
}
//只能是小写字母
function onlyInputLower(obj){
	regInputRestriction(obj,/^[a-z]*$/);
}
//只能是大写字母
function onlyInputUpper(obj){
	regInputRestriction(obj,/^[A-Z]*$/);
}
//只能是字母
function onlyInputLetter(obj){
	regInputRestriction(obj,/^([0-9a-zA-Z])*$/);
}
//只能是字母,数字
function onlyInputNumletter(obj){
	regInputRestriction(obj,/^([0-9a-zA-Z])*$/);
}
//只能是两位小数
function twoDigFloat(obj){
	regInputRestriction(obj,/^\d*\.?\d{0,2}$/);
}
//只能是日期型
function onlyDateNum(obj){
	regInputRestriction(obj,/^\d{1,4}([-\/](\d{1,2}([-\/](\d{1,2})?)?)?)?$/);
}

function checknum(obj){
	if(obj.value==""){
		//obj.value="0";	
	}else{
		if(isNaN(obj.value) || parseInt(obj.value)<0){
			obj.value="";	
		}
		if(obj.value=="-" || /^(-?)\d+$/.test(obj.value)){
		   obj.value = obj.value;
		}else{
			obj.value = obj.value.substring(0,obj.value.length-1);
		}
	}
}

function checkfloatnum(obj){   
	if(obj.value==""){
		//obj.value="0.00";	
	}else{
		if(obj.value=="-" || /^(-?)\d+\.?\d{0,2}$/.test(obj.value)){
		   obj.value = obj.value;
		}else{
			obj.value = obj.value.substring(0,obj.value.length-1);
		}
	}
}

function isMobil(s)
{
	//var patrn=/^[+]{0,1}(/d){1,3}[ ]?([-]?((/d)|[ ]){1,12})+$/;
	var patrn=/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;;
	if (!patrn.exec(s)) return false
	return true
}
//精确计算加法
function accAdd(arg1, arg2) {
	var r1, r2, m, c;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	c = Math.abs(r1 - r2);
	m = Math.pow(10, Math.max(r1, r2));
	if (c > 0) {
		var cm = Math.pow(10, c);
		if (r1 > r2) {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", "")) * cm;
		} else {
			arg1 = Number(arg1.toString().replace(".", "")) * cm;
			arg2 = Number(arg2.toString().replace(".", ""));
		}
	} else {
		arg1 = Number(arg1.toString().replace(".", ""));
		arg2 = Number(arg2.toString().replace(".", ""));
	}
	return (arg1 + arg2) / m;
}
//精确计算减法
function accSub(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}