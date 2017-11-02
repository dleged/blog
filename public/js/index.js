/**
 * Created by $ on 2017/11/1.
 */
!function($){
    $('.blog-regester-btn').on('click',function(){
        var regesterBox = $('.login-regester');
        $.ajax({
            type: 'post',
            url: './api/user/register',
            data:{
                username: regesterBox.find('[name="username"]').val(),
                password: regesterBox.find('[name="password"]').val(),
                repassword: regesterBox.find('[name="repassword"]').val()
            },
            success:function(){
            }
        });
    });
}(jQuery)
