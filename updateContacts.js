const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

const updateContactsList = async (contactList) => {
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
};

module.exports = { updateContactsList };
