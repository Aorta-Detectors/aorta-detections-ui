#!/bin/zsh
docker build -t madouma2/aorta_detection_ui:latest .
docker-compose up -d --force-recreate