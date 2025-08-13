// JavaScript Document
 //==================函数列表=========================
 //写入Cookie PostCookie("Softview=Yes");
 function PostCookie(cookieName)
 {
  var expdate = new Date();
   expdate.setTime(expdate.getTime() + 604800000);
   document.cookie=cookieName+";expires="+expdate.toGMTString()+";path = /;";
 }

//读取Cookies值
function getCookie(cookieName) 
{ 
 var cookieString =document.cookie; 
 var start = cookieString.indexOf(cookieName + '='); 
 // 加上等号的原因是避免在某些 Cookie 的值里有 
 // 与 cookieName 一样的字符串。 
 if (start == -1) // 找不到
 return null; 
 start += cookieName.length + 1; 
 var end = cookieString.indexOf(';', start); 
 if (end == -1) 
 return unescape(cookieString.substring(start));
 return unescape(cookieString.substring(start, end)); 
 
}

 String.prototype.Trim=function(){ return  this.replace(/(^\s+)|(\s+$)/g,"");}
 String.prototype.Ltrim = function(){ return  this.replace(/(^\s+)/g,   "");}
 String.prototype.Rtrim = function() { return this.replace(/(\s+$)/g, "");}

//================= AJAX 提交表单 ====================
var http_request = true;
//评论页读取顶
function BindDing(objtext,id,CommentTpye)
{
	var obj=$(objtext)
	if (obj.length==0) return false;
	for (var i=0 ;i<obj.length;i++)
	{
		var sobj = obj.eq(i).find("a").eq(0);
		var spanobj = obj.eq(i).find("span");
		sobj.click(function (){ 
			SendDing($(this).parent().attr("id"));
			var  spanobj = $(this).parent().find("span")
			spanobj.html(parseInt(spanobj.html())+1);
			$(this).unbind();
			$(this).attr("title","您已经顶过了");
		});
	}
	ReadDing(objtext,id,CommentTpye)	
}
function SendDing(id)
{}

function ReadDing(objtext,id,CommentTpye)
{}

function ListDing(objtext,msg) //显示顶的数据
{
	//alert(msg)
	var obj=$(objtext)
	var dataObj=eval("("+msg+")");//转换为json对象
	 for (var i=0 ;i<obj.length;i++)
	 { 
	   var spanobj = obj.eq(i).find("span")
	   var sid = obj.eq(i).attr("id");
	   for (var y=0;y < dataObj.ID.length;y++)
	   {
		   if (sid == dataObj.ID[y])
		   {
			 spanobj.html(dataObj.Ding[y]);
			 break;
		   }
	   }
	}	
}

function SendVote(id,sobj,ref)
{
	var obj = $(sobj +" input");
	var temp='';
	for(var i=0; i<obj.length; i++)
	{
		if (obj.eq(i).attr("checked")==true)
		{
			if (temp !='') temp +=',';
			temp +=  i;
		}
		obj.eq(i).attr("checked",false);
	}
	
	if (temp=='') {
		alert('请选择一个项目!!')
		return;
	}
	
	var url="action=21&id="+id+"&v="+ escape(temp);
	$.ajax({});
}

//单个投票ＪＱ支持
function OneVote(id,ni,ref)
{
  var url="action=21&id="+id+"&v="+ escape(ni);
   $.ajax({});
}


//读取投票数据 ＪＱ支持
function ReadVote(id,ref)
{
  var url="action=21&id="+id+"&v=";
   $.ajax({});
}


//设置控制的显示的数值
//sobj　JQ选择器 msg 数据 , iatt 是否百分比 ,att CSS Name
//列子 Listvote('#vote b',msg,true,'') 
//	   Listvote('#vote em img',msg,false,'width') 
function Listvote(sobj,msg,iatt,att) //显示顶的数据
{
	//alert(msg)
	var obj=$(sobj)
	var dataObj=eval("("+msg+")");//转换为json对象
	var PNum=0
	 
	for (var i=0;i<obj.length; i++)
	{
		if (iatt)
		{
			obj.eq(i).html(dataObj.Num[i]);  
		}else
		{
			PNum =  (dataObj.Num[i] /dataObj.NumBer *100).toFixed(1);
			if (att=='')
			{
			 obj.eq(i).html(PNum + "%" ); 
			}else
			{
			  obj.eq(i).css(att, PNum + '%');
			 // alert(obj.eq(i).attr(att))  
			}
		}
	}	  
}

//选项卡
function onSelect(obj,ch)
{
var parentNodeObj= obj.parentNode;
var s=0;
for(i=0;i<parentNodeObj.childNodes.length;i++)
{
// alert("第" +i +"次")
if (parentNodeObj.childNodes[i].nodeName=="#text")
{
continue;  
}
parentNodeObj.childNodes[i].className="tab_1";
var newObj=document.getElementById(ch + "_" + s);

if(newObj!=null)
{
newObj.style.display='none';
if(parentNodeObj.childNodes[i]==obj)
{
newObj.style.display='';	
}
}
s +=1;
}
obj.className="tab_2";
}


//提交表单软件下载评论
var isSubmit=false;  //是否提交了评论
function submitComment()
{
 if (isSubmit)
 {
	 alert("您的评论已经提交，请不要重复提交谢谢!");
	//	 return;
 }
 
 var Form=document.forms["cmtForm"];
 if (Form==null) Form=document.forms["cmtForm"];

 var Content =Form.cmtMsg;
 if (Content==null) Content=Form.cmtMsg;
 
 var ContentText = Content.value.Trim();
 
 if(ContentText=="" )
 {
	alert("评论的内容不能为空！");
	Content.focus();
	return false;
 }
 
 if( ContentText.length<10 || ContentText.length>500 )
 {
	alert("评论的内容不能小于10 大于 500 个字符！");
	Content.focus();
	return false;
 }
 
 var temp = ContentText;
 var re = /\{.+?\}/g;        // 创建正则表达式模式
 temp = temp.replace(re,"");
 if (temp.Trim()=="")
 {
	alert("对不起不能发表纯表情! 感谢您的支持！"); 
	Content.focus();
	return false;
 }
 
 var ly_id
	 ly_id = Form.softID;
	 if (ly_id==null) ly_id = Form.softID;
	 
 var CommentTpye,CommentTpyeId
	 CommentTpye =Form.CommentTpye;
	 if (CommentTpye==null) 
	 {
		 CommentTpyeId =0;
	 }else
	 {
		CommentTpyeId = CommentTpye.value; 
	 }
 var Url="content=" + escape(ContentText) + "&SoftID=" +  escape(ly_id.value) + "&Action=2&CommentTpye="+CommentTpyeId;
$.ajax({});
isSubmit = true;
}

//将提交的评论显示到页面上
function ViewComment(text)
{
  var d = new Date(); 
  var sd=d.toLocaleString();
  
  var Temp ="<dt><span><i>顶楼 </i><b >您发表的评论</b> </span><em>发表于: <font color='red'> "+ sd +" </font> </em></dt>"
  Temp +="<dd> "+ text +" <p></p></dd>"
  
  $("#comment_0 dl").append(Temp);
}

//提交评论表单得到焦点的时候显示验证码
function CommentOnblur()
{
 document.getElementById("viewGetCode").style.display="";
}
//按 CTRL+回车 提交表单
function submitForm()
{
  if(window.event.ctrlKey && window.event.keyCode==13)
  {
	//alert("点击了");
	submitComment();
	return true;
  }
}


//====留言专用===============
function countLyNum(obj,ttextObj) //统计留言字符数
{
	//alert('sss');
	var textObj=document.getElementById(ttextObj);
	var num=obj.value.length;
	if(num>500)
	{
		alert("只允许输入500个字符，超过部份将自动删除");
		obj.value = obj.value.substr(1,500);
	}
	if (textObj!=null)
	{
		textObj.innerHTML=num;
	}
}

//-----------------------------------------

//盖楼
var AllDownAction={
	init: function() {
        this.ReviewisReply(); //评论回复
		//this.HideReply();  //没有评论的不显示
    },
	ReviewisReply:function(){ 
		$("a[pid]").click(function(){
			$("#cmtMsg").val("[quote]"+$(this).attr("pid")+"[/quote]").focus();
			//alert($(this).attr("pid"))
			return false;		
		})
	} ,
	HideReply:function(){	
		if($("#comment_0").length <=0){return false}
 		$("#comment_0,#comment_1").each(function(){
			if($(this).find("dt").length==0){
				$(this).hide();
			}
		 })		 
	}
}
$(function(){
	AllDownAction.init();	
	if($("#comment_0 dl dt").length==0)$("#comment_0").hide();
	if($("#comment_1 dl dt").length==0)$("#comment_1").hide();

	$('#cmtMsg').focus(function(){if($(this).val()=='我来说两句...')$(this).val('');});
	$('#cmtMsg').blur(function(){if($(this).val()=='')$(this).val('我来说两句...');});

	if($("input[name='SoftID']").length>0) BindDing("#comment-list dl > dd > p",$("input[name='SoftID']").val(),$("input[name='CommentTpye']").val());
});
$("#cmtForm").submit(function(){
	submitComment();
	return false;
});
