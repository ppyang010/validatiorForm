# 表单验证组件
##前置条件
请先导入jquery文件<br>
在导入本组件validatior.js
##使用介绍
###初始化
```javascript
var validatior = new Validatior({
	"formId": "form1",						//必填 form表单id 
	defaultTab:true, 						// 可选属性 默然为true 是否使用默认的消息显示方式  true使用默然消息显示方式 false不使用默认消息显示  
	callBackFun:function(dom,flag,type,msg){// 可选属性 回调函数 返回dom 验证是否通过 未通过的验证类型 错误提示语句  
		console.log(arguments);
	}
});
```
###验证功能
* 1.类验证
在input标签中的class属性中添加指定值<br>
类验证和属性验证可以自由组合
例：
```html
	<input type="text" class="validEmail"> <!-- 验证邮箱格式 -->
```
	* 1.1类验证种类
		* required 验证输入框不能为空
		* validEmail 验证邮箱格式 包含required验证
		* validNumber 验证输入值为数字 包含required验证
		* validPhone 验证输入值是否为正确的手机号码 包含required验证 validNumber验证
		* validDate 验证日期格式是否正确 包含required验证 日期格式支持以下几种形式<br>
			YYYY-MM-DD <br>
			YYYY/MM/DD <br>
			YYYY_MM_DD <br>
			YYYY.MM.DD<br>
* 2.属性验证
在input标签中的添加新的指定属性及值
类验证和属性验证可以自由组合
例
```html
	<input type="text" name="qq" class="validNumber"  maxnum="100" />
```
	* 2.1属性验证种类
		* minlength="x" 验证最小长度为x  
		* maxlength="y" 验证最大长度为y
		* minnum='x' 验证最小值为x  
		* maxnum='x' 验证最大值为x  
* 3.表单提交
表单提交请使用下列两种方式提交,暂不支持其他方式提交验证
```html
	<input type="submit" value="提交" />
	<button type="submit">提交</button>	
```

* 4.演示demo
[演示demo](http://htmlpreview.github.io/?https://github.com/ppyang010/validatiorForm/blob/master/index.html)