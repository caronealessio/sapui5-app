import BaseController from "./BaseController";
import Table, { Table$RowSelectionChangeEvent } from "sap/ui/table/Table";
import { RowActionItem$PressEvent } from "sap/ui/table/RowActionItem";
import Context from "sap/ui/model/Context";

/**
 * Controller della pagina Utenti: elenco degli utenti e navigazione al form dell'utente.
 * @namespace my.portal.controller
 */
export default class Users extends BaseController {

	/**
	 * Si registra sulla route "users" per ricaricare l'elenco a ogni ingresso nella pagina.
	 */
	public onInit(): void {
		this.getRouter().getRoute("users").attachPatternMatched(() => this.refreshList("usersTable", "rows"));
	}

	/**
	 * Apre il form dell'utente della riga cliccata e annulla la selezione,
	 * così al ritorno la tabella è pulita.
	 * @param oEvent evento di cambio selezione della tabella
	 */
	public onRowSelectionChange(oEvent: Table$RowSelectionChangeEvent): void {
		const oTable = oEvent.getSource<Table>();
		if (oTable.getSelectedIndices().length === 0) {
			return;
		}
		this.navToUserDetail(oEvent.getParameter("rowContext"));
		oTable.clearSelection();
	}

	/**
	 * Apre il form dell'utente quando si preme la freccia di navigazione della riga.
	 * @param oEvent evento di pressione dell'azione di riga
	 */
	public onRowActionPress(oEvent: RowActionItem$PressEvent): void {
		this.navToUserDetail(oEvent.getParameter("row").getBindingContext());
	}

	/**
	 * Naviga alla vista UserDetail dell'utente indicato.
	 * @param oContext contesto di binding dell'utente
	 */
	private navToUserDetail(oContext: Context | null | undefined): void {
		if (!oContext) {
			return;
		}
		this.navTo("userDetail", { userId: oContext.getProperty("ID") as string });
	}
}
