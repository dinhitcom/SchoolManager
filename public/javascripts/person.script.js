$(document).ready( function () {
    
    function appendData(data, _selector) {
        // console.log(data)
        $.each(data, (key, value) => {
            $(_selector).append(`
                <tr id=${value.PersonID}>
                    <td>${value.PersonID}</td>
                    <td>${value.LastName}</td>
                    <td>${value.FirstName}</td>
                    <td>${value.HireDate}</td>
                    <td>${value.EnrollmentDate}</td>
                    <td>${value.Discriminator}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-update" PersonID="${value.PersonID}" data-toggle='modal' data-target='#updateCourseModal'">Update</button>
                        <button type="button" class="btn btn-danger btn-delete" PersonID="${value.PersonID}">Delete</button>
                    </td>
                </tr>
            `)
        })
    }

    $.ajax({
        url: '/api/person/',
        method: 'GET',
        success: (res) => {
            appendData(res, '#personTableBody')
        }
    })



})