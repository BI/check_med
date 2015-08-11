#!/bin/sh
sudo npm install -g webpack
sudo npm install
webpack -d --display-reasons --display-chunks --progress

webpack --config webpack.config.production.js
bundle exec rake assets:precompile

