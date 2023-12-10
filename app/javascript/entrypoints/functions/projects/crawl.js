$(function () {
  const progressBar = document.getElementById('progress_bar');
  const progressText = document.getElementById('progress_text');
  const totalDetect = document.getElementById('total_detect');
  getTotalLink();
  $('#btn_crawl').on('click', async function () {
      const parentUrl = $('#website').val();
      if (!parentUrl || !isHTTPSURL(parentUrl)) {
          return;
      }
      const parentDomain = new URL(parentUrl).hostname;
      $('#progress_container').removeClass('d-none');
      $('#btn_crawl').addClass('disabled');
      $('#include_links').addClass('disabled');
      let totalUrls = 1;
      let completedUrls = 0;
      const proxyUrl = proxy + '?url=' + encodeURIComponent(parentUrl);

      try {
          const response = await fetch(proxyUrl, {
              method: "GET",
              mode: "cors",
          });
          const data = await response.text();

          //start progress
          progressBar.style.width = '0%';
          progressText.innerHTML = '0%';
          const textData = [];
          const urlsInSameDomain = [];

          $(data).find('p, span, strong, h1, h2, h3, h4, h5, h6').each(function() {
              textData.push($(this).text());
          });

          if (textData) {
              var textDataStr = textData.join(' ').trim();
              var total = totalDetect.innerHTML;
              if (total && total.toString().includes(',')) {
                  total = total.replace(/,/g, '');
              }
              total = parseInt(total, 10);
              if(isNaN(total)) {
                  total = 0;
              }
              var intTotal = parseInt(total);
              intTotal += textDataStr.length;
              totalDetect.innerHTML = ReplaceNumberWithCommas(intTotal);
              checkLength();

              var linkDomain = `<div class='py-3'>Link content: <a class='mx-3' target='_blank' href='${parentUrl}'>${parentUrl}</a><input type='hidden' name='link_content[]' value='${parentUrl}'/></div>`;
              var content = `<div class="d-flex align-items-center">
                  <textarea rows="10" name="content[]" data-length="${ReplaceNumberWithCommas(textDataStr.length)}" class="form-control">${textDataStr}</textarea>
                  <p class="mx-2 my-auto">${ReplaceNumberWithCommas(textDataStr.length)}</p>
                  <button name="delete_link" type="button" class="border-none">
                      <i class="ti ti-trash fs-6 text-danger cusor-pointer"></i>
                  </button>
              </div>`
              $('#content-crawls').append(linkDomain);
              $('#content-crawls').append(content);
          }

          $(data)
          .find('a').each(async function() {
              const href = $(this).attr('href');
              const rel = $(this).attr('rel');
              if (href && (!rel || (rel !== 'stylesheet' && rel !== 'icon'))) {
                  if (href !== 'javascript:void(0)' && !href.startsWith('#')) {
                      const url = new URL(href, parentUrl);
                      const urlDomain = url.hostname;
                      if (urlDomain === parentDomain) {
                          const urlStr = url.href;
                          if (!urlsInSameDomain.includes(urlStr)) {
                              urlsInSameDomain.push(urlStr);
                          }
                      }
                  }
              }
          });

          for (const url of urlsInSameDomain) {
              completedUrls++;
              await addSubDomain(url, completedUrls, urlsInSameDomain.length);
          }
          //end progress
          progressBar.style.width = '100%';
          progressText.innerHTML = '100%';
          getTotalLink();
          $('#btn_crawl').removeClass('disabled');
          $('#include_links').removeClass('disabled');

          return;
      } catch (error) {
          $('#btn_crawl').removeClass('disabled');
          $('#include_links').removeClass('disabled');
      }

  });

  async function addSubDomain(parentUrl, completedUrls, lenghtData) {
      const proxyUrl = proxy + '?url=' + encodeURIComponent(parentUrl);

      try {
          const response = await fetch(proxyUrl, {
              method: "GET",
              mode: "cors",
          });
          const data = await response.text();

          const textData = [];
          $(data).find('p').each(function() {
              textData.push($(this).text());
          });
          if (textData) {
              var textDataStr = textData.join(' ').trim();
              var total = totalDetect.innerHTML;
              if (total && total.toString().includes(',')) {
                  total = total.replace(/,/g, '');
              }
              total = parseInt(total, 10);
              if(isNaN(total)) {
                  total = 0;
              }
              var intTotal = parseInt(total);
              intTotal += textDataStr.length;
              totalDetect.innerHTML = ReplaceNumberWithCommas(intTotal);
              checkLength();
              getTotalLink();
              if (textDataStr.length > 0) {
                  var linkDomain = `<div class='py-3'>Link content: <a class='mx-3' target='_blank' href='${parentUrl}'>${parentUrl}</a><input type='hidden' name='link_content[]' value='${parentUrl}'/></div>`;
                  var content = `<div class="d-flex align-items-center">
                      <textarea rows="10" name="content[]" data-length="${ReplaceNumberWithCommas(textDataStr.length)}" class="form-control">${textDataStr}</textarea>
                      <p class="mx-2 my-auto">${ReplaceNumberWithCommas(textDataStr.length)}</p>
                      <button name="delete_link" type="button" class="border-none">
                          <i class="ti ti-trash fs-6 text-danger cusor-pointer"></i>
                      </button>
                  </div>`
                  $('#content-crawls').append(linkDomain);
                  $('#content-crawls').append(content);
              }
          }
          const progressPercentage = Math.round((completedUrls / lenghtData) * 100);
          progressBar.style.width = progressPercentage + '%';
          progressText.innerHTML = progressPercentage + '%';

          return;
      } catch (error) {
          return;
      }
  };

  $(document).on('input change', 'textarea[name="content[]"]', function() {
      const textData = $(this).val();
      var total = totalDetect.innerHTML;
      if (total && total.toString().includes(',')) {
          total = total.replace(/,/g, '');
      }
      total = parseInt(total, 10);
      if(isNaN(total)) {
          total = 0;
      }
      var initialLength = $(this).data('length');
      if (initialLength && initialLength.toString().includes(',')) {
          initialLength = initialLength.replace(/,/g, '');
      }
      initialLength = parseInt(initialLength, 10);
      if(isNaN(initialLength)) {
          initialLength = 0;
      }
      var intTotal = parseInt(total);
      intTotal += textData.length - initialLength;
      totalDetect.innerHTML = ReplaceNumberWithCommas(intTotal);
      checkLength();
      $(this).data('length', ReplaceNumberWithCommas(textData.length));
      $(this).next().text(ReplaceNumberWithCommas(textData.length));
  });

  $(document).on('click', 'button[name="delete_link"]', function() {
      var initialLength =  $(this).prev().prev('textarea').data('length');
      if (initialLength && initialLength.toString().includes(',')) {
          initialLength = initialLength.replace(/,/g, '');
      }
      initialLength = parseInt(initialLength, 10);
      if(isNaN(initialLength)) {
          initialLength = 0;
      }
      var total = totalDetect.innerHTML;
      if (total && total.toString().includes(',')) {
          total = total.replace(/,/g, '');
      }
      total = parseInt(total, 10);
      if(isNaN(total)) {
          total = 0;
      }
      var intTotal = parseInt(total);
      intTotal -= initialLength;
      totalDetect.innerHTML = ReplaceNumberWithCommas(intTotal);
      checkLength();
      $(this).parent().prev().remove();
      $(this).parent().remove();
      getTotalLink();
  });

  $('#delete_all').on('click', function() {
      $('#content-crawls').empty();
      totalDetect.innerHTML = ReplaceNumberWithCommas(0);
      checkLength();
      getTotalLink();
  });

  function getTotalLink() {
      var linkContent = $('input[name="link_content[]"]').map(function(){return $(this).val();}).get();
      if (linkContent && linkContent.length > 0) {
          var totalDetectCrawl = $('#total_detect').html();
          if (totalDetectCrawl && totalDetectCrawl.toString().includes(',')) {
              totalDetectCrawl = totalDetectCrawl.replace(/,/g, '');
          }
          totalDetectCrawl = parseInt(totalDetectCrawl, 10);
          if(isNaN(totalDetectCrawl)) {
              totalDetectCrawl = 0;
          }

          var totalDetectCrawl = parseInt(totalDetectCrawl);
          $('#total-link-chars').text( `${ReplaceNumberWithCommas(linkContent.length)}  Link  (${ReplaceNumberWithCommas(totalDetectCrawl)} detected chars)` );
      } else {
          $('#total-link-chars').text('');
      }
  }

  function isHTTPSURL(url) {
      const httpsPattern = /^https:\/\//i;
      return httpsPattern.test(url);
  }

  function ReplaceNumberWithCommas(yourNumber) {
      var n= yourNumber.toString().split(".");
      n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return n.join(".");
    }
});
