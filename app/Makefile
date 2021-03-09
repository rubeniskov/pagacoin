NODEVER=10.19.0
PORT=9966
CMD=docker run \
		-v $$(pwd):/root \
		-w /root \
		--entrypoint='' \
    	-p $(PORT):9966 \
		node:$(NODEVER)-alpine

install: 
	$(CMD) yarn install

build: install
	$(CMD) yarn build

run: 
	$(CMD) yarn start
