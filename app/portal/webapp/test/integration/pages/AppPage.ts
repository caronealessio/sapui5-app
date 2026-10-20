import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import PropertyStrictEquals from "sap/ui/test/matchers/PropertyStrictEquals";
import UI5Element from "sap/ui/core/Element";
import Table from "sap/ui/table/Table";

const APP_VIEW_NAME = "my.portal.view.App";
const USERS_VIEW_NAME = "my.portal.view.Users";
const USER_DETAIL_VIEW_NAME = "my.portal.view.UserDetail";
const ROLES_VIEW_NAME = "my.portal.view.Roles";
const USERS_COLUMN_COUNT = 6;

/**
 * Page object OPA dell'applicazione: menu laterale, pagina Utenti e pagina Ruoli.
 */
export default class AppPage extends Opa5 {
	// Azioni

	/**
	 * Preme la voce del menu laterale con la chiave indicata.
	 * @param sKey chiave della voce del menu (coincide con il nome della route)
	 */
	iPressTheMenuItem(sKey: string) {
		this.waitFor({
			controlType: "sap.tnt.NavigationListItem",
			viewName: APP_VIEW_NAME,
			matchers: new PropertyStrictEquals({ name: "key", value: sKey }),
			actions: new Press(),
			errorMessage: `Voce di menu "${sKey}" non trovata`
		});
	}

	/**
	 * Seleziona la prima riga della tabella degli utenti, se presente, aprendo il form dell'utente.
	 */
	iSelectTheFirstUser() {
		this.waitFor({
			id: "usersTable",
			viewName: USERS_VIEW_NAME,
			actions: function (oElement: UI5Element) {
				const oTable = oElement as Table;
				// Seleziona la prima riga solo se la tabella ha dei dati
				if (oTable.getRows().length > 0) {
					oTable.setSelectedIndex(0);
					oTable.fireRowSelectionChange({
						rowIndex: 0,
						rowContext: oTable.getRows()[0].getBindingContext(),
						userInteraction: true
					});
				}
			},
			errorMessage: "Tabella degli utenti non trovata"
		});
	}

	// Verifiche

	/**
	 * Verifica che sia visualizzato il menu laterale.
	 */
	iShouldSeeTheSideNavigation() {
		this.waitFor({
			id: "sideNavigation",
			viewName: APP_VIEW_NAME,
			success: function (oElement: UI5Element) {
				Opa5.assert.ok(oElement, "Il menu laterale è visualizzato");
			},
			errorMessage: "Menu laterale non trovato"
		});
	}

	/**
	 * Verifica che sia visualizzata la tabella degli utenti con tutte le colonne.
	 */
	iShouldSeeTheUsersTable() {
		this.waitFor({
			id: "usersTable",
			viewName: USERS_VIEW_NAME,
			success: function (oElement: UI5Element) {
				const oTable = oElement as Table;
				Opa5.assert.equal(oTable.getColumns().length, USERS_COLUMN_COUNT, "La tabella degli utenti ha tutte le colonne");
			},
			errorMessage: "Tabella degli utenti non trovata"
		});
	}

	/**
	 * Verifica che sia visualizzata la vista UserDetail con il form dell'utente.
	 */
	iShouldSeeTheUserForm() {
		this.waitFor({
			id: "userForm",
			viewName: USER_DETAIL_VIEW_NAME,
			success: function (oElement: UI5Element) {
				Opa5.assert.ok(oElement, "Il form dell'utente è visualizzato");
			},
			errorMessage: "Form dell'utente non trovato"
		});
	}

	/**
	 * Verifica che sia visualizzata la tabella dei ruoli.
	 */
	iShouldSeeTheRolesTable() {
		this.waitFor({
			id: "rolesTable",
			viewName: ROLES_VIEW_NAME,
			success: function (oElement: UI5Element) {
				Opa5.assert.ok(oElement, "La tabella dei ruoli è visualizzata");
			},
			errorMessage: "Tabella dei ruoli non trovata"
		});
	}
}
