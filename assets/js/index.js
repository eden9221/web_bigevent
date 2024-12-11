$(function () {
    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //清空本地存储中的token
            localStorage.removeItem('token')
            //重新跳转到登录页面
            location.href = '/login.html'

            //关闭 confirm 弹出框
            layer.close(index);
        });
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //heads就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //用于渲染用户的头像
            renderAvater(res.data)
        },
    })
}

function renderAvater(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;' + name)
    if (user.user_pic !== null) {
        //用头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        //用文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}