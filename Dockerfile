FROM barquin/docker:ruby2_passenger_node_nginx 
MAINTAINER Venka Ashtakala "vashtakala@barquin.com"

EXPOSE 80
ADD config/docker/nginx/opt/nginx/conf/nginx.conf /opt/nginx/conf/nginx.conf

##Rails application setup
USER rails
RUN mkdir -p /home/rails/webapp
ADD . /home/rails/webapp
RUN mkdir -p /home/rails/webapp/node_modules; sudo rm -Rf /home/rails/webapp/node_modules
RUN sudo chown -hR rails:sudo /home/rails/webapp
RUN sudo chmod -R 777 /home/rails/webapp
WORKDIR /home/rails/webapp
RUN bundle install --local
RUN ./setup.sh

#CMD /usr/sbin/service nginx start; tail -f /opt/nginx/logs/access.log
CMD cd ~/webapp; ~/webapp/container_start.sh; tail -f /opt/nginx/logs/access.log

