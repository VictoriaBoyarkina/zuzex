const parser = new DOMParser();

export default function addMessage(message, user, container) {
  // Check if it's a current user message
  const currentUserMessage = message.userId = user.id;

  // Create a container for a message and add an icon
  const msgContainer = document.createElement("div");
  msgContainer.classList.add("message-container");
  console.log(message)
  const svgDoc = parser.parseFromString(message.userAvatar, "text/xml");
  const svgElement = svgDoc.documentElement;
  svgElement.classList.add('message-user-icon');
  msgContainer.appendChild(svgElement);

  // Only text
  if (message.text && !message.img) {
    const div = document.createElement("div");
    div.classList.add("message-text-container");
    if (currentUserMessage) {
      div.classList.add('message-background');
      const p = document.createElement('p');
      p.classList.add('message-user-name');
      div.appendChild(p);
    }
    div.textContent = message.text;
    msgContainer.append(div);
    container.append(msgContainer);
  }
}