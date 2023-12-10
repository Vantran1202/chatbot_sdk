$(function () {
  const initialMessages = document.getElementById('initial_messages');
  const initialReset = document.getElementById('initial_reset');
  const theme = document.getElementById('theme');
  const themeReset = document.getElementById('theme_reset');
  const displayIcon = document.getElementById('display_icon');
  const botProfilePicture = document.getElementById('bot_profile_picture');
  const removeBotProfilePicture = document.getElementById('remove_bot_profile_picture');
  const botName = document.getElementById('bot_name');
  const suggestedMessages = document.getElementById('suggested_messages');
  //Form chatbot
  const chatInitialMessages = document.getElementById('chat_initial_messages');
  const chatTheme = document.getElementById('chat_theme');
  const chatBotProfilePicture = document.getElementById('chat_bot_profile_picture');
  const chatBotName = document.getElementById('chat_bot_name');
  const chatSuggestMess = document.getElementById('suggest_mess');
  //Default
  const textInitial = "I am an AI Assistant, Ask me anything, I will help answer your questions based on my understanding.";
  const colorTheme = "#1F2937";
  //onload
  changeColor();
  //Handle input chat initial
  initialMessages.addEventListener('keyup', function (event) {
      const currentMessValue = initialMessages.value;
      chatInitialMessages.textContent = currentMessValue;
      // chatInitialMessages.innerHTML = initialMessages.value;
  });
  //Reset chat initial
  initialReset.addEventListener('click', function (event) {
      initialMessages.value  = textInitial;
      chatInitialMessages.innerHTML  = textInitial;
  })
  //Handle input chat bot name
  botName.addEventListener('keyup', function (event) {
      chatBotName.innerHTML = botName.value;
  });
  //Handle input chat initial
  suggestedMessages.addEventListener('keyup', function (event) {
      const currentValue = suggestedMessages.value;
      contentArray = currentValue.split("\n");
      chatSuggestMess.innerHTML = "";
      contentArray.forEach((content, index) => {
          if (content !== "") {
              const buttonSuggest = document.createElement("button");
              buttonSuggest.setAttribute("type", "button");
              buttonSuggest.classList = "rounded-xl border-0 whitespace-nowrap mx-1 mt-1 py-2 px-3 text-sm text-nowrap bg-zinc-100";
              buttonSuggest.textContent = content;
              chatSuggestMess.appendChild(buttonSuggest);
          }
      });
  });
  //Handle input color theme change
  theme.addEventListener('change', function (event) {
      changeColor();
  });
  //Handle change color
  function changeColor() {
      const selectedColor = theme.value;
      chatTheme.style.backgroundColor = selectedColor;
      const backgroundColor = getComputedStyle(chatTheme).backgroundColor;
      const rgb = backgroundColor.match(/\d+/g);
      const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
      if (brightness < 128) {
          chatBotName.style.color = "#fff";
      } else {
          chatBotName.style.color = "#000000";
      }
  }
  //Reset input color theme
  themeReset.addEventListener('click', function (event) {
      chatTheme.style.backgroundColor = colorTheme;
      chatBotName.style.color = "#fff";
      theme.value = colorTheme;
  });
  //Remove bot profile picture
  removeBotProfilePicture.addEventListener('change', function (event) {
      if (removeBotProfilePicture.checked == true ) {
          displayIcon.style.display = 'none';
          chatBotProfilePicture.style.display = 'none';
      } else {
          displayIcon.style.display = 'block';
          chatBotProfilePicture.style.display = 'block';
      }
  });
  //Handle upload icon picture
  botProfilePicture.addEventListener("change", function () {
      const selectedFile = botProfilePicture.files[0];

      if (selectedFile) {
          const reader = new FileReader();

          reader.onload = function (e) {
              chatBotProfilePicture.src = e.target.result;
          };

          reader.readAsDataURL(selectedFile);
          displayIcon.style.display = 'block';
          chatBotProfilePicture.style.display = 'block';
      } else {
          chatBotProfilePicture.src = "";
      }
  });
  //save chat interface
  $('#update-chat-interface').on('click', function() {
      $('.text-danger').text('');
      $.LoadingOverlay('show');
      var formData = new FormData();
      var isPictureNotActive = 0;
      if ($('#remove_bot_profile_picture').is(':checked')) {
          isPictureNotActive = 1;
      }
      var file = $('#bot_profile_picture')[0].files[0];

      if (!file) {
        file = "";
      }
      formData.append('chatbot_name', $('#bot_name').val());
      formData.append('theme_color', $('#theme').val());
      formData.append('chatbot_picture', file);
      formData.append('chatbot_picture_active', isPictureNotActive);
      formData.append('project_id', $('#project_id').val());
      formData.append('chat_interface_id', $('#chat_interface_id').val());
      formData.append('initial_message', $('#initial_messages').val());
      formData.append('suggest_message', $('#suggested_messages').val());

      var urlCreate = $('#chat_interface_form').attr('action');

      $.ajax({
        type: 'POST',
        url: urlCreate,
        data: formData,
        contentType: false,
        processData: false,
        success: function(res) {
          $.LoadingOverlay('hide');
        },
        error: function(error) {
          console.log('error', error);
          error.responseJSON.meta.errors && error.responseJSON.meta.errors.chatbot_name ?
            $('#error-bot_name').text(error.responseJSON.meta.errors.chatbot_name[0]) :
            '';
          error.responseJSON.meta.errors && error.responseJSON.meta.errors.chatbot_picture ?
            $('#error-bot_profile_picture').text(error.responseJSON.meta.errors.chatbot_picture[
              0]) :
            '';
          error.responseJSON.meta.errors && error.responseJSON.meta.errors.theme_color ?
            $('#error-theme').text(error.responseJSON.meta.errors.theme_color[0]) :
            '';
          error.responseJSON.meta.errors && error.responseJSON.meta.errors.chatbot_picture_active ?
            $('#error-remove_bot_profile_picture').text(error.responseJSON.meta.errors.chatbot_picture_active[0]) :
            '';
          error.responseJSON.meta.errors && error.responseJSON.meta.errors.initial_message ?
            $('#error-initial_message').text(error.responseJSON.meta.errors.initial_message[0]) :
            '';
          $.LoadingOverlay('hide');
        }
      });
    });
    // Tab left menu
  const tabs = document.querySelectorAll(".nav-link-left");
  const tabContents = document.querySelectorAll(".tab-pane-left");

  tabs.forEach(function(tab, index) {
      tab.addEventListener("click", function() {
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
  const vPillsEmbed = document.getElementById('v-pills-embed');
  vPillsEmbed.addEventListener("keydown", function(event) {
      if (event.key === "Tab") {
          event.preventDefault();
          const tabs = document.querySelectorAll(".nav-link-left");
          const tabContents = document.querySelectorAll(".tab-pane-left");
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
          // tabs[currentTabIndex].focus();
      }
  });
});
