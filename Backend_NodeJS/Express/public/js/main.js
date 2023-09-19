
$(document).ready( function() {
    changeStatus =(status,id,link) => {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
        $.ajax({
            url:  link,
            type: 'GET',
            success: function (result) {
                $('body').html(result)
                toastr.success("Thay đổi trạng thái thành công","Success",toastr.options)
            },
            error: function(error){
                toastr.error("Thay đổi trạng thái không thành công","Error",toastr.options)
            }
        })
}
})

