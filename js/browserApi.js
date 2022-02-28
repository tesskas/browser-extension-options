import { colorScheme, getCurrentTab, createNote } from "./utils.js";

class BrowserApi {
  static setLocalStorageValue(key, value) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.set({ [key]: value }, () => resolve());
      } catch (ex) {
        reject(ex);
      }
    });
  }

  static getLocalStorageValue(key) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get(null, (value) => {
          resolve(value[key]);
        });
      } catch (ex) {
        reject(ex);
      }
    });
  }

  static onInstall() {
    this.createContextmMenu("add", "Přidat poznámku", async (event) => {
      const colorList = Object.keys(colorScheme);
      const currentTab = await getCurrentTab();
      const title = currentTab.title;
      const url = event.pageUrl;
      const color = colorList[Math.floor(Math.random() * colorList.length)];
      const text = event.selectionText;

      createNote(title, url, color, text);
    });
    this.setLocalStorageValue("notes", {});
  }

  static createContextmMenu(id, title, callback) {
    chrome.contextMenus.create({
      id: id,
      title: title,
      contexts: ["selection"],
    });
    chrome.contextMenus.onClicked.addListener(callback);
  }
}

export default BrowserApi;

/*

    */
