GROUPID=pagantis
NAME=pagacoin
VERSION=0.0.1
BUILD=SNAPSHOT
PORT=8080
LRPORT=35729

JDKVER=8
JARGS=-DgroupId=com.$(GROUPID).$(NAME) \
      -Dname=$(NAME) \
      -Dversion=$(VERSION) \
			-Dbuild=$(BUILD)

DOCKER_IMG=$(GROUPID)-openjdk:$(JDKVER)-jdk-alpine

DOCKER_RUNARGS=--tty \
               --workdir /root \
               --volume $$(pwd):/root \
						   --publish $(PORT):$(PORT) \
						   --publish $(LRPORT):$(LRPORT)

DC=$(shell which docker)
ifdef DC
DCR=$(DC) run $(DOCKER_RUNARGS) $(DOCKER_IMG)
endif

docker: 
ifdef DC
	$(DC) build --quiet --build-arg JDKVER=$(JDKVER) --tag $(DOCKER_IMG) .
endif

# Development
dev: docker
	$(DCR) ./mvnw spring-boot:run $(JARGS)

# Maven build jar package
build: docker
	$(DCR) ./mvnw package $(JARGS)

# Standalone launch
run: docker
	$(DCR) java -jar /root/target/$(NAME)-$(VERSION)-$(BUILD).jar

# docker run -p 27017:27017 --name pagacoin-db -d mongo:3.6.22-xenial  

.PHONY: docker clean build run dev
