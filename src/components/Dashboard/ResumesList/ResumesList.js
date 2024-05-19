import React, { Component } from 'react';
import addResume, { getResumes, removeResume } from '../../../firestore/dbOperations';
import { Link } from 'react-router-dom';
import addResumesImage from '../../../assets/undraw_add_document_0hek.svg'
import fire from '../../../conf/fire'
import { withTranslation } from 'react-i18next';
import Lottie from 'react-lottie';
import LoadingAnimation from '../../../assets/animations/lottie.loading.json'
class ResumesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumes: "loading",
    }
    this.setAsCurrentResume = this.setAsCurrentResume.bind(this)
    this.returnResumes = this.returnResumes.bind(this);
    this.deleteResume = this.deleteResume.bind(this);
  }
  deleteResume(userId, resumeId, indexInState) {
    removeResume(userId, resumeId);
    var array = this.state.resumes;
    console.log("array is this")
    console.log(array);
    // Notifying the state that a resume has been deleted
    this.props.showDeletedToast();
    setTimeout(() => {
      document.location.reload();
    }, 1300);
  }
  // When user click on go to resume we save the resume id he clicked on so we can display the proper inforamtions in our Resume Board
  setAsCurrentResume(resumeId, data) {
    localStorage.removeItem("currentResumeId");
    localStorage.removeItem("currentResumeDara");
    localStorage.setItem("currentResumeId", resumeId)
    localStorage.setItem("currentResumeItem", data)
    console.log("Data of resumes");
    var resumeData = JSON.parse(localStorage.getItem("currentResumeItem"));
    console.log(resumeData.firstname)
  }
  //// List all resumes for that specific user
  returnResumes() {
    var resumes = []
    for (let index = 0; index < this.state.resumes.length; index++) {
      resumes[index] = <li key={index} className="resumeItem">
        <div className="resumeItemStatus" style={{ backgroundColor: "#2ecc71" }}></div>
        <div className="resumeItemContent">
          <div className="resumeItemContentWrapper">
            <span className="name">{this.state.resumes[index].item.firstname + " " + this.state.resumes[index].item.lastname}</span>
            <span className="occupation">{this.state.resumes[index].item.occupation}</span>
          </div>
          <div style={{ minWidth: "217px" }}>
            <Link onClick={() => this.setAsCurrentResume(this.state.resumes[index].id, JSON.stringify(this.state.resumes[index]))} className="btn-default" style={{ textDecoration: "none", fontSize: "13px", marginRight: "10px" }} to="/?step=3"> Go To Resume</Link>
            <a onClick={() => this.deleteResume(localStorage.getItem("user"), this.state.resumes[index].id, index)} style={{ fontSize: "13px", backgroundColor: "#e74c3c" }} className="btn-default">Remove</a>
          </div>
        </div>
      </li>;
    }
    return resumes;
  }
  componentWillMount() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        var resumes;
        /// Getting the resumes
        resumes = getResumes(user.uid)
        resumes.then((value) => {
          resumes = value;
          this.setState({ resumes: resumes })
        })
      }
    })
  }
  render() {
    const loadingSettings = {
      loop: true,
      autoplay: true,
      animationData: LoadingAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
    const { t } = this.props;
    return (
      <div className="dashboardContent">
        <div className="head">
          <div className="headContent">
            <h2>{t("dashboard.dashboard")} </h2>
            {this.state.resumes != null && <Link onClick={() => addResume(localStorage.getItem("user"))} to="/" style={{ fontSize: "17px" }} className="btn-default">  + {t("dashboard.addNew")} </Link>}
          </div>
          <hr />
          {/* Resumes List */}
          <div className="resumesList">
            {this.state.resumes == "loading" ?
              <Lottie height="50" width="50" options={loadingSettings} />
              : this.state.resumes == null ?
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", }}>
                  <img className="noResumesImage" src={addResumesImage} />
                  <Link onClick={() => addResume(localStorage.getItem("user"))} style={{ textDecoration: "none " }} to="/">
                    <a className="btn-default"> {t("dashboard.addResume")}   </a>
                  </Link>
                </div>
                :
                <ul>
                  {/*  Return Resumes */}
                  {this.returnResumes()}
                </ul>
            }
          </div>
        </div>
      </div>
    );
  }
}
const MyComponent = withTranslation('common')(ResumesList)
export default MyComponent;