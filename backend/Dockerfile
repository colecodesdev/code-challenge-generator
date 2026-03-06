FROM python:3.13-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY pyproject.toml uv.lock ./

RUN pip install --no-cache-dir uv && \
    uv pip install --system --no-cache -r pyproject.toml

COPY . .

EXPOSE 8000

CMD ["python", "server.py"]