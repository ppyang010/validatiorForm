
//默认正则表达式集合 	
var regexs={
	email:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
	number:/^\d{1,}$/,
	phone:/^\d{1,11}$/,
	date:/((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/


}
var count=0;
//常用方法
var methods={
	//显示提示信息
	showMsg:function(dom,msgType,num){
		var mssg='';
		var flag=true;
		var label;
		if(this.isEmpty(msgLabel)){
			if ($(dom).next('.va-label').length == '0') {
				$(dom).after('<label class="va-label"></label>');
			}
			label = $(dom).next('.va-label');
		}else{
			label=$(msgLabel);
		}
		

		if(this.isNotEmpty(msgType)){ //需要显示错误信息
			count++;
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
	},
	toShow:function(flag,dom,msgType,num){
		if(Validatior.prototype.required(dom)){
			if(flag) {
				return methods.showMsg(dom,'');
			} else {
				return methods.showMsg(dom,msgType,num);
			}
		}
		return false;
	}

}
//默认提示语
var msg={
	required:'不能为空',
	email:'email格式错误',
	minlength:'长度不能小于x位',
	maxlength:'长度不能大于x位',
	minnum:'不能小于x',
	maxnum:'不能大于x',
	success:'验证成功',
	fail:'验证失败',
	number:'请输入数字',
	phone:'请输入正确的手机号',
	date:'日期格式不正确'
}

var mods={
	'class':['required','validEmail','validNumber','validPhone','validDate'],
	'attr':['minlength','maxlength','minnum','maxnum']
}

function Validatior() {
	this._init.apply(this, arguments);
}

Validatior.prototype = {
	_init: function(options) {
		this.formId = options.formId;
		msgLabel=options.msgLabel;
		this.validation();
	},

	validation: function() {
		var self = this;
		$("#" + this.formId).submit(function() {
			return self.SubmitValid();
		});

		


		mods.class.forEach(function(value, index, array){
			$("."+value).blur(function(){
				self[value](this);
			});
		});


		mods.attr.forEach(function(value, index, array){
			$("["+value+"]").blur(function(){
				self[value](this);
			});
		});




		/*$(".required").blur(function(){
			 self.required(this);
		});


		$(".va-text").blur(function() {
			if(self.required(this)){
				 self.validText(this);
			}
		});


		$(".va-email").blur(function(){
			if(self.required(this)){
				 self.validEmail(this);
			}
		});

		$(".va-number").blur(function() {
			if(self.required(this)){
				 self.validNumber(this);
			}
		});

		$(".va-phone").blur(function() {
			if(self.required(this)){
				 self.validPhone(this);
			}
		});
		$(".va-date").blur(function() {
			if(self.required(this)){
				  self.validDate(this);
			}
		});*/

		

/*		$("[minlength]").blur(function(){
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
		});*/


	
			
	},

	SubmitValid: function() {
		var self = this;
		var flag = true;
		count=0
		try{
			var validinput = $("#" + this.formId + " :input");
			validinput.blur();
	
		}catch(e){
			alert(e);
			flag = false;	//防止异常出现继续提交
		}
		if(count!=0){
			flag=false;
		}
		console.log(flag);

		return flag;
	},
		



	//验证邮箱
	validEmail: function(dom) {
		var email = $.trim($(dom).val());

		var flag=email.match(regexs.email);
		return methods.toShow(flag,dom,'email');
	},
	//验证数字
	validNumber: function(dom) {
		var number = $.trim($(dom).val());
		var flag=number.match(regexs.number);
		return methods.toShow(flag,dom,'number');
	},
	//验证手机号
	validPhone: function(dom) {
		var number = $.trim($(dom).val());
		var flag=number.match(regexs.phone);
		return methods.toShow(flag,dom,'number');
	},

	/**
	 * 验证日期
	 * 支持
		YYYY-MM-DD 
		YYYY/MM/DD 
		YYYY_MM_DD 
		YYYY.MM.DD的形式
	 */
	validDate:function(dom){
		var str = $.trim($(dom).val());
		var flag=str.match(regexs.date);
		return methods.toShow(flag,dom,'date');

	},
	//验证非空
	required:function(dom){
		
		var str=$.trim($(dom).val());
		if(str){
			return methods.showMsg(dom,'');
		}else{
			return methods.showMsg(dom,'required');
		}
	},




	//最小长度 >=
	minlength:function(dom){
		var min=dom.getAttribute("minlength");
		var str=$.trim($(dom).val());
		var flag=(str.length>=min);
		return methods.toShow(flag,dom,'minlength',min);
	},

	//最大长度 <=
	maxlength:function(dom){
		var num=dom.getAttribute("maxlength");
		var str=$.trim($(dom).val());
		
		var flag=(str.length<=num);
		return methods.toShow(flag,dom,'maxlength',num);
	},
	//最小值
	minnum:function(dom){
		var num=dom.getAttribute("minnum");
		var str=$.trim($(dom).val());
		var flag=(+str >= +num);
		return methods.toShow(flag,dom,'minnum',num);
	},
	//最大值
	maxnum:function(dom){
		var num=dom.getAttribute("maxnum");
		var str=$.trim($(dom).val());
		var flag=(+str <= +num);
		return methods.toShow(flag,dom,'maxnum',num);

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