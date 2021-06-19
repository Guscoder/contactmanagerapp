export const ContactsAPI = (function () {
  function formDataToJson(formData) {
    const json = {};
    for (const pair of formData.entries()) {
      if (pair[0] === "tags") {
        json[pair[0]] = pair[1].replace(/\s+/g, "");
      } else {
        json[pair[0]] = pair[1];
      }
    }

    return json;
  }
  return {
    async getContacts() {
      const response = await fetch("api/contacts");
      const responseData = await response.json();
      return responseData;
    },
    async addContact(formData) {
      const data = formDataToJson(formData);
      const response = await fetch("api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response;
      // return responseData;
    },
    async getSingleContact(id) {
      const response = await fetch(`api/contacts/${id}`);
      const responseData = await response.json();
      return responseData;
    },
    async editContact(id, formData) {
      const data = formDataToJson(formData);

      const response = await fetch(`api/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    },
    async removeContact(id) {
      const response = await fetch(`api/contacts/${id}`, {
        method: "DELETE",
      });
      const responseData = await response;
    },
  };
})();
