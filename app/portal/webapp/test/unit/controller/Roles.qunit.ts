import Roles from "my/portal/controller/Roles.controller";

QUnit.module("Test del controller Roles");

QUnit.test("Il controller Roles ha il metodo onRowSelectionChange", function (assert) {
	// Verifica di base: controlla che il metodo "onRowSelectionChange" esista
	assert.strictEqual(typeof Roles.prototype.onRowSelectionChange, "function");
});
