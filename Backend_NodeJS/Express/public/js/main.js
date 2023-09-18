
    function changeStatus(status,id,link) {
            $(document).ready(function(){
                $.ajax({
                    url: "http://localhost:5000/" + link,
                    type: 'GET',
                    success: function (result) {
                        $('body').html(result)
                    }
                })
       }) }
