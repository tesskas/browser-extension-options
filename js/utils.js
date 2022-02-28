import BrowserApi from "./browserApi.js";

export const colorScheme = {
  blue: "text-white bg-primary",
  green: "text-white bg-success",
  red: "text-white bg-danger",
  yellow: "text-white bg-warning",
  turquoise: "text-white bg-info",
  gray: "text-white bg-secondary",
  dark: "text-white bg-dark",
  light: "bg-light",
};

export async function getCurrentTab() {
  //lastFocusedWindow: true v3
  //let queryOptions = { active: true, currentWindow: true };
  //let [tab] = await chrome.tabs.query(queryOptions);

  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs);
        resolve(tabs[0]);
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

export const parseUrl = (url) => {
  if (url == null) return "";
  url = url.replace("http://", "");
  url = url.replace("https://", "");
  let endId = url.indexOf("/");
  url = url.substring(0, endId);
  return url;
};

export async function createNote(title, url, color, text) {
  const note = {
    title: title,
    color: color,
    updateDate: new Date().toDateString(),
    text: text,
  };
  BrowserApi.getLocalStorageValue("notes").then((resp) => console.log(resp));
  let notes = await BrowserApi.getLocalStorageValue("notes");
  notes[url] = note;
  BrowserApi.setLocalStorageValue("notes", notes);
}

export async function editNote(title, url, color, text) {
  let notes = await BrowserApi.getLocalStorageValue("notes");
  let selected = notes[url];
  selected.title = title;
  selected.color = color;
  selected.updateDate = new Date().toDateString();
  selected.text = text;
  BrowserApi.setLocalStorageValue("notes", notes);
}

export async function deleteNote(url) {
  let notes = await BrowserApi.getLocalStorageValue("notes");
  delete notes[url];
  BrowserApi.setLocalStorageValue("notes", notes);
}

export async function loadNote(url) {
  let notes = await BrowserApi.getLocalStorageValue("notes");
  return notes[url];
}

export async function loadAllNotes() {
  let notes = await BrowserApi.getLocalStorageValue("notes");
  return Object.keys(notes).map(function (key, index) {
    notes[key].url = key;
    return notes[key];
  });
}
