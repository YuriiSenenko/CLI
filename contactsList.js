const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

const getListContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = { getListContacts };
