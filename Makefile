.PHONY: help install build run docker-build docker-up clean

help:
    @echo "Available commands:"
    @echo "  make install   - Install dependencies (frontend & backend)"
    @echo "  make build     - Build frontend and prepare backend"
    @echo "  make run       - Run development servers"
    @echo "  make docker-build - Build Docker images"
    @echo "  make docker-up    - Start containers with docker-compose"

install:
    @echo "Installing Frontend dependencies..."
    cd . && npm install
    @echo "Installing Backend dependencies..."
    cd server && pip install -r requirements.txt

build:
    @echo "Building Frontend..."
    npm run build
    @echo "Frontend built to ./dist"

run:
    @echo "Starting development servers..."
    # Vous pouvez utiliser concurrently ou deux terminaux ici
    npm run dev &
    cd server && python app.py

# Docker
docker-build:
    docker build -t harmony-app .

docker-up:
    docker-compose up -d

clean:
    rm -rf node_modules
    rm -rf server/__pycache__
    rm -rf dist