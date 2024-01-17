#!/bin/bash

fly_command="fly deploy"
build_secrets=""

while IFS='=' read -r line; do
    # Check if the line is a comment or empty
    if [[ ! $line =~ ^# && $line ]]; then
        key="${line%%=*}"  # Extract key
        value="${line#*=}"  # Extract value
        build_secrets="$build_secrets --build-secret $key=$value "
    fi
done < .env.prod

final_command="$fly_command $build_secrets"
eval "$final_command"