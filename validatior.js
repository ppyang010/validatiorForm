
//正则表达式集合
var regexs={
	email:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
	number:/^\d{1,}$/

}
//方法
var methods={
	//显示提示信息
	showMsg:function(dom,msgType,num){
		var mssg='';
		var flag=true;
		if ($(dom).next('.va-label').length == '0') {
			$(dom).after('<label class="va-label"></label>');
		}
		var label = $(dom).next('.va-label');
		if(this.isNotEmpty(msgType)){ //需要显示错误信息
			console.log(msg[msgType]);
			if(!this.isNotEmpty(label.html())){
				if(this.isNotEmpty(num)){
					mssg=msg[msgType].replace('x',num);
				}else{
					mssg=msg[msgType];
				}
				
			}else{
				mssg=label.html();
			}
			flag=false;
		}else{   //不需要显示错误信息
			mssg='';
		}
		label.html(mssg);
		return flag;
	},
	isNotEmpty:function (str) {
		if(str==null || str == ''){
			return false;
		}else{
			return true;
		}
	},
	isEmpty:function(str){
		if(str==null || str == ''){
			return true;
		}else{
			return false;
		}
	}

}
//提示语
var msg={
	required:'不能为空',
	email:'email格式错误',
	minlength:'长度不能小于x位',
	maxlength:'长度不能大于x位',
	minnum:'不能小于x',
	maxnum:'不能大于x',
	success:'验证成功',
	fail:'验证失败',
	number:'请输入数字'
}


function Validatior() {
	this._init.apply(this, arguments);
}

Validatior.prototype = {
	_init: function(options) {
		this.formId = options.formId;
		this.validation();
	},

	validation: function() {
		var self = this;
		$("#" + this.formId).submit(function() {
			return self.SubmitValid();
		});


		$(".required").blur(function(){
			self.required(this);
		});


		$(".va-text").blur(function() {
			self.validText(this);
		});


		$(".va-email").blur(function(){
			self.validEmail(this);
		});

		$(".va-number").blur(function() {
			console.log("number");
			self.validNumber(this);
		});

		

		$("[minlength]").blur(function(){
			console.log("minlength");
			self.minlength(this);
		});

		$("[maxlength]").blur(function(){
			self.maxlength(this);
		});
		$("[minnum]").blur(function(){
			self.minnum(this);
		});
		$("[maxnum]").blur(function(){
			self.maxnum(this);
		});


	
			
	},

	SubmitValid: function() {
		var self = this;
		var temp = '';
		try{
			var validinput = $("#" + this.formId + " :input");
			var j = 0;
			validinput.each(function(){
				var attr = $(this).attr("class");
				var dqinput = validinput.eq(j++);		//当前input

				if (attr.indexOf("va-text") >= 0) {
					self.validText(dqinput);
					temp += dqinput.next('.va-label').html();
				} else if (attr.indexOf("va-email") >= 0) {
					self.validEmail(dqinput);
					temp += dqinput.next('.va-label').html();
				} else if (attr.indexOf("va-number") >= 0) {
					self.validNumber(dqinput);
					temp += dqinput.next('.va-label').html();
				}

			});
		}catch(e){
			alert(e);
			$temp = "false";	//防止异常出现继续提交
		}

		if ($.trim(temp)) {
			return false;
		}

		return true;
	},

	validText: function(dom) {
		var textLabel = $(dom).next('.va-label');
		if (textLabel.length == '0') {
			$(dom).after('<label class="va-label"></label>');
		}
		textLabel = $(dom).next('.va-label');

		var text = $.trim($(dom).val());
		if (text) {
			textLabel.html('');
		} else {
			textLabel.html('请填写信息');
		}
	},
	//验证邮箱
	validEmail: function(dom) {
		var email = $.trim($(dom).val());
		if(!email.match(regexs.email)) {
			methods.showMsg(dom,'email');
		} else {
			methods.showMsg(dom);
		}
	},
	//验证数字
	validNumber: function(dom) {
		var number = $.trim($(dom).val());
		if(!number.match(regexs.number)) {
			methods.showMsg(dom,'number');
		} else {
			methods.showMsg(dom,'');
		}
	},



	required:function(dom){
		
		var str=$.trim($(dom).val());
		if(str){
			methods.showMsg(dom,'');
		}else{
			methods.showMsg(dom,'required');
		}
	},
	//最小长度 >=
	minlength:function(dom){
		var min=dom.getAttribute("minlength");
		var str=$.trim($(dom).val());

		console.log(min);
		 if(str.length>=min){
		 	methods.showMsg(dom,'');
		 }else{
		 	methods.showMsg(dom,'minlength',min);
		 }
	},

	//最大长度 <=
	maxlength:function(dom){
		var num=dom.getAttribute("maxlength");
		var str=$.trim($(dom).val());
		if(str.length<=num){
			methods.showMsg(dom,'');
		}else{
			methods.showMsg(dom,'maxlength',num);
		}
	},
	minnum:function(dom){
		var num=dom.getAttribute("minnum");
		var str=$.trim($(dom).val());
		if(str.length<=num){
			methods.showMsg(dom,'');
		}else{
			methods.showMsg(dom,'minnum',num);
		}
	}
	//远程验证 功能未进行验证
/*	remote:function(dom){
		var url=dom.getAttribute("remote");
		var param=$.trim($(dom).val());
		if(methods.isNotEmpty(url)){
			$.post(url,{param :param},function(data) {
				if(data){
					return methods.showMsg(dom,'success');
				}else{
					return methods.showMsg(dom,'fail');
				}
			},'json');
		}eles{
			return methods.showMsg(dom,'required');
		}
	}*/

};