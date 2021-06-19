import { UICtrl } from "./modules/UICtrl.js";
import { TagCtrl } from "./modules/TagCtrl.js";

class App {
  // Load event listeners
  bindEventListeners = () => {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    const searchBarInput = document.getElementById(UISelectors.searchBar);
    const contactForm = document.getElementById(UISelectors.addContactForm);
    const addContactButton = document.getElementById(
      UISelectors.addContactButton
    );

    // Add item event

    searchBarInput.addEventListener("keyup", (e) => {
      let searchIinput = searchBarInput.value;
      this.filterContactsBySearch(searchIinput);
    });

    contactForm.addEventListener("submit", (e) => {
      this.addContactSubmit(e);
      contactForm.reset();
      this.cancelAddContact();
    });

    addContactButton.addEventListener("click", (e) => {
      this.displayAddContactForm(e);
      this.renderTagOptions("selectTag");
      document.getElementById("selectTag").addEventListener("change", (e) => {
        UICtrl.addTagsToTagInput("selectTag", "createTagInput");
      });
    });
    document
      .getElementById(UISelectors.tagSelect)
      .addEventListener("change", (e) => {
        this.filterContactsByTag(e.target.value);
      });
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("editContactButton")) {
        this.editContactSubmit(e);
      }
    });
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("deleteContactButton")) {
        this.deleteContactSubmit(e);
      }
    });
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("cancelAddButton")) {
        this.cancelAddContact();
      }
    });
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("cancelEditButton")) {
        this.cancelEditContact();
      }
    });
  };

  addContactSubmit = (e) => {
    let contactData = new FormData(form);
    UICtrl.addNewContact(contactData);
    UICtrl.populateContactsList();
    this.renderTagOptions("tagSelect");
    e.preventDefault();
  };
  deleteContactSubmit = (e) => {
    UICtrl.deleteContact(e);
  };
  displayContacts = () => {
    UICtrl.populateContactsList();
  };
  editContactSubmit = (e) => {
    UICtrl.editContact(e);
    this.renderTagOptions("editSelectTag");
  };
  displayAddContactForm = (e) => {
    document.getElementById("addContactDisplay").classList.add("slidemeup");
    document.getElementById("addContactDisplay").classList.remove("hide");
    document.querySelector(".main-header").classList.remove("slidemeup");
  };
  cancelEditContact = () => {
    document.querySelector(".main-header").classList.add("slidemeup");
    setTimeout(() => {
      document.querySelector("#displayEditForm").classList.remove("slidemeup");
      document.querySelector("#displayEditForm").classList.add("hide");
      document.querySelector("#displayEditForm").innerHTML = "";
    }, 900);
  };
  cancelAddContact = () => {
    document.querySelector(".main-header").classList.add("slidemeup");
    setTimeout(() => {
      document
        .querySelector(".addContactDisplay")
        .classList.remove("slidemeup");
    }, 1000);
  };
  async renderTagOptions(displayId) {
    const tagManager = new TagCtrl();
    let allTags = await tagManager.tags;
    UICtrl.renderTagOptions(allTags, displayId);
  }
  filterContactsByTag = (tag) => {
    UICtrl.displayContactsByTagFilter(tag);
  };
  filterContactsBySearch = (searchString) => {
    UICtrl.searchContacts(searchString);
  };
  init() {
    this.bindEventListeners();
    this.displayContacts();
    this.renderTagOptions("tagSelect");
  }
}

const AppManager = new App();

document.addEventListener("DOMContentLoaded", AppManager.init());
