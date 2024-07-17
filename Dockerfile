# ---- Base Node ----
FROM node:7.10
USER root

ENV HOME=/home/app
WORKDIR $HOME/cms-frontend

RUN npm cache clear --force
RUN npm install pm2@3.2.2 -g --depth 0 --silent --no-summary
RUN npm install express compression helmet@3.21.3 --depth 0 --silent --no-summary
COPY . $HOME/cms-frontend/
# RUN npm install --force --depth 0 --silent --no-summary; npm run build
# Local Build
EXPOSE 8001
CMD ["pm2", "start", "app.js", "--no-daemon"]    
