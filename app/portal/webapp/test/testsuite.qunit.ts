import type {SuiteConfiguration} from "sap/ui/test/starter/config";
export default {
	name: "Suite di test QUnit: my.portal",
	defaults: {
		page: "ui5://test-resources/my/portal/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 4
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: ["my/portal/"],
			never: ["test-resources/my/portal/"]
		},
		loader: {
			paths: {
				"my/portal": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Test unitari di my.portal"
		},
		"integration/opaTests": {
			title: "Test di integrazione di my.portal"
		}
	}
} satisfies SuiteConfiguration;
