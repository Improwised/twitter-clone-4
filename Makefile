# node modules in executable path
PATH := node_modules/.bin:$(PATH)

# OSX requires this variable exported so that PATH is also exported.
SHELL := /bin/bash

JS_SRC = $(shell find . -type f -name '*.js' ! -path './node_modules/*')
JSON_SRC = $(shell find . -type f -name '*.json' ! -path './node_modules/*')

.PHONY: lint test test-ci

lint:
	jsonlint -q -c ${JSON_SRC}
	eslint ${JS_SRC} ${ESLINT_ARGS}

install:
	npm i

test-ci:
	PORT=3000 \
	NODE_ENV=test \
	PGDB_TCP_PORT=5432 \
	PGDB_TCP_HOST=127.0.0.1 \
	PGDB_USER=postgres \
	PGDB_PASS=hello \
	PGDB_DB=testing \
	make test

test:
	mocha

run:
	node app
