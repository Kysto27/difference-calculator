#!/usr/bin/env node

import { program } from 'commander';
import diff from '../src/index.js';


program
.version('0.0.1')
.description(`Compares two configuration files and shows a difference.`)
.argument('<filepath1>')
.argument('<filepath2>')
.option('-f, --format <type>', 'output format')
.action(diff)
.parse(process.argv);