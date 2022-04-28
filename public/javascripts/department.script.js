$(document).ready( function () {
    
    function appendData(data, _selector) {
        // console.log(data)
        $.each(data, (key, value) => {
            $(_selector).append(`
                <tr id=${value.DepartmentID}>
                    <td>${value.DepartmentID}</td>
                    <td>${value.Name}</td>
                    <td>${value.Budget}</td>
                    <td>${value.StartDate}</td>
                    <td>${value.Administrator}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-update" PersonID="${value.PersonID}" data-toggle='modal' data-target='#updateCourseModal'">Update</button>
                        <button type="button" class="btn btn-danger btn-delete" PersonID="${value.PersonID}">Delete</button>
                    </td>
                </tr>
            `)
        })
    }

    $.ajax({
        url: '/api/department/',
        method: 'GET',
        success: (res) => {
            appendData(res, '#departmentTableBody')
        }
    })



})