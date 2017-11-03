/**
 * Created by $ on 2017/11/1.
 */
!function($,doc){
    'user staic'
    var userLogin = './api/user/login';
    var BLOG = BLOG || {};
    BLOG.eventCache = [];
    BLOG.register = {
        event : function(ele,type,fn){
            $(doc).on(type,ele,fn);
        }
    }

    BLOG.eventsMap = [
        {
            info: '注册',
            stackClass: '.blog-regester-btn',
            type: 'click',
            onFn: doRegisterPost
        }
    ]

    /*注册句柄事件*/
    function doRegisterPost(){
        var regesterBox = $('.login-regester');
        var tipText = registerFn.Verifica();
        if(tipText){
            registerFn.tipFn(tipText);
            return ;
        }else{
            var data = {
                username: regesterBox.find('#username').val(),
                password: regesterBox.find('#password').val(),
                repassword: regesterBox.find('#repassword').val()
            }
            registerFn.doPost(data,userLogin);
        }
    }

    /*注册和登陆方法*/
    var registerFn = {
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
            validator.addRule('password repassword',[{//需要传2个dom
                strategy: 'isSame',
                errorMsg: '两次输入密码不相同'
            }]);
            return validator.start();
        },
        tipFn: function(text){
            console.log(text);
        },
        doPost: function(data,url){
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                success: function(data){
                    registerFn.tipFn(data.message);
                }
            });
        }
    }


    var registerEvent =  BLOG.register.event;
    BLOG.eventsMap.forEach(function(item){
        registerEvent(item.stackClass,item.type,item.onFn);
    });

}(jQuery,document)
