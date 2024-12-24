# !/usr/bin/env bash
# This script will create a new package in the monorepo
# It will prompt the user for the name of the package 
# It will then create the necessary files and directories for the package

# Get the name of the package
read -p "Enter the name of the package: " package_name

# Create the package directory
mkdir -p ./packages/$package_name

# Create the package.json file
cat > ./packages/$package_name/package.json <<EOF
{
  "name": "@bridge/$package_name",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "format": "biome format --write .",
    "lint": "biome lint",
    "typecheck": "biome typecheck"
  },
  "dependencies": {
    "dotenv": "^16.4.5"
  },
  "peerDependencies": {
    "typescript": "^5.0.4"
  }
}
EOF

# Create the tsconfig.json file. This will inherit the configuration from the root tsconfig.json file
cat > ./packages/$package_name/tsconfig.json <<EOF
{
  "extends": "../../tsconfig.json",
  "include": ["src"]
}
EOF

# Create the src directory and index.ts file
mkdir -p ./packages/$package_name/src
cat > ./packages/$package_name/src/index.ts <<EOF
export const helloWorld = () => {
  console.log("Hello, world!");
};
EOF
