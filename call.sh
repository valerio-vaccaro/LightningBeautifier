#!/bin/sh
lightning-cli listpeers | node listpeers.js | dot -Tpng -olistpeers.png
