$(function() {
  let projectId = getProjectId()
  let API_URL = getUrlApiChat()
  let histories = [];

  const chatInput      = document.getElementById('chat-input');
  const chatSubmit     = document.getElementById('chat-submit');
  const chatMessages   = document.getElementById('chat-messages');

  // const chatbotName    = document.getElementById('chatbot_name');
  // const chatbotAvatar  = document.getElementById('chatbot_avatar');
  // const chatHeader     = document.getElementById('chat-header');
  // const chatInitial    = document.getElementById('chat_initial');
  // const suggestMessage = document.getElementById('suggest_mess');
  // const API_CHAT_INTERFACE = `${window.location.origin}/api/v1/chat_interface/${projectId}`;
  // var xhr = new XMLHttpRequest();
  // xhr.open("GET", API_URL, true);

  // xhr.onload = function() {
  //     if (xhr.status === 200) {
  //         var chatInterface = JSON.parse(xhr.responseText);
  //         if (chatInterface) {
  //             //Chatbot name
  //             if (chatInterface.data.chatbot_name) {
  //                 chatbotName.innerHTML = chatInterface.data.chatbot_name;
  //             }
  //             //avatar
  //             if (chatInterface.data.chatbot_picture) {
  //                 chatbotAvatar.src = `${window.location.origin}/${chatInterface.data.chatbot_picture}`;
  //                 if (chatInterface.data.chatbot_picture_active == 0) {
  //                     chatbotAvatar.style.display = 'block';
  //                 }
  //             }
  //             //Chatbot color
  //             if (chatInterface.data.theme_color) {
  //                 chatHeader.style.backgroundColor = chatInterface.data.theme_color;
  //                 const backgroundColor = getComputedStyle(chatHeader).backgroundColor;
  //                 const rgb = backgroundColor.match(/\d+/g);
  //                 const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
  //                 if (brightness < 128) {
  //                     chatbotName.style.color = "#fff";
  //                 } else {
  //                     chatbotName.style.color = "#000000";
  //                 }
  //             }
  //             //Chatbot initial message
  //             if (chatInterface.data.initial_message) {
  //                 chatInitial.innerHTML = chatInterface.data.initial_message;
  //             }
  //             //Chatbot suggest message
  //             if (chatInterface.data.suggest_message) {
  //                 const currentValue = chatInterface.data.suggest_message;
  //                 contentArray = currentValue.split("\n");
  //                 suggestMessage.innerHTML = "";
  //                 contentArray.forEach((content, index) => {
  //                     if (content !== "") {
  //                         const buttonSuggest = document.createElement("button");
  //                         buttonSuggest.setAttribute("type", "button");
  //                         buttonSuggest.classList = "rounded-xl border-0 whitespace-nowrap mx-1 mt-1 py-2 px-3 text-sm text-nowrap bg-zinc-100";
  //                         buttonSuggest.textContent = content;
  //                         buttonSuggest.addEventListener("click", function() {
  //                             suggestFunction(content);
  //                         });
  //                         suggestMessage.appendChild(buttonSuggest);
  //                     }
  //                 });
  //             }
  //         }
  //     } else {
  //         console.error("Request failed with status: " + xhr.status);
  //     }
  // };

  // xhr.onerror = function() {
  //     console.error("Network error occurred");
  // };
  // xhr.send();

  chatSubmit.addEventListener('click', async function () {
    const message = chatInput.value.trim();
    if (!message) return;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = '';
    onUserRequest(message);
  });

  chatInput.addEventListener("keydown", function (event) {
  　if (event.keyCode == 13 && !event.shiftKey) {
      chatSubmit.click();
  　}
  });

  var buttonSuggest = document.getElementsByClassName("js-chatbot-suggest-message ");
  Array.from(buttonSuggest).forEach(function(element) {
    element.addEventListener('click', function() {
      onUserRequest(this.innerText);
    });
  });

  async function onUserRequest(message) {
      if (chatSubmit.disabled == true) {
          return;
      }
      chatSubmit.disabled = true;
      // Handle user request here
      const chatMessages = document.getElementById('chat-messages');
      // Display user message
      const messageElement = document.createElement('div');
      messageElement.className = 'flex justify-end mb-3';
      messageElement.innerHTML = `
      <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%]" style="background-color: rgb(111, 68, 252); color: white;">
          ${message}
        </div>
      `;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      chatInput.value = '';

      const replyElement = document.createElement('div');
      replyElement.className = 'flex mb-3';
      replyElement.innerHTML = `
      <div class="reply text-black rounded-lg py-2 px-4 max-w-[70%] typing">
        <span></span>
        <span></span>
        <span></span>
      </div>`;

      chatMessages.appendChild(replyElement);

      // Create a new AbortController instance
      let controller = new AbortController();
      let signal = controller.signal;
      let answer;
      try {
          // Fetch the response from the OpenAI API with the signal from AbortController
          const response = await fetch(API_URL, {
              method: "POST",
              mode: "cors",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  'project_id': projectId,
                  'question': message,
                  'histories': histories.slice(-6)
              }),
              signal // Pass the signal to the fetch request
          });

          // Read the response as a stream of data
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");


          while (true) {
              const { done, value } = await reader.read();
                  if (done) {
                  break;
              }
              // Massage and parse the chunk of data
              const content = decoder.decode(value);
              replyElement.getElementsByTagName('div')[0].classList.add('bg-gray-200');
              replyElement.getElementsByTagName('div')[0].innerText += content;
              answer = replyElement.getElementsByTagName('div')[0].innerText;
              chatMessages.scrollTop = chatMessages.scrollHeight
          }
          histories.push(
              {
                  role: "user",
                  content: message
              },
              {
                  role: "assistant",
                  content: answer
              }
          );
          chatSubmit.disabled = false;
      } catch (error) {
          // Handle fetch request errors
          if (signal.aborted) {
            replyElement.innerText = "Request aborted.";
          } else {
            console.log(error)
            replyElement.innerText = "Error occurred while generating.";
            return true;
          }
          chatSubmit.disabled = false;
      } finally {
          chatSubmit.disabled = false;
          // Enable the generate button and disable the stop button
          controller = null; // Reset the AbortController instance
      }
  }

  function suggestFunction(content) {
    onUserRequest(content);
  }

  function getUrlApiChat() {
    const api_path = $('#js-chatbot').data('api-path')
    return `${api_path}?project_id=${projectId}`;
  }

  function getProjectId() {
    const path = window.location.pathname
    const uuidRegex = /\/sdk\/chats\/([a-fA-F0-9-]+)/;
    const match = path.match(uuidRegex);
    if (match && match[1]) {
      return match[1]
    } else {
      alert("Error: Invalid URL. Please use the URL generated by the SDK.");
    }
  }
})
