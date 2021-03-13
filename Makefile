build: 
	$(MAKE) -C mws build
	$(MAKE) -C app build

run: 
	$(MAKE) -C mws run &
	$(MAKE) -C app run

dev: 
	$(MAKE) -C mws dev &
	$(MAKE) -C app dev
	