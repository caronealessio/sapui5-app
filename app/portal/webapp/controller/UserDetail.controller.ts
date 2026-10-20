import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";

/**
 * Parametri della route "userDetail".
 */
type UserDetailRouteArguments = {
	userId: string;
};

/**
 * Controller della vista UserDetail: mostra il form dell'utente indicato nell'URL.
 * @namespace my.portal.controller
 */
export default class UserDetail extends BaseController {

	/**
	 * Si registra sulla route "userDetail" per collegare la view all'utente richiesto.
	 */
	public onInit(): void {
		this.getRouter().getRoute("userDetail").attachPatternMatched(
			(oEvent: Route$PatternMatchedEvent) => this.onUserMatched(oEvent)
		);
	}

	/**
	 * Collega la view all'utente con l'ID ricevuto nella route e ricarica le liste di generi e ruoli.
	 * Se l'utente è lo stesso già mostrato, ne ricarica i dati dal servizio.
	 * Le modifiche nel form vengono inviate in automatico al servizio OData.
	 * @param oEvent evento di route raggiunta, con l'ID dell'utente tra gli argomenti
	 */
	private onUserMatched(oEvent: Route$PatternMatchedEvent): void {
		const mArguments = oEvent.getParameter("arguments") as UserDetailRouteArguments;
		const sPath = `/Users(${mArguments.userId})`;
		const oElementBinding = this.getView().getElementBinding() as ODataContextBinding | undefined;

		if (oElementBinding?.getPath() === sPath) {
			if (!oElementBinding.hasPendingChanges()) {
				oElementBinding.refresh();
			}
		} else {
			this.getView().bindElement({ path: sPath });
		}

		this.refreshList("genderSelect", "items");
		this.refreshList("roleSelect", "items");
	}
}
