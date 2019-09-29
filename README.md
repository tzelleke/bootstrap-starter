# Bootstrap 4 Starter

Bootstrap 4 starter project based on Zurb's Panini flat file generator.<br>
Modern JavaScript/Sass build pipeline with Gulp 4, Webpack 4, Babel.

## What's included

- [Bootstrap 4](https://getbootstrap.com/)
- [Panini](https://github.com/zurb/panini)
- [BrowserSync](https://www.browsersync.io/)
- [Font Awesome 5](https://fontawesome.com/)
- [Animate.css](https://daneden.github.io/animate.css/)

## Setup

```shell
git clone https://github.com/tzelleke/bootstrap-starter.git
cd bootstrap-starter
yarn install # or npm install
```

Configure certain paths and options in `config.yml`:

- [Autoprefixer](https://github.com/postcss/autoprefixer) browser compatibility
- entry points for Webpack/Babel ES6 compilation ([docs](https://webpack.js.org/concepts/entry-points/))
- see `config.yml` for further details

## Customize Bootstrap CSS

Override default Bootstrap variables in `src/scss/_variables.scss`.<br>
This source file is imported in `src/scss/main.scss` before all Bootstrap source Sass files.

Read more at [Bootstrap's documentation](https://getbootstrap.com/docs/4.3/getting-started/theming/).

## Customize Animate.css build

Customize included animations `src/scss/animate-config.yml`.
