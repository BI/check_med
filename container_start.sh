#!/bin/sh
export > export.txt
echo "export RAILS_ENV=$RAILS_ENV" > default_env
echo "export SECRET_KEY_BASE=$SECRET_KEY_BASE" >> default_env
echo "export NODE_ENV=$NODE_ENV" >> default_env
echo "export GOOGLE_ANALYTICS_KEY=$GOOGLE_ANALYTICS_KEY" >> default_env
sudo mv default_env /etc/default/nginx
sudo /usr/sbin/service nginx start
