#!/bin/sh

if [ "$1" = 'test' ]; then
  echo "Running tests..."
  npm test
else
  echo "Starting application..."
  npm start
fi
