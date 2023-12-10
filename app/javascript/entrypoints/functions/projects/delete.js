$(document).on('click', 'a[name="delete-project"]', function() {
  var projectName = $(this).data("project-name");
  var projectId = $(this).data("delete-id");
  // var deleteUrl = deleteProjectUrl.replace('id', projectId);
  var deleteUrl = ''

  Swal.fire({
      icon: 'warning',
      html: `<div class="w-full">
                  <p class="fs-5 fw-semibold">Enter "<span class="text-primary">${projectName}</span>" to confirm deletion.</p>
                  <input id="project-name-confirm" type="text" class="form-control mt-1"/>
                  <p class="fs-3 text-warning mt-3">You won't be able to revert this!</p>
             </div>`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      showCancelButton: true,
      showConfirmButton: true,
      reverseButtons: true,
      customClass: {
        cancelButton: 'mt-2 btn btn-dark swal-button-container me-2',
        confirmButton: 'mt-2 btn btn-danger swal-button-container',
        icon: 'fs-1'
      },
      preConfirm: () => {
          var projectNameConfirm = $('#project-name-confirm').val();
          $.LoadingOverlay('show');
          if (projectNameConfirm === projectName) {
            return fetch(deleteUrl, {
              method: 'DELETE',
              headers: {
                  'ContentType': 'application/json'
              }
            })
            .then(response => {
              $.LoadingOverlay('hide');
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              $.LoadingOverlay('hide');
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
          } else if (projectNameConfirm.trim() === "") {
            $.LoadingOverlay('hide');
            Swal.showValidationMessage(
              `Please enter project name to confirm deletion.`
            )
          } else {
            $.LoadingOverlay('hide');
            Swal.showValidationMessage(
              `The project name entered is not correct.`
            )
          }
        },
      allowOutsideClick: () => !Swal.isLoading(),
      allowOutsideClick: false,
      allowEscapeKey: false,
      backdrop: true,
      buttonsStyling: false,

    }).then(function(result) {
      if (result.value) {
          Swal.fire({
              html: `<span class="fw-semibold fs-4">Deleted</span> <p class="fs-2 mt-3"><span class="text-success"> ${projectName} </span> project has been deleted!</p>
                      <i class="ti ti-checks fs-6 text-success"></i>`,
              customClass: {
                confirmButton: 'd-none'
              },
              buttonsStyling: false
          });
          window.location.href = projectIndexUrl;
      }
  });
});
