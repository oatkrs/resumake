# Resumake

Checkout my deployment at [Resumake](https://resumake-7c544.firebaseapp.com/)

Literally the fastest way to make your resume

Basically, you give the details, and Resumake does the styling.

This is in no way to be used as a full fledged Resume builder and I can't guarantee any of the templates reflecting the properties of a good ATS passing resume.

This project is merely a learning experience for me to get myself accustomed to Firebase, Google Analytics, User management and data handling across multiple accounts.

## More

Supports Google and Facebook authentication, but if you don't want that, plain old email and password works as well

You can easily store the resumes of your choice by adding them to your account and then go to the home screen > My account to view saved resumes.

Do not attack me for incorrect language locales, I translated them using ChatGPT.

Also the logo and the favicon will have to do for now since my photoshop installation doesn't work properly. All I had was Microsoft Paint.

Also has a nice admin panel for easy management of ads and banners, there is a scrambled implementation of Google Analytics going on, which I hope to fix in the near future to start experimenting with Ad based revenue.

## Missing files

### There is a file `/src/conf/configuration.js` because I did not add it to git, as it had a lot of secrets, if you want to try out deploying the project yourself, then this is the structure:

```js

var config = {

  adminEmail:"thiswillbethe@dmin.email",

  brand: {

    useImg: true,

    name: "Resumake"

  },

  analyticsTrackingCode:"G-XXXXXXXXXXX", //use your own Google analytics tracking code

  meta:{

    title :"Resume Builder V0.1.0, Build a Perfect Resume in 5min ",

    description:" Free, Fast & Easy PDF Download. 8+ Professional Resume Templates to Get You Hired Today! Stop Struggling With Word! Choose a Resume Template and Create Your Resume in 5 Minutes.",

    keywords:"Resumer Creation, Resume Creator,Resume Builder, Rresume Template, Cv Builder."

  }

}

export default config

```

### For the same reason, `.env` on the project root is missing as well, remake it like so:

```
## Firebase creds only

REACT_APP_FIREBASE_KEY ="AddTheFirebaseAPIKeyHere"

REACT_APP_FIREBASE_DOMAIN="In my case resumake-7c544.firebaseapp.com"

REACT_APP_FIREBASE_PROJECT_ID="projectid"

REACT_APP_FIREBBASE_STORAGE_BUCKET="im not telling you mine"

REACT_APP_FIREBASE_SENDER_ID="yeah just do it"

REACT_APP_FIREBASE_APP_ID="finally "

## Saved me so much hassle
GENERATE_SOURCEMAP=false
```

Now, finally, I am obligated to include the next section as per Meta's app dev policies, ignore if you want.
But these docs helped me out a lot

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More


You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).  

To learn React, check out the [React documentation](https://reactjs.org/).  

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify