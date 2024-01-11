!function(){
  const currentScript = document.currentScript,
        projectId = currentScript.getAttribute("projectId"),
        domain = currentScript.getAttribute("domain"),
        styleElement = document.createElement("style");

  styleElement.innerHTML = `
    .hidden-mgpt-embedded {
      display: none;
    }
    @media (max-width: 768px) {
      #chatIframeMgpt {
        width: 100%!important;
        height: 88%!important;
        max-height: 100%!important;
        right: 0!important;
        top: 0!important;
        border-radius: unset!important;
      }
    }
  `;
  document.head.appendChild(styleElement);

  const iframeElement = document.createElement("iframe");
  iframeElement.id = "chatIframeMgpt";
  iframeElement.style = "border: none; position: fixed; flex-direction: column; justify-content: space-between; box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px; bottom: 7rem; right: 1rem; width: 448px; height: 85vh; max-height: 824px; border-radius: 0.75rem; z-index: 2147483646; overflow: hidden; left: unset;";
  iframeElement.scrolling = "yes";
  iframeElement.className = "hidden-mgpt-embedded";
  iframeElement.src = `${domain}/sdk/chats/${projectId}`;
  document.body.appendChild(iframeElement);

  const buttonElement = document.createElement("div");
  buttonElement.id = "chatmgpt-bubble-button";
  document.body.appendChild(buttonElement);
  buttonElement.innerHTML = `
    <div style="position: fixed; bottom: 1rem; right: 1rem; width: 100px; height: 100px; border-radius: 25px; cursor: pointer; z-index: 2147483645; transition: all 0.2s ease-in-out 0s; left: unset; transform: scale(1);">
      <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; z-index: 2147483646;">
        <img id="chatIconMgpt" src="${domain}/bubble-chat.png" width="100" height="100"/>
        <svg id="closeIconMgpt" class="hidden-mgpt-embedded" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="white" width="50" height="50" style="background-color: rgb(0, 0, 0); box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px; border-radius: 25px; cursor: pointer; z-index: 2147483645; transition: all 0.2s ease-in-out 0s; left: unset; transform: scale(1);">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.5 9.25l-5.5 5.5-5.5-5.5"></path>
        </svg>
      </div>
    </div>
  `;

  const bubbleButton = document.getElementById("chatmgpt-bubble-button"),
        chatIcon = document.getElementById("chatIconMgpt"),
        closeIcon = document.getElementById("closeIconMgpt");
  var chatIframe = document.getElementById("chatIframeMgpt");

  bubbleButton.addEventListener("click", () => {
    chatIcon.classList.toggle("hidden-mgpt-embedded");
    closeIcon.classList.toggle("hidden-mgpt-embedded");
    chatIframe.classList.toggle("hidden-mgpt-embedded");
  });
}();
