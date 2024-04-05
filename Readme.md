# Risevest-Backend-Test-API

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/)

### Installing/Run locally

- Make sure you have `docker` and `git` installed.

- Clone or fork repo🤷‍♂

  ```bash
    - git clone https://github.com/RIDUMATICS/Risevest-Backend-Test-API.git
    - cd Risevest-Backend-Test-API
    - docker compose up -d  (it will spin up postgresDB and the API Docker Image)
    - connect to API on http://localhost:3000/api
  ```
### Testing
- Run `npm run test` to run all test suite

### LIVE URL
  - https://risevest-backend-test-api.onrender.com/api

### POSTMAN URL
  - [https://risevest-backend-test-api.onrender.com/api](https://documenter.getpostman.com/view/16616487/2sA35G4Msm)


### Query Optimization Task: 
```
SELECT users.id, users.name, posts.title, comments.content
FROM users
JOIN posts ON users.id = posts."userId"
JOIN (
    SELECT "postId", MAX("createdAt") AS max_created_at
    FROM comments
    GROUP BY "postId"
) AS latest_comments ON posts.id = latest_comments."postId"
LEFT JOIN comments ON posts.id = comments."postId" AND latest_comments.max_created_at = comments."createdAt"
JOIN (
    SELECT "userId", COUNT(*) AS post_count
    FROM posts
    GROUP BY "userId"
) AS post_counts ON users.id = post_counts."userId"
ORDER BY post_counts.post_count DESC
LIMIT 3;
```
