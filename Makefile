BASE_URL ?= https://dev.dagit.club
HEADLESS ?= true
IDENTITY ?= ''
ADDRESS ?= z4sgf-tgypl-idfay-yidkk-zyxsd-4vnko-pn4rn-pvqg7-wqu27-txgvf-cae
LATENCY ?= 500
SIGNATURE ?= $(shell date +%s)

BUILD_ENV ?= BASE_URL=$(BASE_URL) HEADLESS=$(HEADLESS) IDENTITY=$(IDENTITY) LATENCY=$(LATENCY) ADDRESS=$(ADDRESS) SIGNATURE=$(SIGNATURE)

node_modules:
	npm install

test: node_modules
	$(BUILD_ENV) npx playwright test --quiet
