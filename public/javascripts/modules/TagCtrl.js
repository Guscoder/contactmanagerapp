import { ContactsAPI } from "./ContactsAPI.js";

export class TagCtrl {
  constructor() {
    this.tags = this.getAllTagNames();
  }
  getUniqueTagNames(tagArray) {
    let tagList = [];
    tagArray.forEach((contact) => {
      if (contact.tags) {
        tagList.push(contact.tags.toLowerCase().split(","));
      }
    });
    let uniqueTagList = [...new Set(tagList.flat())];
    return uniqueTagList;
  }
  async getAllTagNames() {
    let contactData = await ContactsAPI.getContacts();
    let filteredTagList = this.getUniqueTagNames(contactData);
    return filteredTagList;
  }
}
