GROUPID=$(shell xpath pom.xml "//project/groupId/text()" 2>/dev/null|awk -F. '{ print $$2 }')
NAME=$(shell xpath pom.xml "//project/name/text()" 2>/dev/null)
VERSION=$(shell xpath pom.xml "//project/version/text()" 2>/dev/null)
PORT=8080
LRPORT=35729
DBCONTAINER=pagacoin-db
JDKVER=8
JARGS=

DOCKER_IMG=$(GROUPID)-openjdk:$(JDKVER)-jdk-alpine

DOCKER_RUNARGS=--tty \
							 --workdir /root \
							 --volume $$(pwd):/root \
							 --publish $(PORT):$(PORT) \
							 --publish $(LRPORT):$(LRPORT) \
               --link $(DBCONTAINER) \
               --env dbhost=$(DBCONTAINER)

DC=$(shell which docker)
ifdef DC
DCR=$(DC) run $(DOCKER_RUNARGS) $(DOCKER_IMG)
endif

docker: 
ifdef DC
	$(DC) build --quiet --build-arg JDKVER=$(JDKVER) --tag $(DOCKER_IMG) .
endif

# Development
dev: db docker
	$(DCR) ./mvnw spring-boot:run $(JARGS)

# Maven build jar package
build: docker
	$(DCR) ./mvnw package $(JARGS)

# Standalone launch
run: db docker
	$(DCR) java -jar /root/target/$(NAME)-$(VERSION).jar
	
db:
  [[ $$($(DC) ps -f "name=$name" --format '{{.Names}}') == $(DBCONTAINER) ]] || $(DC) run --name "$(DBCONTAINER)" -d mongo:4.4.4-bionic

.PHONY: docker clean build run dev
