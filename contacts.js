const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");
const { getListContacts } = require("./contactsList");
const { updateContactsList } = require("./updateContacts");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  const contactList = await getListContacts();
  console.table(contactList);
};

const getContactById = async (contactId) => {
  const contactList = await getListContacts();
  const contactsById = contactList.find((contact) => contact.id === contactId);
  if (contactsById === undefined) {
    console.log("contact is not found");
    return;
  }
  console.table(contactsById);
};

const removeContact = async (contactId) => {
  const contacts = await getListContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    console.log("contact is not found");
    return;
  }
  const [removedContact] = contacts.splice(index, 1);
  await updateContactsList(contacts);
  console.table(contacts);
};

const addContact = async (name, email, phone) => {
  const contacts = await getListContacts();
  const updatedList = contacts.push({
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  });
  await updateContactsList(contacts);
  console.table(contacts);
};

module.exports = { listContacts, getContactById, removeContact, addContact };

// # Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
// node index.js --action="list"

// # Отримуємо контакт по id
// node index.js --action="get" --id=5

// # Додаємо контакт
// node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"

// # Видаляємо контакт
// node index.js --action="remove" --id=3
