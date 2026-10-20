import BaseController from "./BaseController";
import SideNavigation, { SideNavigation$ItemSelectEvent } from "sap/tnt/SideNavigation";
import NavigationListItem from "sap/tnt/NavigationListItem";
import ToolPage from "sap/tnt/ToolPage";
import { Router$RouteMatchedEvent } from "sap/ui/core/routing/Router";

// Voce del menu da evidenziare per le route che non hanno una voce propria
const MENU_KEY_BY_ROUTE: Record<string, string> = {
	userDetail: "users"
};

/**
 * Controller della view radice: gestisce il menu laterale e la navigazione tra le pagine.
 * @namespace my.portal.controller
 */
export default class App extends BaseController {

	/**
	 * Applica la densità dei contenuti e sincronizza il menu laterale con la route corrente.
	 */
	public onInit(): void {
		this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		this.getRouter().attachRouteMatched((oEvent: Router$RouteMatchedEvent) => this.onRouteMatched(oEvent));
	}

	/**
	 * Naviga verso la pagina corrispondente alla voce selezionata nel menu.
	 * La chiave di ogni voce coincide con il nome della route.
	 * @param oEvent evento di selezione della voce del menu
	 */
	public onSideNavigationItemSelect(oEvent: SideNavigation$ItemSelectEvent): void {
		const oItem = oEvent.getParameter("item") as NavigationListItem;
		this.navTo(oItem.getKey());
	}

	/**
	 * Apre o chiude il menu laterale.
	 */
	public onSideNavigationToggle(): void {
		const oToolPage = this.byId("toolPage") as ToolPage;
		oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
	}

	/**
	 * Evidenzia nel menu la voce della route appena raggiunta (es. aprendo direttamente l'URL).
	 * Per il form dell'utente resta evidenziata la voce Utenti.
	 * @param oEvent evento di route raggiunta del router
	 */
	private onRouteMatched(oEvent: Router$RouteMatchedEvent): void {
		const oSideNavigation = this.byId("sideNavigation") as SideNavigation;
		const sRouteName = oEvent.getParameter("name");
		oSideNavigation.setSelectedKey(MENU_KEY_BY_ROUTE[sRouteName] ?? sRouteName);
	}
}
