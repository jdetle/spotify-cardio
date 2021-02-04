// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";

const getToken = () => {
  const id = Cypress.env("SPOTIFY_CLIENT_ID");
  const secret = Cypress.env("SPOTIFY_CLIENT_SECRET");
  console.log("id", id, secret);
  if (!id || !secret) throw new Error("env vars misconfigured");
  if (localStorage.getItem("spotify-token") == null) {
    const request = {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      form: true,
      body: {
        grant_type: "client_credentials",
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString(
          "base64"
        )}`,
      },
    };
    cy.request(request).then((resp) => {
      localStorage.setItem("spotify-token", JSON.stringify(resp.body));
    });

    cy.visit(Cypress.env("host"));
  }
};

Cypress.Commands.add("getToken", getToken);
