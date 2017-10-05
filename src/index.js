const axios = require("axios");
const { JSDOM } = require("jsdom");
const inquirer = require("inquirer");

const questions = [
  {
    type: "list",
    name: "protocol",
    message: "http or https?",
    choices: ["http", "https"]
  },
  {
    type: "input",
    name: "address",
    message: "What's the address?"
  }
];

const questionsToUrlString = ({ protocol, address }) =>
  `${protocol}://${address}`;

const documentToAnchors = document => document.querySelectorAll("a");

const pickHref = ({ href }) => href;

const resToHtmlDocument = ({ data }) => new JSDOM(data).window.document;

const htmlDocumentToArrayOfHref = document =>
  Array.from(documentToAnchors(document)).map(pickHref);

const getHtmlDocument = url => axios.get(url).then(resToHtmlDocument);

// eslint-disable-next-line no-console
const onSuccessPut = data => console.log(data);

// eslint-disable-next-line no-console
const onErrorPut = error => console.error(error);

inquirer
  .prompt(questions)
  .then(questionsToUrlString)
  .then(getHtmlDocument)
  .then(htmlDocumentToArrayOfHref)
  .then(onSuccessPut)
  .catch(onErrorPut);
