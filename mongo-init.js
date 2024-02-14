print("Started Adding the Users.");
db.createUser(
  {
      user: "dev",
      pwd: "dev",
      roles: [
          {
              role: "readWrite",
              db: "Corridas"
          }
      ]
  }
);
print("End Adding the User Roles.");