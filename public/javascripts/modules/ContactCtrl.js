import { ContactsAPI } from "./ContactsAPI.js";

export const ContactCtrl = (() => {
  // Item Constructor
  const Contact = function ({ full_name, email, phone_number, tags, id }) {
    this.full_name = full_name;
    this.email = email;
    this.phone_number = phone_number;
    this.tags = tags || "";
    this.id = id;
  };

  return {
    async getSingleContact(id) {
      let contactData = await ContactsAPI.getSingleContact(id);
      return contactData;
    },
    addNewContact(contactData) {
      ContactsAPI.addContact(contactData);
    },
    updateContact(id, data) {
      ContactsAPI.editContact(id, data);
    },
    deleteContact(id) {
      ContactsAPI.removeContact(id);
    },
    async getAllContacts() {
      let allContacts = await ContactsAPI.getContacts();
      let newContacts = allContacts.map(
        (contactInfo) => new Contact(contactInfo)
      );
      return newContacts;
    },
    async getContactsByTag(tag) {
      let matchingContacts = await this.getAllContacts();
      if (tag === "all") {
        return matchingContacts;
      } else {
        return matchingContacts.filter((contact) => {
          return contact.tags
            .split(",")
            .map((tag) => tag.toLowerCase())
            .includes(tag);
        });
      }
    },
    async getContactsBySearch(searchString) {
      let matchingContacts = await this.getAllContacts();
      let matches = matchingContacts.filter((contact) => {
        let names = contact.full_name.split(" ");
        return (
          names[0].toLowerCase().startsWith(searchString.toLowerCase()) ||
          names[1].toLowerCase().startsWith(searchString.toLowerCase())
        );
      });
      return matches;
    },
  };
})();
