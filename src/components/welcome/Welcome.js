import React, { Component } from 'react';
import './Welcome.scss';
import Board from '../Boards/board/board'
import Action from '../Actions/action/Action'
import { CSSTransition } from 'react-transition-group';
import { Analytics } from '../Analytics'
// Models 
import EmploymentModel from '../../models/Employment';
import EducationModel from '../../models/Education';
import LanguageModel from '../../models/Language';
import SkillModel from '../../models/Skills';
// Images 
import PreviewImg from '../../assets/preview.png'
import NextImg from '../../assets/next.png'
import { ReactComponent as CloseImage } from '../../assets/close.svg'
import { ReactComponent as HamburgerImage } from '../../assets/menu.svg'
// Firebase
import fire from '../../conf/fire';
import { InitialisationCheck, getPages } from '../../firestore/dbOperations'
// Initialisation Component
import InitialisationWrapper from '../initailisation/initialisationWrapper/initialisationWrapper';
/// Animation Library
import { motion, AnimatePresence } from "framer-motion"
import i18n from '../../i18n';
// This class is the source of truth. means that we will hold input states here 
class Welcome extends Component {
  constructor(props) {
    super(props);
    // This is the Parent Component that will contains all the data ( state )  of all its child component
    // From Here we will pass data to our Board Component ( Where resume is)
    this.steps = ["Introduction", "Template Selection", "Adding Data"];
    this.currentResume = JSON.parse(localStorage.getItem("currentResumeItem"));
    /// Removing any nulls in the arrays of current resume
    if (this.currentResume !== null) {
      this.currentResume.employments = this.checkForNullsInArray(this.currentResume.employments, null);
      this.currentResume.educations = this.checkForNullsInArray(this.currentResume.educations, null);
      this.currentResume.skills = this.checkForNullsInArray(this.currentResume.skills, null);
    }
    this.state = {
      mobilePreviewOn: false,
      isMobileTogglerShowed: true,
      isMenuShowed: false,
      language: "en",
      stepIndex: 0,
      currentStep: this.steps[0],
      user: null,
      redirect: null,
      resumeName: "Cv1",
      currentResumeName: "Cv1",
      currentResume: null,
      title: 'Untitled',
      progress: 0,
      pages: [],
      firstname: this.currentResume != null && this.currentResume.item.firstname !== undefined ? this.currentResume.item.firstname : "",
      lastname: this.currentResume !== null && this.currentResume.item.lastname !== undefined ? this.currentResume.item.lastname : "",
      email: this.currentResume !== null && this.currentResume.item.email !== undefined ? this.currentResume.item.email : "",
      phone: this.currentResume !== null && this.currentResume.item.phone !== undefined ? this.currentResume.item.phone : "",
      occupation: this.currentResume !== null && this.currentResume.item.occupation !== undefined ? this.currentResume.item.occupation : "",
      country: this.currentResume !== null && this.currentResume.item.country !== undefined ? this.currentResume.item.country : "",
      city: this.currentResume !== null && this.currentResume.item.city !== undefined ? this.currentResume.item.city : "",
      address: this.currentResume !== null && this.currentResume.item.address !== undefined ? this.currentResume.item.address : "",
      postalcode: this.currentResume !== null && this.currentResume.item.postalcode !== undefined ? this.currentResume.item.postalcode : "",
      dateofbirth: this.currentResume !== null && this.currentResume.item.dateofbirth !== undefined ? this.currentResume.item.dateofbirth : "",
      aadharNumber: this.currentResume !== null && this.currentResume.item.aadharNumber !== undefined ? this.currentResume.item.aadharNumber : "",
      nationality: this.currentResume !== null && this.currentResume.item.nationality !== undefined ? this.currentResume.item.nationality : "",
      summary: this.currentResume !== null && this.currentResume.item.summary !== undefined ? this.currentResume.item.summary : "",
      photo: null,
      employments: this.currentResume !== null && this.currentResume.employments !== undefined ? this.currentResume.employments : [],
      educations: this.currentResume !== null && this.currentResume.educations !== undefined ? this.currentResume.educations : [],
      languages: [],
      isInitialisationShowed: false,
      skills: this.currentResume !== null && this.currentResume.skills !== undefined ? this.currentResume.skills : [],
      filledInputs: []
    }
    this.authListener = this.authListener.bind(this);
    this.nextStep = this.nextStep.bind(this)
    this.logout = this.logout.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.setCurrentStep = this.setCurrentStep.bind(this);
    this.handlePreviewToggle = this.handlePreviewToggle.bind(this);
    this.createNewEmploymentObject = this.createNewEmploymentObject.bind(this);
    this.createNewEducationObject = this.createNewEducationObject.bind(this);
    this.createNewSkillObject = this.createNewSkillObject.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeSelectedResume = this.changeSelectedResume.bind(this);
    this.stepBack = this.stepBack.bind(this);
    this.closeInitialisation = this.closeInitialisation.bind(this);
    this.checkForNullsInArray = this.checkForNullsInArray.bind(this);
    this.wrapper = React.createRef();
    this.goThirdStep = this.goThirdStep.bind(this);
    this.handleLanguageClick = this.handleLanguageClick.bind(this);
    this.menuClose = this.menuClose.bind(this);
    this.menuOpen = this.menuOpen.bind(this);
    this.handleMenuLink = this.handleMenuLink.bind(this);
    // Triggering analytics initializer with the page the visitor is in
    var AnalyticsObject = Analytics;
    AnalyticsObject("Homepage");
  }
  /// Checking if  user is singed in
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user })
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null })
        localStorage.removeItem("user");
      }
    })
  }
  // Logout
  logout() {
    fire.auth().signOut();
    localStorage.removeItem("currentResumeId");
    localStorage.removeItem("currentResumeItem");
    this.currentResume = null;
  }
  // Setting the current step
  setCurrentStep(step, isLoginModalShowed) {
    this.setState({
      currentStep: this.steps[0],
      stepIndex: 0,
    });
  }
  // go to third step
  goThirdStep() {
    this.setState({
      currentStep: this.steps[2],
      stepIndex: 2,
    });
  }
  // Removing any null in employments
  checkForNullsInArray(array, elem) {
    var nullIndex = array.indexOf(elem);
    while (nullIndex > -1) {
      array.splice(nullIndex, 1);
      nullIndex = array.indexOf(elem);
    }
    return array;
  }
  componentDidMount() {
    getPages().then(value => {
      value === null ? console.log("no pages found") : this.setState({ pages: value })
    })
  }
  componentWillMount() {
    this.authListener();
    InitialisationCheck().then(value => {
      if (value === "none" || value === undefined) {
        this.setState({ isInitialisationShowed: true });
      }
    });
    // checking if the user clicked in a resume in dashboard, to set it as the current resume
    if (localStorage.getItem("currentResumeItem")) {
      this.setState({ currentResume: JSON.parse(localStorage.getItem("currentResumeItem")) })
    }
    /// check if the user comming from dashboard with specefic resume click
    this.props.match !== undefined &&
      this.props.match.params.step !== undefined && this.setState({ currentStep: this.steps[2] })
  }
  // Basic Function to remove value from array
  arrayRemove(arr, value) { return arr.filter(function (ele) { return ele !== value; }); }
  // Handling navigation between Board steps
  nextStep() {
    this.setState((state) => {
      return { stepIndex: state.stepIndex + 1, currentStep: this.steps[state.stepIndex + 1], mobilePreviewOn: false }
    })
  }
  closeInitialisation() {
    this.setState((prevState, props) => ({ isInitialisationShowed: false }));
  }
  // stepBack
  stepBack() {
    this.setState((state) => {
      return { stepIndex: state.stepIndex - 1, currentStep: this.steps[state.stepIndex - 1], mobilePreviewOn: true }
    })
  }
  // Create new employment object
  createNewEmploymentObject(id) {
    var employment = new EmploymentModel(id);
    this.state.employments.push(employment);
    this.setState({ employments: this.state.employments });
  }
  // Create new education object
  createNewEducationObject(id) {
    var education = new EducationModel(id);
    this.state.educations.push(education);
    this.setState({ educations: this.state.educations });
  }
  // Create new education object
  createNewLanguageObject(id) {
    var language = new LanguageModel(id);
    this.state.languages.push(language);
    this.setState({ languages: this.state.languages });
  }
  // Create new skill object
  createNewSkillObject(id) {
    var skill = new SkillModel(id);
    this.state.skills.push(skill);
    this.setState({ skills: this.state.skills });
  }
  // Handling Delete of a components/object Employment,Language,Education etc
  handleDelete(inputType, id) {
    switch (inputType) {
      case "Skills":
        this.setState({
          skills: [],
        })
        break;
      default:
        break;
    }
  }
  // Handling Inputs change from childs
  handleInputs(inputName, inputValue, idOptional, typeOptional) {
    // switching between which input is passed to the function
    // typeOptional if the input was in employment or education or langauge 
    // idOptional is an optional id when an input is inside another component like employments
    //  Each employment should contain id and when an input changed inside Employment component we need to 
    // know the id of that specefic employment to change it in here  same applicable for educations languages 
    switch (inputName) {
      case "Title":
        this.setState({ title: inputValue });
        break;
      case "First Name":
        this.setState({ firstname: inputValue });
        break;
      case "Last Name":
        this.setState({ lastname: inputValue });
        break;
      case "Email":
        this.setState({ email: inputValue });
        break;
      case "Phone":
        this.setState({ phone: inputValue });
        break;
      case "Photo":
        const image = new window.Image();
        image.src = inputValue;
        image.onload = () => {
          this.setState({ photo: image });
        };
        break;
      case "Occupation":
        this.setState({ occupation: inputValue });
        break;
      case "Country":
        this.setState({ country: inputValue });
        break;
      case "City":
        this.setState({ city: inputValue });
        break;
      case "Address":
        this.setState({ address: inputValue });
        break;
      case "Postal Code":
        this.setState({ postalcode: inputValue });
        break;
      case "Date Of Birth":
        this.setState({ dateofbirth: inputValue });
        break;
      case "Driving License":
        this.setState({ aadharNumber: inputValue });
        break;
      case "Nationality":
        this.setState({ nationality: inputValue });
        break;
      case "Professional Summary":
        this.setState({ summary: inputValue });
        break;
      case "Job Title":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        var found = false;
        // looping in state to see if its found based on the id raised from the components
        for (var i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].jobTitle = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "Begin":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].begin = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "End":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].end = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "Employer":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].employer = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "Description":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].description = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "School":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i] !== null && this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].school = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Degree":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i] !== null && this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].degree = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Started":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].started = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Finished":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].finished = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Course Description":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].description = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Language":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.languages.length; i++) {
          if (this.state.languages[i].id === idOptional && typeOptional === "Languages") {
            found = true;
            this.state.languages[i].name = inputValue;
            this.setState({ languages: this.state.languages });
            break;
          }
        }
        if (found === false) {
          // create new Language
          this.createNewLanguageObject(idOptional);
        }
        found = false
        break;
      case "Level":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.languages.length; i++) {
          if (this.state.languages[i].id === idOptional && typeOptional === "Languages") {
            found = true;
            this.state.languages[i].level = inputValue;
            this.setState({ languages: this.state.languages });
            break;
          }
        }
        if (found === false) {
          // create new Language
          this.createNewLanguageObject(idOptional);
        }
        found = false
        break;
      case "Skill Name":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.skills.length; i++) {
          if (this.state.skills[i].id === idOptional && typeOptional === "Skills") {
            found = true;
            this.state.skills[i].name = inputValue;
            this.setState({ skills: this.state.skills });
            break;
          }
        }
        if (found === false) {
          // create new Language
          this.createNewSkillObject(idOptional);
        }
        found = false
        break;
      case "Rating":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.skills.length; i++) {
          if (this.state.skills[i].id === idOptional && typeOptional === "Skills") {
            found = true;
            this.state.skills[i].rating = inputValue;
            this.setState({ skills: this.state.skills });
            break;
          }
        }
        if (found === false) {
          // create new Language
          this.createNewSkillObject(idOptional);
        }
        found = false
        break;
      default:
        break;
    }
  }
  // Handling Preview Button
  handlePreviewToggle() {
    this.state.mobilePreviewOn ? this.setState({ mobilePreviewOn: false }) : this.setState({ mobilePreviewOn: true })
    this.state.currentStep == "Introduction" ? this.setState({ isMobileTogglerShowed: false }) : this.setState({ isMobileTogglerShowed: true })
  }
  // Changing the selected resume
  changeSelectedResume(resumeName) {
    this.setState({
      resumeName: resumeName,// Propertie
      currentResumeName: resumeName
    });
  }
  // Handle language click 
  handleLanguageClick(language) {
    i18n.changeLanguage(language);
    this.setState({ language: language })
  }
  /// Close Menu
  menuClose() {
    this.setState({ isMenuShowed: false })
  }
  /// Open Menu
  menuOpen() {
    this.setState({ isMenuShowed: true })
  }
  /// Open Menu
  handleMenuLink(pagename) {
    if (pagename == "Home") {
      this.menuClose()
    } else {
      window.location = "/p/" + pagename
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      // alert(nextProps.location);
    }
  }
  render() {
    const menuWrapperVariants = {
      initial: { width: "0px", height: "0px" },
      isOpened: { width: "1200px", height: "1200px", transition: { duration: "0.5" } },
      isClosed: { width: "0px", height: "0px", transition: { duration: "0.5" } },
    }
    return (
      <div className="wrapper">
        <AnimatePresence>
          {
            this.state.isInitialisationShowed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><InitialisationWrapper closeInitialisation={this.closeInitialisation} />  </motion.div>
          }
        </AnimatePresence>
        {/* {this.props.match.params.step != undefined && alert(this.props.match.params.step)} */}
        <div className="menuToggle">
          <a onClick={() => this.menuOpen()}>
            <HamburgerImage className="hamburgerImage" />
          </a>
        </div>
        <AnimatePresence>
          {this.state.isMenuShowed &&
            <motion.div variants={menuWrapperVariants} initial="initial" animate="isOpened" exit="isClosed" className="menu">
            </motion.div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {this.state.isMenuShowed &&
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} exit={{ opacity: 0, transition: { duration: 0.1 } }} className="menu-content">
              <ul>
                <li className="menu-active" onClick={() => this.handleMenuLink("Home")}>Home <a></a></li>
                {this.state.pages.map((value, index) => {
                  return <li key={index + 10} ><a onClick={() => this.handleMenuLink(value.id)}>{value.id}</a></li>
                })}
                <li><CloseImage onClick={() => this.menuClose()} className="closeImage" /></li>
              </ul>
            </motion.div>
          }
        </AnimatePresence>
        <div className="actions">
          <Action
            handleLanguageClick={this.handleLanguageClick}
            goThirdStep={this.goThirdStep}
            values={{
              user: this.state.user,
              resumeName: this.state.resumeName,
              title: this.state.title,
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              summary: this.state.summary,
              occupation: this.state.occupation,
              address: this.state.address,
              postalcode: this.state.postalcode,
              country: this.state.country,
              dateofbirth: this.state.dateofbirth,
              city: this.state.city,
              email: this.state.email,
              phone: this.state.phone,
              employments: this.state.employments,
              aadharNumber: this.state.aadharNumber,
              nationality: this.state.nationality,
              educations: this.state.educations,
              languages: this.state.languages,
              skills: this.state.skills,
              photo: this.state.photo,
              language: this.state.language
            }}
            setCurrentStep={this.setCurrentStep}
            redirectToDashboard={this.redirectToDashboard} logout={this.logout} user={this.state.user} handlePreviewToggle={this.handlePreviewToggle} handleDelete={this.handleDelete} progress={this.state.progress} currentStep={this.state.currentStep} handleInputs={this.handleInputs} />
        </div>
        <div className={this.state.mobilePreviewOn ? " right-panel  boardShowed" : "right-panel "}>
          <Board
            nextStep={this.nextStep}
            stepBack={this.stepBack}
            changeResumeName={this.changeSelectedResume}
            currentResumeName={this.state.resumeName}
            values={{
              resumeName: this.state.resumeName,
              title: this.state.title,
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              summary: this.state.summary,
              occupation: this.state.occupation,
              address: this.state.address,
              postalcode: this.state.postalcode,
              country: this.state.country,
              city: this.state.city,
              dateofbirth: this.state.dateofbirth,
              aadharNumber: this.state.aadharNumber,
              email: this.state.email,
              nationality: this.state.nationality,
              phone: this.state.phone,
              employments: this.state.employments,
              educations: this.state.educations,
              languages: this.state.languages,
              skills: this.state.skills,
              photo: this.state.photo
            }}
            currentStep={this.state.currentStep}
          />
        </div>
        <CSSTransition
          appear={true}
          in={true} timeout={100} classNames="previewfade">
          {this.state.isMobileTogglerShowed ? <div onClick={this.handlePreviewToggle} className="previewButton">
            <img className="previewImg" src={this.state.currentStep == "Introduction" ? NextImg : PreviewImg} alt="Preview" />
          </div> : <div></div>}
        </CSSTransition>
      </div>
    );
  }
}
export default Welcome;
