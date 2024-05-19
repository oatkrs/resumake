import React, { Component } from 'react';
import './ActionIntroduction.scss';
import conf from '../../../conf/configuration'
import logo from '../../../assets/logo/logo.png'
import AuthWrapper from '../../auth/authWrapper/AuthWrapper'
import { motion, AnimatePresence } from "framer-motion"
import fire from '../../../conf/fire'
import { Link } from 'react-router-dom';
import LanguagePicker from '../../Form/language-picker/LanguagePicker'
import { withTranslation } from 'react-i18next';
class ActionIntroduction extends Component {
  constructor(props) {
    super(props);
    if (document.location.search == "?step=3") {
      this.props.goThirdStep();
    }
  }
  authVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  render() {
    const { t } = this.props;
    return (
      <div  className="action-introWrapper">
        <AnimatePresence>
          {this.props.isAuthShowed &&
            <motion.div exit={{ opacity: 0 }} initial="hidden" animate="visible" variants={this.authVariants} transition={{ duration: 0.4 }}  >
              <AuthWrapper closeModal={this.props.authBtnHandler} />
            </motion.div>
          }
        </AnimatePresence>
        <div className="head">
          <div className="brand">
            {conf.brand.useImg == false ? <span>{conf.brand.name}</span> : <img className="logo" src={logo} />}
          </div>
          <div className="authentication">
            {
              this.props.user != null ?
                <Link style={{ textDecoration: "none" }} to={{ pathname: "/dashboard" }} className="authenticationButton"> My Account</Link>
                :
                <a onClick={() => this.props.authBtnHandler()} className="authenticationButton">  {t("intro.login")} </a>
            }
            {this.props.user != null && <a onClick={() => this.props.logout()} className="authenticationButton">Logout</a>}
              <LanguagePicker values={this.props.values} handleLanguageClick={this.props.handleLanguageClick} />
          </div>
        </div>
        <div className="body">
        <h1>{t('intro.titleLeft')} <span>{t("intro.titleSpan")}</span> {t("intro.titleRight")}</h1>
          <ul>
            <li> <div className="numberWrapper"> 1 </div> <span>{t("intro.step1")} </span> </li>
            <li> <div className="numberWrapper"> 2 </div><span>{t("intro.step2")} </span> </li>
            <li> <div className="numberWrapper"> 3 </div><span>  {t("intro.step3")}</span></li>
          </ul>
          {/* <div className="footer">
          <ul>
            <li><a href="/about">About Us</a>  </li>
            <li><a href="/privacy-policy">Privacy policy</a>  </li>
            <li><a href="/contact">How It Work</a>  </li>
          </ul>
        </div> */}
        </div>
      </div>);
  };
}
const MyComponent = withTranslation('common')(ActionIntroduction)
export default MyComponent;
