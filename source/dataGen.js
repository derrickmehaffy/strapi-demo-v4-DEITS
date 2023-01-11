require("dotenv").config({ path: require("find-config")(".env") });
const { faker } = require("@faker-js/faker");
const axios = require("axios");

const APIToken = process.env.API_TOKEN;
const entitiesToCreate = process.env.ENTITIES_TO_CREATE;
const commentsToCreate = process.env.COMMENTS_TO_CREATE;

async function createAuthor() {
  const author = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const response = await axios.post(
    "http://localhost:1337/api/auth/local/register",
    author,
    {
      headers: {
        Authorization: `Bearer ${APIToken}`,
      },
    }
  );

  return response.data;
}

async function createComment(author) {
  const comment = {
    commentBody: faker.lorem.paragraphs(1),
    author: author.user.id,
  };

  const response = await axios.post(
    "http://localhost:1337/api/comments",
    { data: comment },
    {
      headers: {
        Authorization: `Bearer ${APIToken}`,
      },
    }
  );

  return response.data;
}

async function createEntity() {
  let comments = [];
  const commentAuthor = await createAuthor();

  for (let i = 0; i < commentsToCreate; i++) {
    let comment = await createComment(commentAuthor);

    comments.push(comment.data.id);
  }

  const entity = {
    title: faker.lorem.words(3),
    body: faker.lorem.paragraphs(3),
    authors: [1], // ID of the admin user
    comments: comments,
  };

  const response = await axios.post(
    "http://localhost:1337/api/blog-posts",
    { data: entity },
    {
      headers: {
        Authorization: `Bearer ${APIToken}`,
      },
    }
  );

  return response.data;
}

async function main() {
  const entities = [];
  for (let i = 0; i < entitiesToCreate; i++) {
    let entity = await createEntity();
    entities.push(entity);
  }
}

main();
