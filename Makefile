.PHONY: setup dev build start db-migrate db-seed docker-up docker-down

setup:
	npm install
	cp .env.example .env
	npx prisma migrate dev --name init
	npx tsx prisma/seed.ts

dev:
	npm run dev

build:
	npm run build

start:
	npm start

db-migrate:
	npx prisma migrate dev

db-seed:
	npx tsx prisma/seed.ts

docker-up:
	docker-compose up --build -d

docker-down:
	docker-compose down
