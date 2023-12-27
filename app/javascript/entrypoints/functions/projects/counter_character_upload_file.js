$(function() {
  var filesInputArray = [];
  var totalFiles = 0;
  var totaltextFileLength = 0;
  var textInputArray = [];
  let maxLength = 1000000;

      const dropArea = document.getElementById('dropArea');
      const fileInput = document.getElementById('fileInput');
      const fileList = document.getElementById('fileList');

      dropArea.addEventListener('dragover', handleDragOver);
      dropArea.addEventListener('dragleave', handleDragLeave);
      dropArea.addEventListener('drop', handleDrop);

      fileInput.addEventListener('input', handleFileInputChange);

      function handleDragOver(e) {
          e.preventDefault();
          dropArea.classList.add('bg-info', 'text-white');
      }

      function handleDragLeave() {
          dropArea.classList.remove('bg-info', 'text-white');
      }

      function handleDrop(e) {
          e.preventDefault();
          dropArea.classList.remove('bg-info', 'text-white');
          const files = e.dataTransfer.files;
          handleFiles(files);
      }

      function handleFileInputChange() {
          const files = fileInput.files;
          handleFiles(files);
      }

      function handleFiles(files) {
        console.log(123)
          for (let i = 0; i < files.length; i++) {
              const file = files[i];
              if (file.type === 'application/pdf') {
                  handlePdfFile(file);
              } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                  handleWordFile(file);
              } else {
                  alert('File type is not supported.');
              }
          }
      }

      function handlePdfFile(file) {
          if (checkExistFile(file, filesInputArray)) {
              alert(`File ${file.name} is already exists`);
              return;
          }

          const reader = new FileReader();
          reader.onload = async function () {
              const typedArray = new Uint8Array(reader.result);
              const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
              const totalPages = pdf.numPages;
              let text = "";

              for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                  const page = await pdf.getPage(pageNumber);
                  const textContent = await page.getTextContent();
                  text += textContent.items.map(item => item.str).join(" ");
              }

              addFileToArray(file, text, file.type);
          };
          reader.readAsArrayBuffer(file);
      }

      function handleWordFile(file) {
          if (!file) {
              reject("No file provided");
              return;
          }

          if (checkExistFile(file, filesInputArray)) {
              alert(`File ${file.name} is already exists`);
              return;
          }

          const reader = new FileReader();
          reader.onload = function (e) {
              const content = e.target.result;

              mammoth.extractRawText({ arrayBuffer: content })
                  .then(result => {
                      let text = result.value;
                      addFileToArray(file, text, file.type);
                  })
                  .catch(error => {
                      alert("Error extracting text: " + error);
                  });
          };
          reader.readAsArrayBuffer(file);
      }

      function addFileToArray(file, text, type) {
          filesInputArray.push({
              'name': file.name,
              'text': text,
              'type': type
          });
          const fileItem = createFileItemElement(file, text);
          fileList.appendChild(fileItem);
          viewFileCharacter();
      }

      function createFileItemElement(file, text) {
          const fileItem = document.createElement('div');
          fileItem.className = 'alert alert-secondary d-flex justify-content-between align-items-center';

          const fileName = document.createElement('span');
          fileName.textContent = file.name + " (" + text.length + " characters)";

          const deleteButton = document.createElement('i');
          deleteButton.className = 'ti ti-trash fs-6 text-danger cursor-pointer';
          deleteButton.dataset.fileName = file.name;
          deleteButton.addEventListener('click', handleDeleteButtonClick);

          fileItem.appendChild(fileName);
          fileItem.appendChild(deleteButton);

          return fileItem;
      }

      function handleDeleteButtonClick(event) {
          const fileName = event.target.dataset.fileName;
          const fileItem = event.target.parentElement;
          fileItem.remove();
          filesInputArray = filesInputArray.filter(item => item.name !== fileName);
          viewFileCharacter();
      }

      function checkExistFile(file, files) {
        if (files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            if (files[i].name === file.name) {
              return true; // Exist
            }
          }
          return false; // Not Exist
        }
      }

      function viewFileCharacter() {
        if (filesInputArray.length) {
          totalFiles= filesInputArray.length;
          totaltextFileLength = filesInputArray.reduce((sum, item) => sum + item.text.length, 0);
          $('.js-total-character').text( `${totalFiles} Files (${totaltextFileLength} chars)` );
        } else {
          totaltextFileLength = 0;
          $('.js-total-character').text("");
        }
        checkLength();
      }


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

      let currentLength = textInputArray.length ? textInputArray.reduce((sum, item) => sum + item.content.length, 0) : 0;
      let totalPages = textInputArray.length;
      let totalDetectLength = currentLength + totaltextFileLength + totalDetectCrawl;
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


})
