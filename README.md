# docker-mongo-pipeline
A containerized full-stack lab for DevOps practice.
# Local DevOps Data Pipeline (V1)

A hybrid development environment bridging a local application with an isolated Docker infrastructure. This project serves as a practical, hands-on lab for understanding container networking, Linux compatibility, and database routing.

## 🏗 Architecture Overview

* **Application Layer (Host OS):** A lightweight HTML/Node.js web server running natively to allow rapid development and testing without container rebuilds.
* **Infrastructure Layer (Docker):** MongoDB and Mongo Express running inside a private Docker bridge network (`mongo-network`).
* **Bridge:** Controlled port mapping (`27017` and `8081`) allowing the local OS to communicate with the isolated containers.



## 🚀 Key DevOps Learnings & Debugging

* **Linux Kernel / Version Compatibility:** Discovered that modern MongoDB images (e.g., `latest` / 8.2) can silently fail on certain native Linux environments due to strict CPU microarchitecture and kernel requirements. Successfully debugged the silent crashes and downgraded to a rock-solid `mongo:4.4` image to guarantee host compatibility.
* **Internal Docker Networking:** Successfully routed traffic from a host-level Node backend into an isolated Docker bridge network without exposing the internal container hostnames to the host OS.
* **Technical Debt & Roadmap:** For this initial iteration, database storage is ephemeral (no Docker Volumes) and credentials are hardcoded into the Node.js backend. The next planned milestones for V2 are implementing persistent volumes and stripping credentials into a secure `.env` file injection system.

## 📋 Prerequisites

Ensure you have installed the necessary packages via your terminal:

```bash
# Example for Ubuntu
sudo apt update
sudo apt install docker.io nodejs npm
```
## 🛠️ Quick Start Guide

### 1. Provision the Infrastructure
Create the internal bridge network so the containers can securely talk to each other:
```bash
docker network create mongo-network
```
Spin up the database using the stable 4.4 version to avoid silent OS compatibility crashes:

```bash
docker run -d \
  --name mongodb \
  --net mongo-network \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:4.4
```
Spin up the Mongo Express web UI:

```bash
docker run -d \
  --name mongo-express \
  --net mongo-network \
  -p 8081:8081 \
  -e ME_CONFIG_MONGODB_URL="mongodb://admin:password@mongodb:27017" \
  mongo-express:latest
```
### 2. Launch the Application
Install the native Node.js dependencies and start the local server:

```bash
npm install
node server.js
```
### 3. Verify the Pipeline
* **Frontend App:** Visit `http://localhost:3000` to submit data from the host OS.
* **Database UI:** Visit `http://localhost:8081` to verify the data was securely routed into the containerized database.
