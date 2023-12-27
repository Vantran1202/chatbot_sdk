$(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var currentTab = urlParams.get('tab');
  if (currentTab) {
    const elementTab = document.querySelector('[data-id="#' + currentTab + '"]');
    $('.tab-pane').removeClass('show active');
    $('.nav-tab').removeClass('active');
    $('#' + currentTab).addClass('show active');
    $('#v-pills-embed-panel').addClass('show active');
    $('#v-pills-text-panel').addClass('show active');
    $('#v-pills-line-panel').addClass('show active');
    $(elementTab).addClass('active');
    elementTab.focus();
  }

  $('.nav-tab').on('click', function() {
    $('.nav-tab').removeClass('active');
    $(this).addClass('active');
    $('.tab-pane').removeClass('show active');
    var menuLeftActive = $('.nav-link-left.active').attr('id');
    if (menuLeftActive) {
      $('#' + menuLeftActive + '-panel').addClass('show active')
    }
    var menuTypeActive = $('.nav-link-type.active').attr('id');
    if (menuTypeActive) {
      $('#' + menuTypeActive + '-panel').addClass('show active')
    }
    var menuIntegrateActive = $('.nav-link-integrate.active').attr('id');
    if (menuIntegrateActive) {
      $('#' + menuIntegrateActive + '-panel').addClass('show active')
    }
    var tabId = $(this).attr('data-id');
    $(tabId).addClass('show active');
    //add param tab url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set('tab', tabId.replace("#", ""));
    const modifiedUrl = window.location.pathname + '?' + urlParams.toString();
    window.history.replaceState({}, '', modifiedUrl);
  });

  $('#btn-save-line').on('click', function() {
    $('.text-danger').text('');
    $.LoadingOverlay('show');
    var formData = new FormData();
    var file = $('#provider-icon')[0].files[0];
    if (!file) {
      file = "";
    }
    formData.append('provider_name', $('#provider-name').val());
    formData.append('provider_description', $('#provider-description').val());
    formData.append('provider_icon', file);
    formData.append('project_id', $('#project-id').val());
    formData.append('provider_id', $('#provider-id').val());

    $.ajax({
      type: 'POST',
      url: `http://127.0.0.1:5100/api/v1/line/create`,
      data: formData,
      contentType: false,
      processData: false,
      success: function(res) {
        $.LoadingOverlay('hide');
        window.location.href = `http://127.0.0.1:5100/project/list`;
      },
      error: function(error) {
        error.responseJSON.meta.errors && error.responseJSON.meta.errors.provider_name ?
          $('#error-provider_name').text(error.responseJSON.meta.errors.provider_name[0]) :
          '';
        error.responseJSON.meta.errors && error.responseJSON.meta.errors.provider_description ?
          $('#error-provider_description').text(error.responseJSON.meta.errors.provider_description[
            0]) :
          '';
        error.responseJSON.meta.errors && error.responseJSON.meta.errors.provider_icon ?
          $('#error-provider_icon').text(error.responseJSON.meta.errors.provider_icon[0]) :
          '';
        $.LoadingOverlay('hide');
      }
    });
  });

  $("#ex1").keydown(function(e) {
    if (e.keyCode == 9) {
      e.preventDefault();
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      var currentTab = urlParams.get('tab');
      var newTab = 'tab-1';
      if (currentTab) {
        if (currentTab == 'tab-1') {
          newTab = 'tab-2';
        } else if (currentTab == 'tab-2') {
          newTab = 'tab-3';
        } else if (currentTab == 'tab-3') {
          newTab = 'tab-4';
        } else if (currentTab == 'tab-4') {
          newTab = 'tab-1';
        }
      } else {
        currentTab = 'tab-1';
        newTab = 'tab-2';
      }
      const elementTab = document.querySelector('[data-id="#' + newTab + '"]');
      $('.tab-pane').removeClass('show active');
      $('.nav-tab').removeClass('active');
      $('#' + newTab).addClass('show active');
      $(elementTab).addClass('active');
      var menuLeftActive = $('.nav-link-left.active').attr('id');
      if (menuLeftActive) {
          $('#' + menuLeftActive + '-panel').addClass('show active')
      }
      var menuTypeActive = $('.nav-link-type.active').attr('id');
      if (menuTypeActive) {
          $('#' + menuTypeActive + '-panel').addClass('show active')
      }
      var menuIntegrateActive = $('.nav-link-integrate.active').attr('id');
      if (menuIntegrateActive) {
          $('#' + menuIntegrateActive + '-panel').addClass('show active')
      }
      elementTab.focus();

      urlParams.set('tab', newTab);
      const modifiedUrl = window.location.pathname + '?' + urlParams.toString();
      window.history.replaceState({}, '', modifiedUrl);

    }
  });
});


$(document).ready(function() {
  const tabs = document.querySelectorAll(".nav-link-type");
  const tabContents = document.querySelectorAll(".tab-pane-type");

  tabs.forEach(function(tab, index) {
    tab?.addEventListener("click", function() {
        tabContents.forEach(function(content) {
            content.classList.remove("show", "active");
        });
        tabContents[index].classList.add("show", "active");
        tabs.forEach(function(otherTab) {
            otherTab.classList.remove("active");
        });
        tab.classList.add("active");
    });
  });

  let currentTabIndex = 0;
  const vPillsTabType = document.getElementById('v-pills-tabType');
  vPillsTabType?.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      const tabs = document.querySelectorAll(".nav-link-type");
      const tabContents = document.querySelectorAll(".tab-pane-type");
      tabContents.forEach(function(content) {
          content.classList.remove("show", "active");
      });
      currentTabIndex = (currentTabIndex + 1) % tabs.length;
      if (currentTabIndex === tabs.length) {
          currentTabIndex = 0;
      }
      tabContents[currentTabIndex].classList.add("show", "active");
      tabs.forEach(function(tab, index) {
          tab.classList.remove("active");
      });
      tabs[currentTabIndex].classList.add("active");
    }
  });

  $('#project-content').on('input', checkLength);
});


$(document).on('click', 'i[name="show-form"]', function () {
  var form = $(this).closest('div').next('.form-modify');
  form.removeClass('d-none');
  $(this).addClass('d-none');
  $(this).next('i').removeClass('d-none');
});

$(document).on('click', 'i[name="hide-form"]', function () {
  var form = $(this).closest('div').next('.form-modify');
  form.addClass('d-none');
  $(this).addClass('d-none');
  $(this).prev('i').removeClass('d-none');
});

function checkLength() {
  var totalDetectCrawl = $('#total_detect').html();
  if (totalDetectCrawl && totalDetectCrawl.toString().includes(',')) {
      totalDetectCrawl = totalDetectCrawl.replace(/,/g, '');
  }
  totalDetectCrawl = parseInt(totalDetectCrawl, 10);
  if(isNaN(totalDetectCrawl)) {
      totalDetectCrawl = 0;
  }

  var totalDetectCrawl = parseInt(totalDetectCrawl);

  currentLength = textInputArray.length ? textInputArray.reduce((sum, item) => sum + item.content.length, 0) : 0;
  totalPages = textInputArray.length;
  totalDetectLength = currentLength + totaltextFileLength + totalDetectCrawl;
  $('#total-text-chars').text( totalPages > 0
    ? `${ReplaceNumberWithCommas(totalPages)} Pages text input (${ReplaceNumberWithCommas(currentLength)} chars)`
    : '' );
  $('#total-length').text(ReplaceNumberWithCommas(totalDetectLength));

  if (totalDetectLength >= maxLength) {
    $('#total-text-chars').addClass('text-danger');
    $('#total-length').addClass('text-danger');
    $('#total-file-chars').addClass('text-danger');
    $('#total-link-chars').addClass('text-danger');
    $('.modify-project-btn').attr('disabled', true);
  } else {
    $('#total-text-chars').removeClass('text-danger');
    $('#total-length').removeClass('text-danger');
    $('#total-file-chars').removeClass('text-danger');
    $('#total-link-chars').removeClass('text-danger');
    $('.modify-project-btn').attr('disabled', false);
  }
}
function ReplaceNumberWithCommas(yourNumber) {
  //Seperates the components of the numbers
  var n= yourNumber.toString().split(".");
  //Comma-fies the first part
  n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //Combines the two sections
  return n.join(".");
}
