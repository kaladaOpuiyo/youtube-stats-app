FROM centos:7

RUN yum -y install epel-release
RUN yum -y install make which npm

RUN npm install -g n
RUN n 6.10.2


COPY package*.json ./

WORKDIR /usr/src/

COPY . . 

RUN npm rebuild

EXPOSE 8090
CMD [ "npm", "start" ]
