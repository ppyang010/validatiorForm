# 表单验证组件
##前置条件
请先导入jquery文件<br>
在导入本组件validatior.js
##使用介绍
###初始化
```javascript
var validatior = new Validatior({
	"formId": "form1",						//form表单id 必填
	defaultTab:true, 						//是否使用默认的消息显示方式  true使用默然消息显示方式 false不使用默认消息显示  可选属性 默然为true
	callBackFun:function(dom,flag,type,msg){// 回调函数 返回dom 验证是否通过 未通过的验证类型 错误提示语句  可选属性
		console.log(arguments);
	}
});
```
###验证功能
*1.类验证
*2.属性验证

