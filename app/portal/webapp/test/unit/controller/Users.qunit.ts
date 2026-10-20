import Users from "my/portal/controller/Users.controller";

QUnit.module("Test del controller Users");

QUnit.test("Il controller Users ha il metodo onRowSelectionChange", function (assert) {
	// Verifica di base: controlla che il metodo "onRowSelectionChange" esista
	assert.strictEqual(typeof Users.prototype.onRowSelectionChange, "function");
});
