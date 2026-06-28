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
