import UIComponent from "sap/ui/core/UIComponent";
import models from "./model/models";
import Device from "sap/ui/Device";

/**
 * Componente principale dell'applicazione Portale.
 * @namespace my.portal
 */
export default class Component extends UIComponent {
	public static metadata = {
		manifest: "json",
		interfaces: ["sap.ui.core.IAsyncContentCreation"]
	};

	private sContentDensityClass: string;

	/**
	 * Inizializza il componente: crea il modello del dispositivo e avvia il router.
	 */
	public init(): void {
		// Inizializzazione del componente base
		super.init();

		// Modello con le informazioni sul dispositivo
		this.setModel(models.createDeviceModel(), "device");

		// Crea le view in base all'URL/hash
		this.getRouter().initialize();
	}

	/**
	 * Determina la classe CSS della densità dei contenuti (sapUiSizeCompact o sapUiSizeCozy),
	 * che influisce sulle dimensioni di alcuni controlli.
	 * @returns la classe CSS da applicare, oppure una stringa vuota se è già impostata dal Launchpad
	 */
	public getContentDensityClass(): string {
		if (this.sContentDensityClass === undefined) {
			// Se il Launchpad ha già impostato la densità non si fa nulla
			if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
				this.sContentDensityClass = "";
			} else if (!Device.support.touch) {
				// Modalità "compact" sui dispositivi senza touch
				this.sContentDensityClass = "sapUiSizeCompact";
			} else {
				// Modalità "cozy" sui dispositivi touch, necessaria anche per controlli desktop come sap.ui.table.Table
				this.sContentDensityClass = "sapUiSizeCozy";
			}
		}
		return this.sContentDensityClass;
	}
}
