$(function() {
  $('.js-nav-content-type').on('click', function() {
    const contentType = $(this).data('content-type')
    $('#js-input-content-type').val(contentType)
  })
})
