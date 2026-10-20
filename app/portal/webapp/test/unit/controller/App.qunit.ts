import App from "my/portal/controller/App.controller";

QUnit.module("Test del controller App");

QUnit.test("Il controller App gestisce la selezione del menu laterale", function (assert) {
	// Verifica di base: controlla che l'handler del menu laterale esista
	assert.strictEqual(typeof App.prototype.onSideNavigationItemSelect, "function");
});
