import JSONModel from "sap/ui/model/json/JSONModel";
import BindingMode from "sap/ui/model/BindingMode";

import Device from "sap/ui/Device";


export default {
	/**
	 * Crea il modello in sola lettura con le informazioni sul dispositivo.
	 * @returns modello JSON del dispositivo
	 */
	createDeviceModel: () => {
		const oModel = new JSONModel(Device);
		oModel.setDefaultBindingMode(BindingMode.OneWay);
		return oModel;
	}
};
