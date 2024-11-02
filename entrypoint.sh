#!/bin/bash

# Wait for dependent services
echo "Waiting for dependencies..."
/app/wait-for-it.sh db:5432 -- echo "Database is up"
/app/wait-for-it.sh redis:6379 -- echo "Redis is up"
/app/wait-for-it.sh mqtt:1883 -- echo "MQTT is up"

# Choose the start command based on the service
case "$SERVICE_NAME" in
  "app")
    echo "Starting the main application..."
    # exec ls node_modules/
    # exec ls /app/apps/api/node_modules/
    # cd /app/apps/api
    cd /app/apps/api/ && yarn install && yarn dev
    ;;
  "mqtt-listener")
    echo "Starting the MQTT listener..."
    /app/wait-for-it.sh app:3000 -- echo "App is up"
    yarn start-mqtt
    ;;
  "queue-processor")
    echo "Starting the queue processor..."
    /app/wait-for-it.sh app:3000 -- echo "App is up"
    yarn start-queue-processor
    ;;
  *)
    echo "Unknown service name: $SERVICE_NAME"
    exit 1
    ;;
esac
