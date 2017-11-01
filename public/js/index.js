/**
 * Created by $ on 2017/11/1.
 */
!function($){
    $('.blog-regester').on('click',function(){
        var _self = $(this);
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            dataType: 'json',
            data:{
                username: _self.find('[name=username]').val(),
                password: _self.find('[name=password]').val(),
                repassword: _self.find('[name=repassword]').val()
            },
            success:function(){

            }
        });
    });
}(jQuery)
