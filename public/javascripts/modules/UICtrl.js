import { ContactCtrl } from "./ContactCtrl.js";

export const UICtrl = (() => {
  const UIselectors = {
    submitContactButton: "submitContactButton",
    editContactButton: ".editContactButton",
    deleteContactButton: ".deleteContactButton",
    addContactButton: "addContactButton",
    addContactFormDisplay: "addContactDisplay",
    searchBar: "searchBar",
    tagSelect: "tagSelect",
    contactsDisplay: "contactsDisplay",
    contactsList: "contactsList",
    showContactsScript: "showContacts",
    cancelAddButton: ".cancelAddButton",
    cancelEditButton: ".cancelEditButton",
    addContactForm: "form",
    editContactForm: "editForm",
    displayEditForm: "displayEditForm",
    editContactScript: "editContactScript",
  };

  return {
    getSelectors() {
      return UIselectors;
    },
    registerShowContactsTemplates(contactsData) {
      // Retrieve the template data from the HTML
      var template = document.getElementById(
        UIselectors.showContactsScript
      ).innerHTML;

      // Compile the template data into a function
      var templateScript = Handlebars.compile(template);

      // Insert data andrun scriptto get HTML
      var html = templateScript({ contacts: contactsData });
      // Insert the HTML code into the page
      document
        .getElementById(UIselectors.contactsList)
        .insertAdjacentHTML("afterbegin", html);
    },
    registerEditContactTemplates(contactData) {
      // Retrieve the template data from the HTML (jQuery is used here).
      var template = document.getElementById(
        UIselectors.editContactScript
      ).innerHTML;
      // Compile the template data into a function
      var templateScript = Handlebars.compile(template);
      // Insert data andrun scriptto get HTML
      var html = templateScript(contactData);
      // Insert the HTML code into the page
      document
        .getElementById(UIselectors.displayEditForm)
        .insertAdjacentHTML("beforeend", html);
    },
    renderTagOptions(tagsArray, displayId) {
      // Retrieve the template data from the HTML (jQuery is used here).
      var template = document.getElementById("createTagOptions").innerHTML;
      // Compile the template data into a function
      var templateScript = Handlebars.compile(template);
      // Insert data andrun scriptto get HTML
      var html = templateScript({ tags: tagsArray });
      // Insert the HTML code into the page
      // document.getElementById(displayId).insertAdjacentHTML("beforeend", html);
      document.getElementById(displayId).innerHTML = html;
    },
    async populateContactsList() {
      let contactsList = await ContactCtrl.getAllContacts();

      if (contactsList.length === 0) {
        document.getElementById(UIselectors.contactsList).innerText =
          "There are no contacts to display.";
        // "<li>There are no contacts to display.</li>";
      } else {
        document.getElementById(UIselectors.contactsList).innerHTML = "";
        this.registerShowContactsTemplates(contactsList);
      }
    },
    async searchContacts(searchString) {
      let contactsList = await ContactCtrl.getContactsBySearch(searchString);
      document.getElementById(UIselectors.contactsList).innerHTML = "";
      this.registerShowContactsTemplates(contactsList);
    },
    addNewContact(contactData) {
      ContactCtrl.addNewContact(contactData);
    },
    async editContact(e) {
      let contactId = e.target.parentElement.parentElement.dataset.id;
      let contact = await ContactCtrl.getSingleContact(contactId);
      this.registerEditContactTemplates(contact);
      document
        .getElementById("editSelectTag")
        .addEventListener("change", (e) => {
          this.addTagsToTagInput("editSelectTag", "editTagInput");
        });
      const editContactForm = document.getElementById(
        UIselectors.editContactForm
      );
      // document.getElementById("editContactName").value = contact.full_name;
      editContactForm.addEventListener("submit", (e) => {
        let contactData = new FormData(editContactForm);
        ContactCtrl.updateContact(contactId, contactData);
        this.updateContact(contactId, contactData);
      });
      document.getElementById("displayEditForm").classList.add("slidemeup");
      document.querySelector(".main-header").classList.remove("slidemeup");
    },
    updateContact(id, contactData) {
      ContactCtrl.updateContact(id, contactData);
    },
    deleteContact(e) {
      let contactId = e.target.parentElement.parentElement.dataset.id;
      let listElement = document.querySelector(`[data-id='${contactId}']`);
      listElement.remove();
      ContactCtrl.deleteContact(contactId);
    },
    async displayContactsByTagFilter(tag) {
      let contactsList = await ContactCtrl.getContactsByTag(tag);
      document.getElementById(UIselectors.contactsList).innerHTML = "";
      this.registerShowContactsTemplates(contactsList);
    },
    addTagsToTagInput(displayElementId, inputElementId) {
      let selectList = document.getElementById(displayElementId);
      let listLength = selectList.options.length;
      function getSelectedOptions(sel) {
        var opts = [],
          opt;
        // loop through options in select list
        for (var i = 0; i < listLength; i++) {
          opt = sel.options[i];
          // check if selected
          if (opt.selected) {
            // add to array of option elements to return from this function
            opts.push(opt);
          }
        }
        // return array containing references to selected option elements
        return opts.map((option) => option.value).join(",");
      }
      let selectedTags = getSelectedOptions(selectList);
      const tagInput = document.getElementById(inputElementId);
      tagInput.value = selectedTags;
    },
  };
})();
