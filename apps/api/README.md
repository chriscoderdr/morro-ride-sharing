
# Morro Ride Sharing

This project is a ride-sharing application designed to facilitate driver registration, management, and interaction between drivers and users.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js (>= 14.x)](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Nx CLI](https://nx.dev) (for managing the monorepo)

To install Nx CLI, run:

```bash
yarn global add nx
```

## Monorepo Structure

This project uses Nx to manage multiple applications and libraries within a single repository. The structure is as follows:

- `apps/` contains individual applications (e.g., API, web client).
- `libs/` contains shared libraries and components.

### Applications

- **API**: Backend application that provides the main RESTful API.
- **Web**: Frontend application (if applicable).

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/chriscoderdr/morro-ride-sharing.git
cd morro-ride-sharing
```

### 2. Install Dependencies

Install dependencies for the entire monorepo:

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `apps/api` directory for API-specific environment variables.

Example `.env`:

```plaintext
DATABASE_URL=postgres://morro_user:morro_pass@localhost:5432/morrotaxi
BCRYPT_SALT_ROUNDS=12
PORT=3000
```

> **Note**: Ensure that `DATABASE_URL` matches the configuration in the Docker setup below.

## Running the Project

### Running with Docker

To make running and managing dependencies simpler, we use Docker to containerize the database and API services.

1. Build and start the Docker containers:

   ```bash
   docker compose up --build
   ```

   This command will:
   - Set up the PostgreSQL database with the specified configuration.
   - Start the API service.

2. The API should now be running at `http://localhost:3000`.

> **Note**: If you encounter errors related to existing containers or volumes, try stopping and removing them first with:
>
> ```bash
> docker compose down --volumes
> ```

### Running Locally with Nx

If you prefer to run the API locally (outside Docker):

1. **Navigate to the API directory**:

   ```bash
   cd apps/api
   ```

2. **Run the API**:

   ```bash
   nx serve api
   ```

   This will start the API service locally on `http://localhost:3000`.

> **Note**: Ensure that PostgreSQL is running on your machine or through Docker if you're using a local setup.

## Running Tests

This project uses Mocha and Chai for testing.

To run the tests, use:

```bash
yarn test
```

This will clean the drivers table before each test to ensure consistency across test runs.

## Additional Commands

- **Build the API**:

  ```bash
  nx build api
  ```

- **Clean Docker Images and Volumes**:

  ```bash
  docker compose down --volumes
  ```

## Troubleshooting

- **Database Connection Issues**: Ensure that the `DATABASE_URL` in your `.env` file matches your Docker configuration.
- **Nx CLI Not Found**: Make sure Nx CLI is installed globally with `yarn global add nx`.

## License

This project is licensed under the MIT License.
