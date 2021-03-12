# Pagacoin Micro Web Service
## Development

```
$ make dev
```
![./docs/shell.output.make.dev.png](./docs/shell.output.make.dev.png)

```
$ make build
```
![./docs/shell.output.make.build.png](./docs/shell.output.make.build.png)

```
$ make run
```
![./docs/shell.output.make.run.png](./docs/shell.output.make.run.png)

All the above commands can be performanced in local enviroment instead of using docker if you pass DC='' to make

Ex:

```
$ make dev DC='';
```

## Misc

There is a postman collection available to inspect the api endpoints on `postman` directory.

![./docs/postman.collection.png](./docs/postman.collection.png)

