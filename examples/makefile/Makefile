build: flim rsync 

flim:
	@./node_modules/flim/bin/flim generate

rsync: 
	@rsync -aq --exclude='_*' ./src/ ./build

server:
	@./node_modules/http-server/bin/http-server ./build
