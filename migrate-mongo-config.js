// In this file you can configure migrate-mongo

const config = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: `mongodb+srv://nati:aa9432651@cluster0.rngbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,

    // TODO Change this to your database name:
    // databaseName: "myFirstDatabase",

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog",

  // The file extension to create migrations and search for in migration dir 
  migrationFileExtension: ".js",

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determin
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: false
};

// Return the config as a promise
module.exports = config;
