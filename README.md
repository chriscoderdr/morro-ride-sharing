
# Morro Taxi - Developer Documentation

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Additional Notes](#additional-notes)
- [Known Issues](#known-issues)
- [Deployment Optimizations](#deployment-optimizations)

---

## Overview

**Morro Taxi** is a ride-sharing application that allows users to request rides, track their drivers, and get real-time location updates. This README provides instructions for setting up the development environment and running the project locally.

## Tech Stack

- **Frontend**: React Native, Expo, Mapbox (for maps)
- **Backend**: Koa, PostgreSQL with PostGIS, Redis
- **Communication**: MQTT for real-time updates
- **State Management**: Redux Toolkit with Tanstack Query (React Query)
- **Testing**: Detox (mobile)

## Prerequisites

- **Node.js** (v14+)
- **Yarn** (v1 package manager)
- **Docker** (for running the database and services)
- **Android Studio** (for Android emulation)
- **Xcode** (for iOS emulation, macOS only)
- **Gradle, Java, and Android SDK** (for building Android projects)
- **Mapbox Account** with Access Token (for maps)
- **Twilio Account** (for phone verification) | to be determine in the future

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/chriscoderdr/morro-ride-sharing.git
cd morro-taxi
```

### 2. Install Dependencies

We’re using Yarn Workspaces to manage dependencies in the monorepo. Run the following command in the root directory:

```bash
yarn install
```

### 3. Configure Environment Variables

Each app (API and mobile apps) has its own `.env` file with specific configurations. Below are the details for each:

#### API (`apps/api/.env`)

```env
# Mapbox
MAPBOX_ACCESS_TOKEN=<your_mapbox_access_token>

# MQTT
MQTT_BROKER_URL=<mqtt_broker_url>
MQTT_PORT=8883
MQTT_TOPIC_RIDE_REQUESTS=/drivers/$driver_id$/location
MQTT_TOPIC_DRIVER_LOCATION=/drivers/$driver_id$/location

# Database
DATABASE_URL=postgres://username:password@localhost:5432/morro_taxi

# API Base URL
API_BASE_URL=http://localhost:3000
```

#### Rider App (`apps/rider-app/.env`)

```env
# Mapbox
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=<your_mapbox_access_token>

# MQTT
EXPO_PUBLIC_MQTT_BROKER_URL=<mqtt_broker_url>
EXPO_PUBLIC_MQTT_PORT=8883
EXPO_PUBLIC_MQTT_TOPIC_RIDE_REQUESTS=/drivers/$driver_id$/location
EXPO_PUBLIC_MQTT_TOPIC_DRIVER_LOCATION=/drivers/$driver_id$/location

# API
EXPO_PUBLIC_MORRO_API_BASE_URL=http://localhost:3000
```

#### Driver App (`apps/driver-app/.env`)

```env
# Mapbox
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=<your_mapbox_access_token>
EXPO_PUBLIC_MAPBOX_SEARCH_ACCESS_TOKEN=<your_mapbox_access_token>

# MQTT
EXPO_PUBLIC_MQTT_BROKER_URL=<mqtt_broker_url>
EXPO_PUBLIC_MQTT_PORT=8883
EXPO_PUBLIC_MQTT_TOPIC_RIDE_REQUESTS=/drivers/$driver_id$/location
EXPO_PUBLIC_MQTT_TOPIC_DRIVER_LOCATION=/drivers/$driver_id$/location

# API
EXPO_PUBLIC_MORRO_API_BASE_URL=http://localhost:3000
```

Adjust each `.env` file to include the proper credentials and keys for the services.

### 4. Start Docker Services

The project uses Docker for PostgreSQL, Redis, and MQTT services. Start the services by running:

```bash
docker-compose up
```

## Running the Project

### 1. Backend (Koa API)

```bash
yarn workspace api run dev
```

The API server will start at `http://localhost:3000`.

### 2. Rider and Driver Mobile Apps (React Native with Expo)

#### Running the Apps with Expo

To start the Expo development server and open the apps in an emulator or physical device:

- **Rider App**:
  ```bash
  yarn workspace rider-app start
  ```

- **Driver App**:
  ```bash
  yarn workspace driver-app start
  ```

You can also use Expo’s `run` commands to run the apps on specific platforms:

```bash
npx expo run:android       # Runs on Android
npx expo run:ios           # Runs on iOS (macOS only)
```

#### Running the iOS Apps

In Xcode, open the workspaces for each project:

- **Rider App**: Open `MorroTaxi.xcworkspace` in `apps/rider-app/ios`
- **Driver App**: Open `MorroTaxiDriver.xcworkspace` in `apps/driver-app/ios`

Once opened, you can build and run the apps directly on an iOS simulator or connected iOS device.

#### Running the Android Apps

The Android apps can be compiled using Gradle commands:

- **Rider App**:
  ```bash
  cd apps/rider-app/android
  ./gradlew assembleDebug      # For a debug build
  ./gradlew assembleRelease    # For a release build
  ```

- **Driver App**:
  ```bash
  cd apps/driver-app/android
  ./gradlew assembleDebug      # For a debug build
  ./gradlew assembleRelease    # For a release build
  ```

Make sure you have **Gradle**, **Java**, and **Android SDK** installed and configured, as these are required for building Android projects.

## Testing

- **Mobile Testing**: We use **Detox** for end-to-end testing on the mobile app.
  - Run mobile tests with:
    ```bash
    yarn workspace rider-app test:detox
    ```

## Project Structure

Here’s a high-level overview of the project structure:

```
/morro-taxi
├── apps
│   ├── api                # Backend code (Koa)
│   ├── rider-app          # Rider mobile app (React Native)
│   ├── driver-app         # Driver mobile app (React Native)
├── packages
│   ├── morro-taxi-rn-components  # Shared UI components
│   └── utils              # Shared utilities and configuration
├── docker-compose.yml     # Docker configuration
├── .env                   # Environment variables
└── README.md
```

## Additional Notes

- **Debounce**: Some actions, such as search and button presses, use a debounce function for better performance and user experience.
- **Persistent Data**: Session data is stored in Redis for quick access.
- **Mapbox Configuration**: Ensure the Mapbox token is set in `.env` for each app.
- **Code Formatting**: We use Prettier and ESLint to ensure code consistency. Run `yarn format` and `yarn lint` to check.

## Known Issues

- **Unexpected Behaviors with Shared Dependencies**: Occasionally, unexpected behaviors may occur due to issues with the `node_modules` in the shared project `morro-taxi-rn-components`. Deleting the `node_modules` in this shared package and reinstalling can resolve the issues.
- **Changes in Shared Project**: After making any changes to the shared project `morro-taxi-rn-components`, run `yarn prepare` to rebuild, then force re-install the dependencies in the required app (e.g., `driver-app` or `rider-app`) using `yarn install --force`.

## Deployment Optimizations

When deploying the project to a server, the following directories can be deleted to improve `yarn install` times:
- `apps/rider-app`
- `apps/driver-app`
- `packages/morro-taxi-rn-components`

Since the project uses Yarn Workspaces, deleting these folders will reduce install times without affecting other packages in the workspace.

## Contributing

When contributing, please adhere to the commit message format and PR guidelines:

1. **Commit Message Format**: Use `feat(#issue): message` for commits.
2. **PR Titles**: Include the user story or feature name in the title.

---
