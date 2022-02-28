import { colorScheme, loadAllNotes, parseUrl } from "../js/utils.js";

function createCard(title, url, text, date, color) {
  let cardElement = document.createElement("div");
  let cardHeader = document.createElement("div");
  let cardLink = document.createElement("a");
  let cardBody = document.createElement("div");
  let cardTitle = document.createElement("h5");
  let cardText = document.createElement("div");
  let cardFooter = document.createElement("div");

  //cardElement.style = "max-width: 18rem";
  cardElement.className = `card ${colorScheme[color]} mb-3`;
  cardHeader.className = "card-header";
  cardBody.className = "card-body";
  cardTitle.className = "card-title";
  cardText.className = "card-text";
  cardFooter.className = "card-footer";

  cardLink.innerText = parseUrl(url) + "...";
  cardLink.href = url;
  cardLink.style = "color: white";
  cardTitle.innerHTML = title;
  cardText.innerText = text;
  cardFooter.innerText = "Last modified: " + date;

  cardHeader.appendChild(cardLink);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);

  cardElement.appendChild(cardHeader);
  cardElement.appendChild(cardBody);
  cardElement.appendChild(cardFooter);

  document.getElementById("board").appendChild(cardElement);
}

function editNote(id) {
  return -1;
}

function deleteNote(id) {
  return -1;
}

const notes = await loadAllNotes();
console.log(notes);
notes.forEach((n) => createCard(n.title, n.url, n.text, n.updateDate, n.color));
