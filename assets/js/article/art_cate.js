$(function () {
    initArtCateList()
    //获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    //为添加类别按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html(),
        })
    })

    //通过代理的形式，为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }

                initArtCateList()
                layui.layer.msg('新增文章类别成功！')
                layui.layer.close(indexAdd);
            }
        })
    })

    //通过代理的形式，为btn-edit按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
        })

        var id = $(this).attr('data-id')
        //发起请求获取对应的分类数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                layui.form.val('form-edit', res.data)
            }
        })
    })

    //通过代理的形式，为form-edit表单绑定submit事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }

                initArtCateList()
                layui.layer.msg('修改文章类别成功！')
                layui.layer.close(indexEdit);
            }
        })
    })
    //通过代理的形式，为btn-delete按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function (e) {
        e.preventDefault()
        var id = $(this).attr('data-id')
        var strName = $(this).attr('data-name')
        layui.layer.confirm('确定删除 “' + strName + '” 的分类吗?', { icon: 3, title: '提示' }, function (index) {
            //发起请求获取对应的分类数据
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除失败！')
                    }

                    initArtCateList()
                    layui.layer.msg('删除成功！')
                }
            })
            //关闭 confirm 弹出框
            layer.close(index);
        })

    })
})
