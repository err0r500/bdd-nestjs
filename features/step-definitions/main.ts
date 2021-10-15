import { Given, Then, When } from '@cucumber/cucumber';

Given('some customers exist:', async function (dataTable) {
  console.log(dataTable)
  return 'pending';
});

Given('some drivers exist:', async function (dataTable) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given("I'm authenticated as the customer {string}", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('the balance on my account is {string} euros', async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When(
  "when I attempt to order driver's {string} cab from {string} to {string}",
  async function (string, string2, string3) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  },
);

Then('booking is effective', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the balance of my account is {string} euros', async function (string) {
  return 'pending';
});
