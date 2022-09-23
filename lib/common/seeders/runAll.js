import createUsers from "./users";

async function seedAll() {
  await createUsers();
}

seedAll()
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });
