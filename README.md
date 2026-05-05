# Code Challenge Generator

## Overview

A full-stack AI web app that generates multiple-choice programming challenges via OpenAI, deployed on AWS as a portfolio demonstration of containerized API delivery and OIDC-based CI/CD.

<p align="center">
  <img src="docs/app-screenshot.png" width="800" alt="screenshot of code challenge generator">
</p>

---

## Tech Stack

- React 19 + Vite
- React Router
- FastAPI + SQLAlchemy
- SQLite
- OpenAI API
- AWS S3 + CloudFront + EC2 + ECR
- GitHub Actions (OIDC)

---

## Run Locally

```
git clone https://github.com/colecodesdev/code-challenge-generator.git
cd code-challenge-generator

cd backend
uv sync
uv run python server.py

cd ../frontend
npm install
npm run dev
```

---

## Live Preview

Production URL: https://d1tsfobuj7g5p2.cloudfront.net
