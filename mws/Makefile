GROUPID=$(shell xpath pom.xml -e "//project/groupId/text()" 2>/dev/null|awk -F. '{ print $$2 }')
NAME=$(shell xpath pom.xml -e "//project/name/text()" 2>/dev/null)
VERSION=$(shell xpath pom.xml -e "//project/version/text()" 2>/dev/null)
PORT=8080
LRPORT=35729
DBCONTAINER=pagacoin-db
CONTAINERNAME=pagantis-api
JDKVER=8
JARGS=

DOCKER_IMG=$(GROUPID)-openjdk:$(JDKVER)-jdk-alpine

DOCKER_ARGS=--tty \
						--workdir /root \
						--volume $$(pwd):/root

DC=$(shell which docker)
ifdef DC
DCR=$(DC) run $(DOCKER_ARGS) $(DOCKER_IMG)
DCR_RUN=$(DC) run $(DOCKER_ARGS) \
        --detach \
        --rm --name $(CONTAINERNAME) \
        --publish $(PORT):$(PORT) \
        --publish $(LRPORT):$(LRPORT) \
        --link $(DBCONTAINER) \
        --env dbhost=$(DBCONTAINER) \
        $(DOCKER_IMG)
DCR_DEV=$(DC) run $(DOCKER_ARGS) \
        --tty \
        --publish $(PORT):$(PORT) \
        --publish $(LRPORT):$(LRPORT) \
        --link $(DBCONTAINER) \
        --env dbhost=$(DBCONTAINER) \
        $(DOCKER_IMG)
endif

docker: 
ifdef DC
	$(DC) build --quiet --build-arg JDKVER=$(JDKVER) --tag $(DOCKER_IMG) .
endif

db:
	[[ $$($(DC) ps -f "name=$$name" --format '{{.Names}}') == $(DBCONTAINER) ]] || \
    $(DC) run --rm --name $(DBCONTAINER) -d mongo:4.4.4-bionic

# Development
dev: db docker
	$(DCR_DEV) ./mvnw spring-boot:run $(JARGS)

# Maven build jar package
build: docker
	$(DCR) ./mvnw package $(JARGS)

# Standalone launch
run: db docker build
	$(DCR_RUN) java -jar /root/target/$(NAME)-$(VERSION).jar

.PHONY: docker clean build run dev
