/**
 * Created by $ on 2017/11/1.
 */
!function($,doc){
    'user staic'
    var userLogin = './api/user/';
    var BLOG = BLOG || {};
    var _ = BLOG;
    _.register = {
        event : function(ele,type,fn){
            $(doc).on(type,ele,fn);
        }
    }

    _.eventsMap = [
        {
            info: '注册或者登陆模块',
            stackClass: '.blog-register-btn',
            type: 'click',
            onFn: loginAndRes
        },
        {
            info: '注册和登陆切换',
            stackClass: '.forget-reg .reg',
            type: 'click',
            onFn: toggleLoginAndRes
        }
    ]

    /*注册句柄事件*/
    function loginAndRes(){
        var status = $(this).attr('blog-status');
        loginAndResFns.status = status;
        var tipText = loginAndResFns.Verifica();
        if(tipText){
            loginAndResFns.tipFn(tipText);
            return ;
        }else{
            var data = loginAndResFns.getFrom();
            loginAndResFns.doPost(data,userLogin + status);
        }
    }

    /*注册和登陆方法*/
    var loginAndResFns = {
        status: 'login',
        regesterBox: $('.login-regester'),
        dataDom:{
            username: '#username',
            password: '#password',
            repassword: '#repassword',
            tips: '.box-input-tips',
            btn: '.blog-register-btn',
            reg: '.forget-reg .reg'
        },
        Verifica: function(){
            var validator = new Validator();
            validator.addRule('username',[{
                strategy: 'isEmpty',
                errorMsg: '用户名不能为空'
            }]);
            validator.addRule('password',[{
                strategy: 'isEmpty',
                errorMsg: '密码名不能为空'
            }]);
            if(loginAndResFns.status === 'resgister'){
                validator.addRule('password repassword',[{//需要传2个dom
                    strategy: 'isSame',
                    errorMsg: '两次输入密码不相同'
                }]);
            }
            return validator.start();
        },
        getFrom: function(){
            var doms = loginAndResFns.dataDom;
            var data = {
                username: $(doms.username).val(),
                password: $(doms.password).val()
            }
            if(loginAndResFns.status === 'resgister'){
                data.repassword = $(doms.repassword).val();
            }
            return data;
        },
        tipFn: function(text){
            var tip = $(loginAndResFns.dataDom.tips);
            tip.text(text);
            setTimeout(function(){
                tip.text('');
            },2000)
        },
        doPost: function(data,url){
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                success: function(data){
                    var code = data.code;
                    if(code){
                        loginAndResFns.doSuccess();
                    }
                    loginAndResFns.tipFn(data.message);
                }
            });
        },
        doSuccess: function(){
            if(loginAndResFns.status === 'login'){
                /*...*/
            }else if(loginAndResFns.status === 'register'){
                this.toggleFn();
            }
        },
        toggleFn: function(){
            var btn = $(loginAndResFns.dataDom.btn);
            var reg = $(loginAndResFns.dataDom.reg);
            var repassword = $(loginAndResFns.dataDom.repassword);
            repassword.toggle();
            if(this.status === 'register'){
                this.status = 'login';
                btn.attr('blog-status','login').text('登陆');
                reg.text('立即注册');
            }else{
                this.status = 'login';
                btn.attr('blog-status','register').text('注册');
                this.status = 'register';
                reg.text('立即登陆');
            }
        }
    }

    function toggleLoginAndRes(){
        loginAndResFns.toggleFn();
    }


    Function.prototype.after = function(fn){
        var self = this;
        return function(){
            self.apply(self);
            var result = fn.apply(this,arguments);
            return result;
        }
    }

    var registerEvent =  BLOG.register.event;
    _.eventsMap.forEach(function(item){
        registerEvent(item.stackClass,item.type,item.onFn);
    });

}(jQuery,document)
