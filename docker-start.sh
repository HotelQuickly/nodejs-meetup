#!/bin/bash
while ! nc -z data 3306; do
  sleep 2
  echo "waiting for data"
done

if [ "$1" = "test" ]; then
  echo "running tests"
  npm test
else
  echo "starting application"
  npm start
fi