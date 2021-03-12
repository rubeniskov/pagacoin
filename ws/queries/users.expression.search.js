db.getCollection('users').find({
  $expr: {
    $regexMatch: {
      input: { $concat: ["$firstname", " ", "$lastname"] },
      regex: "av",
      options: "i"
    }
  }
});
