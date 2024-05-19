import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './index.scss';
import Welcome from './components/welcome/Welcome';
import Dashboard from './components/Dashboard/DashboardMain/DashboardMain'
import * as serviceWorker from './serviceWorker';
import { Helmet } from "react-helmet";
import conf from './conf/configuration'
import './i18n';
import AboutComponent from './components/About/AboutComponent';
import CustomePage from './components/CustomPage/CustomePage';
import Footer from './components/Footer'; // Import the Footer component

ReactDOM.render(
  <React.StrictMode>
            <Helmet>
          <meta charSet="utf-8" />
          <title>{conf.meta.title}</title>
          <link rel="canonical" href={window.location.href} />
          <meta name="description" content={conf.meta.description} />
          <meta name="keywords" content={conf.meta.keywords} />
        </Helmet>
        <Suspense fallback="loading">
    <Router>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/resume/:step"  component={Welcome} />
      <Route exact path="/p/:custompage"  render={ (props)=> <CustomePage {...props} />}  />
      <Footer /> {Footer}

    </Router>
    </Suspense>

  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
