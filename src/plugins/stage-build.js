module.exports = function disableExpensiveBundlerOptimizationPlugin() {
      return {
        name: "disable-expensive-bundler-optimizations",
        configureWebpack(_config,) {
          return {
            optimization: {
              concatenateModules: false,
            },
          };
        },
      };
    }