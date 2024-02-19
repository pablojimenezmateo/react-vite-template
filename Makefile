null:
    @:

ENV ?= dev

ifeq ($(ENV),dev)
COMPOSE_FILE = infra/dev/docker-compose.yml
else
$(error Invalid value for ENV: $(ENV))
endif

run:
	docker compose -f $(COMPOSE_FILE) up -d
build:
	docker compose -f $(COMPOSE_FILE) up --build -d
restart:
	docker compose -f $(COMPOSE_FILE) down
	docker compose -f $(COMPOSE_FILE) up --build -d
stop:
	docker compose -f $(COMPOSE_FILE) down