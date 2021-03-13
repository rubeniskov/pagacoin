NODEVER=10.19.0
PORT=9966
CMD=docker run \
    --tty \
		-v $$(pwd):/root \
		-w /root \
    --link pagantis-api \
    --env PAGANTIS_API=pagantis-api:8080 \
		--entrypoint='' \
    --publish $(PORT):9966 \
		node:$(NODEVER)-alpine

install: 
	$(CMD) yarn install

build: install
	$(CMD) yarn build

run: install
	$(CMD) yarn start
