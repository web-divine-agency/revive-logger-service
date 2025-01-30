module.exports = {
  apps: [
    {
      name: "04-LoggerService",
      namespace: "revive-logger-service",
      script: "./src/index.js",
      watch: ["./src", "./src/*.js"],
      output: "./logs/out.log",
      error: "./logs/error.log",
    },
  ],
};
