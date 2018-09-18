module.exports = {
    propsParser: require('react-docgen-typescript').parse,
    webpackConfig: require('react-scripts-ts/config/webpack.config.dev'),
    styles: {
    Playground: {
      preview: {
        fontFamily: 'sans-serif',
        margin: 0,
        padding: 0
      }
    }
  }
}