import opaTest from "sap/ui/test/opaQunit";
import AppPage from "./pages/AppPage";

const onTheApp = new AppPage();

QUnit.module("Percorso di navigazione");

opaTest("Deve aprire il form dell'utente dalla pagina Utenti", function () {
	// Preparazione
	onTheApp.iStartMyUIComponent({
		componentConfig: {
			name: "my.portal"
		}
	});

	// Verifiche
	onTheApp.iShouldSeeTheSideNavigation();
	onTheApp.iShouldSeeTheUsersTable();

	// Azioni
	onTheApp.iSelectTheFirstUser();

	// Verifiche
	onTheApp.iShouldSeeTheUserForm();
});

opaTest("Deve passare alla pagina Ruoli dal menu laterale", function () {
	// Azioni
	onTheApp.iPressTheMenuItem("roles");

	// Verifiche
	onTheApp.iShouldSeeTheRolesTable();

	// Pulizia
	onTheApp.iTeardownMyApp();
});
