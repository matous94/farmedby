import { Endpoints } from "../../endpoints";
import { Routes } from "../../routes";

describe("User account", () => {
  let farm: { objectId: string };

  beforeEach(() => {
    cy.signUp("temporaryUser");

    cy.createFarm().then((createFarmResponse) => {
      farm = createFarmResponse.body.result as { objectId: string };
      cy.visit(`/farm/${farm.objectId}/user`);
    });
  });

  it("should destroy user and farm account", () => {
    cy.url().should("eq", Routes.userAccountPage(farm.objectId).absolute);
    cy.intercept(Endpoints.destroyUserAndFarm().absolute).as(
      "destroyUserAndFarm"
    );

    cy.getByTestId("destroy-account-button")
      .click()
      .getByTestId("dialog-primary-button")
      .click();

    cy.wait("@destroyUserAndFarm").then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      cy.url().should("eq", Routes.homePage().absolute);
    });
  });
});
