# For Hue

DESCRIPTION HERE.

Made with the help of ejecting a [create-react-app](https://github.com/facebookincubator/create-react-app).

## Usage

After cloning this package, run the following:

```
# install dependencies
> npm install

# start the dev server
> npm start
```

The app will automatically open a new tab in Google Chrome at [http://localhost:3000/](http://localhost:3000/) where the app is running. If you did not do `npm run setup`, the server will automatically check if the proper database and table exist and, if not, create them.

## Production build

To build this app into a static, minified package, running `npm run build` will create such a package under the `/build/` directory and run the production server at [http://localhost:9000/](http://localhost:9000/).
