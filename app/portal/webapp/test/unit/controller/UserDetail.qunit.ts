import UserDetail from "my/portal/controller/UserDetail.controller";

QUnit.module("Test del controller UserDetail");

QUnit.test("Il controller UserDetail ha il metodo onInit", function (assert) {
	// Verifica di base: controlla che il metodo "onInit" esista
	assert.strictEqual(typeof UserDetail.prototype.onInit, "function");
});
