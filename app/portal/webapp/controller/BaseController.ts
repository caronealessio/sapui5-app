import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import AppComponent from "../Component";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Router from "sap/ui/core/routing/Router";
import History from "sap/ui/core/routing/History";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";

/**
 * Controller base con i metodi di utilità comuni a tutti i controller dell'applicazione.
 * @namespace my.portal.controller
 */
export default abstract class BaseController extends Controller {
	/**
	 * Restituisce il componente a cui appartiene la view del controller.
	 * @returns il componente dell'applicazione
	 */
	public getOwnerComponent(): AppComponent {
		return super.getOwnerComponent() as AppComponent;
	}

	/**
	 * Restituisce il router del componente.
	 * @returns il router
	 */
	public getRouter(): Router {
		return UIComponent.getRouterFor(this);
	}

	/**
	 * Restituisce il resource bundle i18n del componente.
	 * @returns promise risolta con il resource bundle i18n
	 */
	public getResourceBundle(): Promise<ResourceBundle> {
		const oModel = this.getOwnerComponent().getModel("i18n") as ResourceModel;
		return oModel.getResourceBundle() as Promise<ResourceBundle>;
	}

	/**
	 * Restituisce un modello della view in base al nome.
	 * @param [sName] nome del modello; se omesso restituisce il modello di default
	 * @returns il modello
	 */
	public getModel(sName?: string): Model {
		return this.getView().getModel(sName);
	}

	/**
	 * Imposta un modello sulla view.
	 * @param oModel il modello da impostare
	 * @param [sName] nome del modello
	 * @returns il controller corrente, per concatenare le chiamate
	 */
	public setModel(oModel: Model, sName?: string): BaseController {
		this.getView().setModel(oModel, sName);
		return this;
	}

	/**
	 * Ricarica dal servizio la lista legata a un'aggregazione di un controllo della view
	 * (es. le righe di una tabella o le voci di una Select).
	 * Se ci sono modifiche non ancora inviate la lista non viene ricaricata, per non perderle.
	 * @param sControlId ID del controllo nella view
	 * @param sAggregationName nome dell'aggregazione legata alla lista (es. "rows", "items")
	 */
	protected refreshList(sControlId: string, sAggregationName: string): void {
		const oBinding = this.byId(sControlId)?.getBinding(sAggregationName) as ODataListBinding | undefined;
		if (oBinding && !oBinding.hasPendingChanges()) {
			oBinding.refresh();
		}
	}

	/**
	 * Naviga verso una route dell'applicazione.
	 * @param sName nome della route
	 * @param [oParameters] parametri di navigazione
	 * @param [bReplace] se true sostituisce la voce corrente nella cronologia del browser invece di aggiungerne una nuova
	 */
	public navTo(sName: string, oParameters?: object, bReplace?: boolean): void {
		this.getRouter().navTo(sName, oParameters, undefined, bReplace);
	}

	/**
	 * Torna indietro: se c'è una voce nella cronologia del browser torna alla pagina precedente,
	 * altrimenti naviga alla route principale sostituendo la voce corrente.
	 */
	public onNavBack(): void {
		const sPreviousHash = History.getInstance().getPreviousHash();
		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			this.getRouter().navTo("users", {}, undefined, true);
		}
	}
}
