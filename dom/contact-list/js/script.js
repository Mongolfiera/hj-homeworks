'use strict'

const contacts = JSON.parse(loadContacts());
const contactsList = document.querySelector('.contacts-list');
let output = '';

for (const contact of contacts) {
  output += `\n<li data-email=\"${contact.email}\" data-phone=\"${contact.phone}\">\n\t<strong>${contact.name}</strong>\n</li>`;
}

contactsList.innerHTML = output;
