import { createNote, getCurrentTab, loadNote, parseUrl } from "../js/utils.js";

async function addNote() {
  const currentTab = await getCurrentTab();
  const title = currentTab.title;
  const url = currentTab.url;
  const color = document.getElementById("note-color").value;
  const text = document.getElementById("note-text").value;
  createNote(title, url, color, text);
}

document.getElementById("add-note").onclick = addNote;

const currentTab = await getCurrentTab();
console.log(currentTab);
const title = currentTab.title;
const url = currentTab.url;

document.getElementById("title").innerText = title;
let link = document.getElementById("url");
link.href = url;
link.innerText = parseUrl(url) + "...";

let note = await loadNote(url);
console.log(note);
document.getElementById("note-text").value = note.text;
