
# Morro Taxi Rider App - Developer Documentation

This README provides instructions for setting up the development environment and running the **Rider App** for Morro Taxi.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Rider App](#running-the-rider-app)
- [Testing](#testing)
- [Additional Notes](#additional-notes)
- [Known Issues](#known-issues)

---

## Overview

The **Rider App** in the Morro Taxi ecosystem allows users to request rides, view driver location updates, and navigate to pickup and drop-off points. This README is specific to the `rider-app` within the Morro Taxi project.

## Tech Stack

- **Frontend**: React Native, Expo, Mapbox
- **State Management**: Redux Toolkit with Tanstack Query (React Query)
- **Communication**: MQTT (for real-time updates)

## Prerequisites

- **Node.js** (v14+)
- **Yarn** (v1 package manager)
- **Android Studio** (for Android emulation)
- **Xcode** (for iOS emulation, macOS only)
- **Gradle, Java, and Android SDK** (for building Android projects)
- **Mapbox Account** with Access Token (for maps)

## Installation

### 1. Clone the Repository

If you haven't already cloned the main repository, do so with:

```bash
git clone https://github.com/chriscoderdr/morro-ride-sharing.git
cd morro-taxi
```

### 2. Navigate to `rider-app` Directory

Navigate to the `rider-app` subproject within the workspace:

```bash
cd apps/rider-app
```

### 3. Install Dependencies

The project uses Yarn Workspaces, so all dependencies should be installed from the root project directory:

```bash
yarn install
```

## Configuration

### Environment Variables

The **Rider App** requires a `.env` file for essential environment variables. Create `.env` in `apps/rider-app` and add the following variables:

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

Replace placeholder values with actual tokens and API endpoints.

## Running the Rider App

### 1. Running with Expo

Start the Expo development server to run the app in an emulator or physical device:

```bash
yarn start
```

Alternatively, you can use Expo commands for specific platforms:

```bash
npx expo run:android       # Runs on Android
npx expo run:ios           # Runs on iOS (macOS only)
```

### 2. Running the iOS App

Open `MorroTaxi.xcworkspace` in `apps/rider-app/ios` using Xcode:

- **Path**: `apps/rider-app/ios/MorroTaxi.xcworkspace`

Then, build and run the app directly on an iOS simulator or connected device.

### 3. Running the Android App

You can compile and build the Android app using Gradle commands:

```bash
cd android
./gradlew assembleDebug      # For a debug build
./gradlew assembleRelease    # For a release build
```

## Testing

We use **Detox** for end-to-end testing.

To run Detox tests for the Rider App:

```bash
yarn test:detox
```

## Additional Notes

- **Mapbox Configuration**: Ensure Mapbox tokens are set in `.env`.
- **Code Formatting**: We use Prettier and ESLint. Run `yarn format` and `yarn lint` to check.

## Known Issues

- **Unexpected Behaviors with Shared Dependencies**: Occasionally, issues may arise due to `node_modules` in the shared `morro-taxi-rn-components` package. If issues occur, try deleting `node_modules` in the shared package and reinstalling.
- **Changes in Shared Project**: After updating the shared `morro-taxi-rn-components` package, run `yarn prepare` in the package directory, then force reinstall dependencies in the `rider-app` using `yarn install --force`.

---
