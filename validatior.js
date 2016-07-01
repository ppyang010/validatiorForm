
//正则表达式集合
var regexs={
	email:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
	number:/^[0-9]*$/,

}
//方法
var methods={

}
//提示语
var msg={
	required:'不能为空',
	email:'email格式错误',
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

		$(".va-text").blur(function() {
			self.validText(this);
		});

		$(".va-email").blur(function() {
			self.validEmail(this);
		});

		$(".va-number").blur(function() {
			self.validNumber(this);
		});

		$(".va-content").blur(function() {
			self.validContent(this);
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
				} else if (attr.indexOf("va-content") >= 0) {
					self.validContent(dqinput);
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

	validEmail: function(dom) {
		var emailLabel = $(dom).next('.va-label');
		if (emailLabel.length == '0') {
			$(dom).after('<label class="va-label"></label>');
		}
		emailLabel = $(dom).next('.va-label');

		var email = $.trim($(dom).val());
		if (email) {
			if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
				emailLabel.html("格式不正确！请重新输入");
			} else {
				emailLabel.html('');
			}
		} else {
			emailLabel.html('请填写邮箱地址');
		}
	},

	validNumber: function(dom) {
		var numberLabel = $(dom).next('.va-label');
		if (numberLabel.length == '0') {
			$(dom).after('<label class="va-label"></label>');
		}
		numberLabel = $(dom).next('.va-label');

		var number = $.trim($(dom).val());
		if (number) {
			if(!number.match(/^[0-9]*$/)) {
				numberLabel.html("格式不正确！请重新输入");
			} else {
				numberLabel.html('');
			}
		} else {
			numberLabel.html('请填写数字');
		}
	},

	validContent: function(dom) {
		var contentLabel = $(dom).next('.va-label');
		if (contentLabel.length == '0') {
			$(dom).after('<label class="va-label"></label>');
		}
		contentLabel = $(dom).next('.va-label');

		var content = $.trim($(dom).val());
		if (content) {
			contentLabel.html('');
		} else {
			contentLabel.html('请填写内容');
		}
	},

	required:function(dom){
		var label = $(dom).next('.va-label');
		if (label.length == '0') {
			$(dom).after('<label class="va-label"></label>');
		}
		var str=$.trim($(dom).val());
		if(str){
			label.html('');
		}else{
			label.html('不能为空');
		}
	}
};