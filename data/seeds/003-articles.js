exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("articles")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("articles").insert([
        {
          name: "Article One",
          url: "articleone.com",
          publisher: "John Doe",
          description: "Article one description",
          user_id: 1,
        },
        {
          name: "Article Two",
          url: "articletwo.com",
          publisher: "Jane Doe",
          description: "Article two description",
          user_id: 2,
        },
        {
          name: "Article Three",
          url: "articlethree.com",
          publisher: "Jimmy Doe",
          description: "Article three description",
          user_id: 3,
        },
      ]);
    });
};
