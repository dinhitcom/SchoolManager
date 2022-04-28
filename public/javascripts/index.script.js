// const { id } = require("tedious/lib/data-types/null");

$(document).ready( function () {
    function appendData(data, _selector) {
        // console.log(data)
        $.each(data, (key, value) => {
            $('#courseTableBody').append(`
                <tr id=${value.CourseID}>
                    <td>${value.CourseID}</td>
                    <td>${value.Title}</td>
                    <td>${value.Credits}</td>
                    <td>${value.Department}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-update" CourseID="${value.CourseID}" data-toggle='modal' data-target='#updateCourseModal'">Update</button>
                        <button type="button" class="btn btn-danger btn-delete" CourseID="${value.CourseID}">Delete</button>
                    </td>
                </tr>
            `)
        })

    }
    $.ajax({
        url: '/api/course/',
        method: 'GET',
        success: appendData
    })
    // departments = undefined
    $.ajax({
        url: '/api/department/',
        method: 'GET',
        success: (data) => {
            // departments = data
            $(`select[name='DepartmentID']`).html('');
            $.each(data, (key, value) => {
                // departments.push(value)
                $(`select[name='DepartmentID']`).append(
                    `<option value=${value.DepartmentID}>${value.Name}</option>`
                )
            })
        }
    })
    // console.log(departments)
    
        $('#courseTableBody').on('click', '.btn-delete', (e) => {
            let result = confirm("Are you sure to delete this row?");
            // console.log($(e.target).attr('courseid'))
            if (result) {
                // let id = $(this).attr('courseid');
                let id = $(e.target).attr('courseid');
                console.log(id)
                // console.log('DAYY LA ID ', id.attr('courseid'))
                let $ele = $(e.target).parent().parent();
                console.log($ele)
                $.ajax({
                    type:'DELETE',
                    url:'/api/course?CourseID='+id,
                    success: function(response){
                        if(response=="success"){
                            $ele.fadeOut().remove();
                        } else {
                            alert("Operation failed")
                        }
                    }
                })    
            }    
        })

    $('#courseTableBody').on('click', '.btn-update', (e) => {
        let id = $(e.target).attr('courseid');
        $.ajax({
            type: 'GET',
            url:'/api/course/'+id,
            success: (res) => {
                $('#CourseID').val(res.CourseID)
                $('#Title').val(res.Title);
                $('#Credits').val(res.Credits);
                $('#DepartmentID').val(res.DepartmentID);

            }
        })
    })

    $('#updateCourse-btn').click(() => {
        $id = $('#CourseID').val()
        title = $('#Title').val()
        credits = $('#Credits').val()
        department = $('#DepartmentID').val()
        $.ajax({
            type: 'PUT',
            url: '/api/course/',
            data: {
                CourseID: $id,
                Title: title,
                Credits: credits,
                DepartmentID: department
            },
            success: (res) => {
                if (res==='success') {
                    location.reload()
                }
            }
        })
    })
} );