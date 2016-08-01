# 表单验证组件
##前置条件
请先导入jquery文件<br>
在导入本组件validatior.js
##使用介绍
###初始化
```javascript
var validatior = new Validatior({
	"formId": "form1",						//form表单id
	defaultTab:true, 						//是否使用默认的消息显示方式
	callBackFun:function(dom,flag,type,msg){// 回调函数 返回dom 验证是否通过 未通过的验证类型 错误提示语句
		console.log(arguments);
	}
});
```


回调函数的参数列表为 dom（当前控件） 验证是否通过 未通过的验证类型 错误提示语句