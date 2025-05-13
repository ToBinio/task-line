build version:
    docker build -t task-line:{{version}} .

publish version: (build version)
    docker tag task-line:{{version}} ghcr.io/tobinio/task-line:{{version}}
    docker push ghcr.io/tobinio/task-line:{{version}}
