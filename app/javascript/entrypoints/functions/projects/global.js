function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $('#icon-copy').removeClass('ti-folders').addClass('ti-checks');
  $temp.remove();

  setTimeout(() => {
    $('#icon-copy').removeClass('ti-checks').addClass('ti-folders');
  }, 2000);
}

window.copyToClipboard = copyToClipboard
