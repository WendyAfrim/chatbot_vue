docker-up: 
	docker compose up -d

docker-down: 
	docker compose down

node-bash: 
	docker compose exec -it node /bin/sh