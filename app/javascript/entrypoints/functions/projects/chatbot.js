class ChatApp {
  constructor() {
    const chatbot             = document.getElementById("js-chatbot-form-question")
    this.resultId             = 1;
    this.streamGenerateStatus = false;
    this.histories            = [];
    this.controller           = '';
    this.projectName          = '';
    this.projectId            = '';
    this.msgHistory           = $('#js-chatbot-msg-history');
    this.messageInput         = chatbot.querySelector('textarea');
    this.apiChat              = chatbot.dataset['apiUrl']
  }

  async streamGenerate(question, resultText) {
    this.streamGenerateStatus = true;
    if (!question) {
      alert("Please enter a prompt.");
      return;
    }

    this.controller = new AbortController();
    const signal = this.controller.signal;

    try {
      const response = await fetch(this.apiChat, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'project_id': this.projectId,
          'question': question,
          'histories': this.histories.slice(-6)
        }),
        signal
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      resultText.innerText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const content = decoder.decode(value);
        resultText.innerText += content;

        const contentChat = document.getElementById("js-chatbot-content");
        let height = contentChat.scrollHeight
        contentChat.scrollTo({
          top: height,
          behavior: "smooth"
        });
      }

      const answer = resultText.innerText;
      this.histories.push(
        { role: "user", content: question },
        { role: "assistant", content: answer }
      );
    } catch (error) {
      if (signal.aborted) {
        resultText.innerText = "Request aborted.";
      } else {
        console.error("Error:", error);
        resultText.innerText = "Error occurred while generating.";
        return true;
      }
    } finally {
      this.controller = null;
      this.streamGenerateStatus = false;
      this.messageInput.removeAttribute("disabled");
      this.messageInput.setAttribute("placeholder", "Type your question here!");
    }
  }

  sendMessage(projectName, projectId) {
    this.projectName = projectName;
    this.projectId   = projectId;
    if (this.streamGenerateStatus) return;

    const promptInput = this.messageInput.value;
    if (promptInput.trim() === "") return;

    this.messageInput.setAttribute("disabled", "disabled");
    this.messageInput.setAttribute("placeholder", "");

    const userMessage = `<div class="hstack gap-3 align-items-start mb-7 justify-content-end">
        <div class="text-end">
          <h6 class="fs-2 text-muted"></h6>
          <div class="text-input-question p-2 bg-light-info text-dark rounded-1 d-inline-block fs-3">${promptInput}</div>
        </div>
      </div>`;

    this.msgHistory.append(userMessage);
    this.messageInput.value = "";

    // const question = encodeURIComponent(promptInput);
    const question = promptInput;
    const user_avatar = $('.js-user-avatar').data('user-avatar')

    const assistantMessage = `
      <div class="hstack gap-3 align-items-start mb-7 justify-content-start">
        <img src="${user_avatar}" alt="user8" width="40" height="40" />
        <div>
          <h6 class="fs-2 text-muted"><span class="project-name"></span>${this.projectName} Assistant</h6>
          <div id="result-${this.resultId}" class="result p-2 bg-light rounded-1 d-inline-block text-dark fs-3">
            <div class="left typing text-xs font-thin text-left rounded-md px-2 py-1">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>`;

    this.msgHistory.append(assistantMessage);

    const resultText = document.getElementById(`result-${this.resultId}`);

    this.streamGenerate(question, resultText);

    const contentChat = document.getElementById("js-chatbot-content");
    let height = contentChat.scrollHeight
    contentChat.scrollTo({
      top: height,
      behavior: "smooth"
    });
    this.resultId++;
  }
}

$(function() {
  const $formChatbot = document.getElementById("js-chatbot-form-question")
  if (!$formChatbot) return;

  const chatApp      = new ChatApp();
  const projectName  = $formChatbot.dataset['projectName']
  const projectId    = $formChatbot.dataset['projectId']

  $formChatbot.addEventListener("keydown", function(event) {
    if (event.keyCode == 13 && !event.shiftKey) {
      event.preventDefault();

      chatApp.sendMessage(projectName, projectId)
    }
  });

  $(document).on('click', '.js-chatbot-btn-send-message', function() {
    chatApp.sendMessage(projectName, projectId)
  });
})
