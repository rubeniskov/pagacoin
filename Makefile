build: 
	$(MAKE) -C ws build
	$(MAKE) -C app build

run: 
	$(MAKE) -C ws run &
	$(MAKE) -C app run

dev: 
	$(MAKE) -C ws dev &
	$(MAKE) -C app dev
	