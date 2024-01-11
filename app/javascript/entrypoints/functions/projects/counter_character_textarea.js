$(function() {
  $('.js-content-training').on('keyup', function() {
    const $this    = $(this)
    const value    = $this.val().length
    const limitted = parseInt($this.data('limitted-character-counts'))
    const $total   = $('.js-total-character')

    if (value > limitted) {
      $total.addClass('text-danger')
    } else {
      $total.removeClass('text-danger')
    }

    $total.text(`${value} / ${window.formatNumberCommas(limitted)}`)
    $('#js-input-total-character').val(value)
  })
})
