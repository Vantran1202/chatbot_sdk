let controller = null; // Store the AbortController instance
var resultId = 1;
var streamGenerateStatus = false;
var histories = [];

const streamGenerate = async (question, resultText) => {
    streamGenerateStatus = true;
    // Alert the user if no prompt value
    if (!question) {
        alert("Please enter a prompt.");
        return;
    }

    // Create a new AbortController instance
    controller = new AbortController();
    const signal = controller.signal;

    try {
        // Fetch the response from the OpenAI API with the signal from AbortController
        const response = await fetch(chatApi, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'project_id': projectId,
                'question': question,
                'histories': histories.slice(-6)
            }),
            signal // Pass the signal to the fetch request
        });

        // Read the response as a stream of data
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        resultText.innerText = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
            break;
        }

        // Massage and parse the chunk of data
        const content = decoder.decode(value);

        var answer = "";
        // const lines = chunk.split("\n");
        resultText.innerText += content;
        answer = resultText.innerText;
            const contentChat = document.getElementById("chat-box-content");
            let height = contentChat.scrollHeight
            contentChat.scrollTo({
                top: height,
                behavior: "smooth"
            });
        }

        histories.push(
            {
                role: "user",
                content: question
            },
            {
                role: "assistant",
                content: answer
            }
        );
    } catch (error) {
        // Handle fetch request errors
        if (signal.aborted) {
            resultText.innerText = "Request aborted.";
        } else {
            console.error("Error:", error);
            resultText.innerText = "Error occurred while generating.";
            return true;
        }
    } finally {
        // Enable the generate button and disable the stop button
        controller = null; // Reset the AbortController instance
        streamGenerateStatus = false;
        messageInput.removeAttribute("disabled");
        messageInput.setAttribute("placeholder", "Type your question here!");
    }
};

const sendMessage  = function () {

    if (streamGenerateStatus){
        return;
    }

    const promptInput = messageInput.value;
    console.log(promptInput);

    if (promptInput.trim() === "") return;

    messageInput.setAttribute("disabled", "disabled");
    messageInput.setAttribute("placeholder", "");


    var message = `<div class="hstack gap-3 align-items-start mb-7 justify-content-end"><div class="text-end"><h6 class="fs-2 text-muted"></h6><div class="text-input-question p-2 bg-light-info text-dark rounded-1 d-inline-block fs-3"> ${promptInput} </div></div></div>`
    $('#msg_history').append(message);
    messageInput.value = "";
    const question = encodeURIComponent(promptInput);
    const answer = `
        <div class="hstack gap-3 align-items-start mb-7 justify-content-start">
        <img src="../../assets/images/logos/logo.png" alt="user8" width="40" height="40" />
          <div>
            <h6 class="fs-2 text-muted"><span class="project-name"></span> ${projectName} Assistant</h6>
              <div id="result-${resultId}" class="result p-2 bg-light rounded-1 d-inline-block text-dark fs-3">
                <div class="left typing text-xs font-thin text-left rounded-md px-2 py-1">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
          </div>
        </div>`
        $('#msg_history').append(answer);

    const resultText = document.getElementById(`result-${resultId}`);

    streamGenerate(question, resultText);

    const contentChat = document.getElementById("chat-box-content");
    let height = contentChat.scrollHeight
    contentChat.scrollTo({
        top: height,
        behavior: "smooth"
    });
    resultId ++;
}

const formChat = document.getElementById("form-question");
const messageInput = formChat.querySelector('textarea');

formChat.addEventListener("keydown", (event) => {
  if (event.keyCode == 13 && !event.shiftKey) {
    sendMessage(event);
    event.preventDefault();
  }
});

$(document).on('click','i[id="send-message-icon"]', sendMessage);
