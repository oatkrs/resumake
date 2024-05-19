import React, { Component } from 'react'
import './Settings.scss'
import Input from '../../Form/simple-input/SimpleInput'
import { addUser, changePassword, getWebsiteDetails, addDetails, getSocialLinks, addSocial } from '../../../firestore/dbOperations'
import { motion, AnimatePresence } from 'framer-motion'
import Toasts from '../../Toasts/Toats'
import { withTranslation, } from 'react-i18next';
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            newPassword: "",
            websiteName: "",
            websiteDescription: "",
            facebook: "",
            pinterest: "",
            instagram: "",
            twitter: "",
            youtube: "",
            isPersonalSuccessToastShowed: false,
            isPasswordChangedToastShowed: false
        }
        console.log(this.props.role)
        this.handleInputs = this.handleInputs.bind(this);
        this.personalInfoFormHandler = this.personalInfoFormHandler.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleDetailsChange = this.handleDetailsChange.bind(this);
        this.handleSocialChange = this.handleSocialChange.bind(this);
    }
    componentDidMount() {
        getWebsiteDetails().then((value) => {
            console.log(value)
            value !== null && this.setState({
                websiteName: value.websiteName,
                websiteDescription: value.websitedescription
            })
        });
        getSocialLinks().then(value => {
            value !== null && this.setState({
                facebook: value.facebook,
                twitter: value.twitter,
                instagram: value.instagram,
                pinterest: value.pinterest,
                youtube: value.youtube,
            })
        })
    }
    // Receiving data from inputs
    handleInputs(title, value) {
        switch (title) {
            case "First name":
                this.setState({ firstname: value })
                break;
            case "Last name":
                this.setState({ lastname: value })
                break;
            case "New Password":
                this.setState({ newPassword: value })
                break;
            case "Website Name":
                this.setState({ websiteName: value })
                break;
            case "Website Description":
                this.setState({ websiteDescription: value })
                break;
            case "Facebook":
                this.setState({ facebook: value })
                break;
            case "Twitter":
                this.setState({ twitter: value })
                break;
            case "Instagram":
                this.setState({ instagram: value })
                break;
            case "Youtube":
                this.setState({ youtube: value })
                break;
            case "Pinterest":
                this.setState({ pinterest: value })
                break;
            default:
                break;
        }
    }
    // handle Personal Info from submit
    personalInfoFormHandler(event) {
        event.preventDefault();
        if (this.state.firstname != "" && this.state.lastname != "") {
            addUser(this.props.uid, this.state.firstname, this.state.lastname)
            this.setState({ isPersonalSuccessToastShowed: true });
            setTimeout(() => {
                document.location.reload();
            }, 2000);
        }
    }
    handleDetailsChange(event) {
        event.preventDefault();
        addDetails(this.state.websiteName, this.state.websiteDescription)
    }
    // handle Password change
    handleChangePassword(event) {
        event.preventDefault();
        if (this.state.newPassword.length > 5) {
            changePassword(this.state.newPassword);
            this.setState({ isPasswordChangedToastShowed: true })
            setTimeout(() => {
                this.setState({ isPasswordChangedToastShowed: false })
            }, 2000);
        } else {
            alert("Password must contain 6 or more letters")
        }
    }
    handleSocialChange(event) {
        event.preventDefault();
        addSocial(this.state.facebook, this.state.twitter, this.state.instagram, this.state.youtube, this.state.pinterest)
    }
    render() {
        const { t } = this.props;
        return (
            <div style={{ overflowY: "scroll", marginBottom: "100px" }} className="dashboardContent">
                <AnimatePresence>
                    {this.state.isPersonalSuccessToastShowed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Toasts type="Name Changed" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {this.state.isPasswordChangedToastShowed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Toasts type="Password Changed" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="head">
                    <div className="headContent">
                        <h2>{t("dashboard.settings")} </h2>
                    </div>
                </div>
                <div style={{ justifyContent: "flex-start" }} className="dashboardContentWrapper">
                    {this.props.role !== "admin" &&
                        <div style={{ width: "100%" }}>
                            <div className="dashboardSubtitle">
                                <span>{t("dashboard.personalInfo")}</span>
                            </div>
                            <div className="settingsCard">
                                <form onSubmit={this.personalInfoFormHandler}>
                                    <div className="grid-2-col">
                                        <Input placeholder={this.props.firstname} handleInputs={this.handleInputs} title={t("dashboard.firstname")} />
                                        <Input placeholder={this.props.lastname} handleInputs={this.handleInputs} title={t("dashboard.lastname")} />
                                    </div>
                                    <div className="dashboardAction">
                                        <input type="submit" className="saveInput" value={t("dashboard.save")} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    {/* Change Password */}
                    <div className="dashboardSubtitle">
                        <span>{t("dashboard.changePassword")}</span>
                    </div>
                    <div style={{ width: "94%" }} className="settingsCard">
                        <form onSubmit={this.handleChangePassword}>
                            <Input type="Password" handleInputs={this.handleInputs} title={t("dashboard.newPassword")} />
                            <div className="dashboardAction">
                                <input type="submit" className="saveInput" value={t("dashboard.save")} />
                            </div>
                        </form>
                    </div>
                    {/* Change Password */}
                    {this.props.role == "admin" &&
                        <div style={{ width: "100%" }}>
                            <div className="dashboardSubtitle">
                                <span>WEBSITE NAME</span>
                            </div>
                            {/* Website name */}
                            <div style={{ width: "94%", height: "fit-content" }} className="settingsCard">
                                <form onSubmit={this.handleDetailsChange}>
                                    <Input placeholder={this.state.websiteName} handleInputs={this.handleInputs} title="Website Name" name="Website Name" />
                                    <Input placeholder={this.state.websiteDescription} handleInputs={this.handleInputs} title="Website Description" name="Website Description" />
                                    <div className="dashboardAction">
                                        <input type="submit" className="saveInput" value={t("dashboard.save")} />
                                    </div>
                                </form>
                            </div>
                            {/* Social Links */}
                            <div className="dashboardSubtitle">
                                <span>SOCIAL LINKS</span>
                            </div>
                            {/* Social Links */}
                            <div style={{ width: "94%", height: "fit-content" }} className="settingsCard">
                                <form onSubmit={this.handleSocialChange}>
                                    <Input placeholder={this.state.instagram} handleInputs={this.handleInputs} title="Instagram" name="Instagram" />
                                    <Input placeholder={this.state.facebook} handleInputs={this.handleInputs} title="Facebook" name="Facebook" />
                                    <Input placeholder={this.state.twitter} handleInputs={this.handleInputs} title="Twitter" name="Twitter" />
                                    <Input placeholder={this.state.pinterest} handleInputs={this.handleInputs} title="Pinterest" name="Pinterest" />
                                    <Input placeholder={this.state.youtube} handleInputs={this.handleInputs} title="Youtube" name="Youtube" />
                                    <div className="dashboardAction">
                                        <input type="submit" className="saveInput" value={t("dashboard.save")} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
const MyComponent = withTranslation('common')(Settings)
export default MyComponent;