#!/bin/sh
# Create .env file from environment variables

# Create .env file
> .env

# Write all environment variables to .env
env | grep -v '^_' | while IFS='=' read -r key value; do
  if [ -n "$key" ] && [ -n "$value" ]; then
    echo "${key}=${value}" >> .env
  fi
done

# Execute the main command
exec "$@"
