#!/usr/bin/env node
'use strict';

// Init/scaffolding script for setting up a babel-transpiled
// environment on potentially-ES5 NodeJS versions

// TODO: In NODE_ENV=production, use a pre-babel'd build/ directoy
require('localenv');
require('debug').enable(process.env.DEBUG);
require('babel-register');
