console.log('Nhớ vừa xem video vừa thực hành - Chúc các bạn thành công');
    let URL='http://localhost:3000/api/v1/items'
    function callAjax(URL,type,data=null,contentType=null) {
        $.ajax({
        url:`${URL}`, 
        type: type,
        data: JSON.stringify(data),
        dataType: 'json', // type of response data    // timeout milliseconds
        contentType:contentType,
        success: function (response) { 
            let xhtml=''
            let items=response.data
            items.forEach((element,index) => {    
                let btnStatus='success'
                if(element.level=='medium') {
                     btnStatus='warning'
                }
                else if(element.level=='high')
                    btnStatus='danger'
                xhtml +=`<tr>
                <td>${index+1}</th>
                <td>${element.task}</td>
                <td><span class="badge bg-${btnStatus}">${element.level}</span></td>
                <td>
                    <button class="btn btn-warning btn-edit" onclick="editOne('${element.id}','${element.task}','${element.level}')">Edit</button>
                    <button class="btn btn-danger btn-delete" id=${element.id} onclick="deleteOne('${element.id}')">Delete</button>
                </td>
            </tr>`
            }
            );
            $('#area-list-task').html(xhtml)
        },
        error: function (jqXhr, textStatus, errorMessage) { // error callback 
            $('p').append('Error: ' + errorMessage);
        }
    });
    }
    callAjax(URL, 'GET')
    ///btn-ADD
    $('#btn-toggle-form').click(() => {
        $('#area-form').removeClass('d-none')
    })
    ///btn-Cancel
    $('#btn-cancel').click(() => {
        $('#area-form').addClass('d-none')
    })
    ///btn-Submit
    $('#btn-submit').click(function(){
        let taskName = $('#input-name').val()
        let taskLevel = $('#input-level').val()
        ///POST
        if($(this).text()!=='Save') callAjax(URL + '/add', 'POST', { task: taskName, level: taskLevel }, "application/json")
        
        
    })
    function deleteOne(id) {
        callAjax(URL+'/delete/'+ id,'DELETE')
    }
    function editOne(id,task,level) {
        $('#area-form').removeClass('d-none')
        $('#btn-submit').text('Save')
        $('#input-name').val(task)
        $('#input-level').val(level)
        
        $('#btn-submit').click(() => {
            callAjax(URL+'/update/'+ id,'PUT',{ task: $('#input-name').val(), level: $('#input-level').val() },"application/json")
    })
}






