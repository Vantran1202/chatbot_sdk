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

function formatNumberCommas(yourNumber) {
  //Seperates the components of the numbers
  var n= yourNumber.toString().split(".");
  //Comma-fies the first part
  n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //Combines the two sections
  return n.join(".");
}

window.formatNumberCommas = formatNumberCommas
