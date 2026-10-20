import BaseController from "./BaseController";
import Table, { Table$RowSelectionChangeEvent } from "sap/ui/table/Table";
import Panel from "sap/m/Panel";

/**
 * Controller della pagina Ruoli: elenco dei ruoli e dettaglio del ruolo selezionato.
 * @namespace my.portal.controller
 */
export default class Roles extends BaseController {

	/**
	 * Si registra sulla route "roles" per ripulire la pagina e ricaricare l'elenco a ogni ingresso.
	 */
	public onInit(): void {
		this.getRouter().getRoute("roles").attachPatternMatched(() => this.onRolesMatched());
	}

	/**
	 * Chiude il dettaglio, annulla la selezione e ricarica l'elenco dei ruoli dal servizio.
	 * Il dettaglio va chiuso perché il ricaricamento sostituisce le righe a cui era collegato.
	 */
	private onRolesMatched(): void {
		const oDetailPanel = this.byId("detailPanel") as Panel;
		oDetailPanel.setVisible(false);
		oDetailPanel.setBindingContext(null);
		(this.byId("rolesTable") as Table).clearSelection();
		this.refreshList("rolesTable", "rows");
	}

	/**
	 * Collega il pannello di dettaglio al ruolo selezionato nella tabella
	 * e lo nasconde quando la selezione viene rimossa.
	 * @param oEvent evento di cambio selezione della tabella
	 */
	public onRowSelectionChange(oEvent: Table$RowSelectionChangeEvent): void {
		const oTable = oEvent.getSource<Table>();
		const oDetailPanel = this.byId("detailPanel") as Panel;
		const bHasSelection = oTable.getSelectedIndices().length > 0;

		oDetailPanel.setBindingContext(bHasSelection ? oEvent.getParameter("rowContext") : null);
		oDetailPanel.setVisible(bHasSelection);
	}
}
