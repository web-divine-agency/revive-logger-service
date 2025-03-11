module.exports = {
  apps: [
    {
      name: "ReviveLoggerService",
      namespace: "revive-logger-service",
      script: "./src/index.js",
      watch: ["./src", "./src/*.js"],
      output: "./logs/out.log",
      error: "./logs/error.log",
    },
  ],
};
