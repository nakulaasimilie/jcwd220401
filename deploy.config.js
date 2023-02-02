module.exports = {
  apps: [
    {
      name: "JCWD-2204-01", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8401,
      },
      time: true,
    },
  ],
};
