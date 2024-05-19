import firebase from 'firebase';
import fire from '../conf/fire';
function addResume(userId) {
  localStorage.removeItem("currentResumeItem")
  const db = firebase.firestore();
  db.collection("users").doc(userId).collection("resumes").add({
  }).then(docRef => {
    // Adding one into stats Resumes Created
    var statsRef = db.collection("data").doc("stats");
    statsRef.update({
      numberOfResumesCreated: firebase.firestore.FieldValue.increment(1)
    });
    setTimeout(() => {
      localStorage.setItem("currentResumeId", docRef.id)
    }, 400);
  }).then((error) => console.log(error));
}
export function removeResume(userId, resumeId) {
  const db = firebase.firestore();
  // Decrement 1 from resumes
  var statsRef = db.collection("data").doc("stats");
  statsRef.update({
    numberOfResumesCreated: firebase.firestore.FieldValue.increment(-1)
  });
  db.collection("users").doc(userId).collection("resumes").doc(resumeId).delete().then(function () {
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}
// Adding user to firstore 
export function addUser(userId, firstname, lastname) {
  const db = firebase.firestore();
  db.collection("users").doc(userId).set({
    firstname: firstname,
    lastname: lastname,
    resumes: "",
    membership: "basic"
  }).then((error) => console.log(error));
}
// ADD 1 to downloads
export function IncrementDownloads() {
  const db = firebase.firestore();
  var statsRef = db.collection("data").doc("stats");
  statsRef.update({
    numberOfResumesDownloaded: firebase.firestore.FieldValue.increment(1)
  });
}
// ADD 1 to users
export async function IncrementUsers(userid) {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userid);
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    var statsRef = db.collection("data").doc("stats");
    statsRef.update({
      numberOfUsers: firebase.firestore.FieldValue.increment(1)
    });
  }
}
// Getting the name of the current user
export async function getFullName(userId) {
  var firstname = "";
  var lastname = "";
  const db = firebase.firestore();
  const userRef = db.collection('users').doc(userId);
  const snapshot = await userRef.get();
  if (snapshot.exists) {
    firstname = snapshot.data().firstname;
    lastname = snapshot.data().lastname;
    return { firstname, lastname }
  } else {
    console.log("notfound")
  }
}
// Change password
export async function changePassword(password) {
  var user = firebase.auth().currentUser;
  user.updatePassword(password).then(function () {
  }).catch(function (error) {
    // An error happened.
  });
}
export async function getStats() {
  var stats;
  const db = firebase.firestore();
  const statsRef = db.collection("data").doc("stats");
  const snapshot = await statsRef.get();
  if (snapshot.exists) {
    stats = snapshot.data();
    return stats;
  }
}
// Get ads
export async function getAds() {
  const db = firebase.firestore();
  const adsRef = db.collection("ads")
  var allDocs=[];
  const snapshot = await adsRef.get().then(snapshot=>{
    snapshot.forEach(item=>{
      allDocs.push(item.data())
    })
  });
  if(allDocs.length >0){
    return allDocs;
  }else{
    return null
  }
}

  //  add Ads
export async  function addAds(link,name,destinationLink) {
  var id = makeid(5)
  const db = firebase.firestore();
  const adsRef = db.collection("ads")
  //  Getting the date
  let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

if(month < 10){
  await adsRef.doc(id).set({id:id,name:name,imageLink:link,date:`${day}-0${month}-${year}`,destinationLink:destinationLink}).then(value=>{
    return true
  });
}else{
  await adsRef.doc(id).set({id:id,name:name,imageLink:link,date:`${day}-${month}-${year}`,destinationLink:destinationLink}).then(value=>{
    return true
  });
}
}
// Get pages
export async function getPages() {
  const db = firebase.firestore();
  const adsRef = db.collection("pages")
  var allDocs=[];
  const snapshot = await adsRef.get().then(snapshot=>{
    snapshot.forEach(item=>{
      allDocs.push(item.data())
    })
  });
  if(allDocs.length >0){
    return allDocs;
  }else{
    return null
  }
}

// Get  page by name
export async function getPageByName(name) {
  const db = firebase.firestore();
  const snapshot = await db.collection("pages").doc(name).get()
if(snapshot.exists){
  return snapshot.data()
}

}

// Remove  page by name
export async function removePageByName(name) {
  const db = firebase.firestore();
  await db.collection("pages").doc(name).delete().then(value=>{console.log("Succefully delete"); return true});

}

// Add Pages

export async  function addPages(pagename,pagecontent) {
  const db = firebase.firestore();
  const adsRef = db.collection("pages")
  //  Getting the date
  let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

if(month < 10){
  await adsRef.doc(pagename).set({id:pagename,pagecontent:pagecontent,date:`${day}-0${month}-${year}`}).then(value=>{
    return true
  });
}else{
  await adsRef.doc(pagename).set({id:pagename,pagecontent:pagecontent,date:`${day}-${month}-${year}`}).then(value=>{
    return true
  });
}
}

// Remove add
export async function removeAd(id){
  const db = firebase.firestore();
 await db.collection("ads").doc(id).delete().then(value=>{
    return true;
  })
}

// Get  website details
export async function getWebsiteDetails() {
  const db = firebase.firestore();
  const snapshot = await db.collection("data").doc("details").get()
if(snapshot.exists){
  return snapshot.data()
}else{
  return null
}
}

// Get  website details
export async function getSocialLinks() {
  const db = firebase.firestore();
  const snapshot = await db.collection("data").doc("social").get()
if(snapshot.exists){
  return snapshot.data()
}else{
  return null
}
}
export async  function addSocial(facebook,twitter,instagram,youtube,pinterest) {
  const db = firebase.firestore();
   db.collection("data").doc("social").set({
     facebook:facebook,
     twitter:twitter,
     instagram:instagram,
     youtube:youtube,
     pinterest:pinterest,

   }).then(value=>console.log("Succefully added Social Links"))
}

export async  function addDetails(websitename,websitedescription) {
  const db = firebase.firestore();
   db.collection("data").doc("details").set({
     websiteName:websitename,
     websitedescription:websitedescription
   }).then(value=>console.log("Succefully added webiste details"))
}
export async function getResumes(userId) {
  var resume = {}
  var resumes = [];
  var i = 0;
  const db = firebase.firestore();
  const userRef = db.collection('users').doc(userId).collection("resumes").limit(3);
  const snapshot = await userRef.get();
  if (snapshot.empty) {
    return
  }
  snapshot.forEach(doc => {
    resume.id = doc.id; // this is resume Id
    resume.item = doc.data();
    resume.employments = [];
    resume.educations = []
    resume.skills = []
    resumes[i] = resume;
    resume = {};
    i++
  });
  ////////////////////// After getting all resumes we loop throu each resume Id  and get the emploments 
  var employmentIndex = 0; // this index will represent the index of each employment inside resumeObject
  for (let index = 0; index < resumes.length; index++) {
    const db = firebase.firestore();
    const employmentRef = db.collection('users').doc(userId).collection("resumes").doc(resumes[index].id).collection("employments");  // Getting all employments inside the resume
    const employmentSnapshot = await employmentRef.get();
    if (!employmentSnapshot.empty) {  // Looping throu resumes if found
      employmentSnapshot.forEach((value) => { // assigning data into our resumes[using the index of the target resume] array 
        resumes[index].employments[employmentIndex] = value.data();
        resumes[index].employments[employmentIndex].employmentId = value.id;
        employmentIndex++;
      })
    }
  }
  ////////////////////// After getting all resumes we loop throu each resume Id  and get the eductions 
  var educationIndex = 0; // this index will represent the index of each employment inside resumeObject
  for (let index = 0; index < resumes.length; index++) {
    const db = firebase.firestore();
    const educationRef = db.collection('users').doc(userId).collection("resumes").doc(resumes[index].id).collection("educations");  // Getting all employments inside the resume
    const educationSnapshot = await educationRef.get();
    if (!educationSnapshot.empty) {  // Looping throu resumes if found
      //   console.log("Found employments in"+ resumes[index].id);
      educationSnapshot.forEach((value) => { // assigning data into our resumes[using the index of the target resume] array 
        resumes[index].educations[educationIndex] = value.data();
        resumes[index].educations[educationIndex].educationId = value.id;
        // console.log( "The id of the employment is"+ resumes[index].employments[employmentIndex].employmentId)
        educationIndex++;
      })
    }
  }
  ////////////////////// After getting all resumes we loop throu each resume Id  and get the eductions 
  var skillIndex = 0; // this index will represent the index of each employment inside resumeObject
  for (let index = 0; index < resumes.length; index++) {
    const db = firebase.firestore();
    const skillRef = db.collection('users').doc(userId).collection("resumes").doc(resumes[index].id).collection("skills");  // Getting all employments inside the resume
    const skillSnapshot = await skillRef.get();
    if (!skillSnapshot.empty) {  // Looping throu resumes if found
      //   console.log("Found employments in"+ resumes[index].id);
      skillSnapshot.forEach((value) => { // assigning data into our resumes[using the index of the target resume] array 
        resumes[index].skills[skillIndex] = value.data();
        resumes[index].skills[skillIndex].skillId = value.id;
        // console.log( "The id of the employment is"+ resumes[index].employments[employmentIndex].employmentId)
        skillIndex++;
      })
    }
  }
  //  console.log("Resumes final result ");
  //console.log(resumes);
  return resumes;
}
// adding employments
export async function addEmployments(userId, resumeId, employmentsToAdd) {
  // getting all employments ids first 
  var employmentsIds = []
  var employmentIndex = 0;
  const db = firebase.firestore();
  const employmentRef = db.collection('users').doc(userId).collection("resumes").doc(resumeId).collection("employments");  // Getting all employments inside the resume
  const employmentSnapshot = await employmentRef.get();
  if (!employmentSnapshot.empty) {
    employmentSnapshot.forEach((value) => {
      employmentsIds[employmentIndex] = value.id;
      employmentIndex++;
    });
  }
  // Now we have the ids we can loop throu them and delete them to add new ones
  employmentsIds.forEach((value) => {
    db.collection("users").doc(userId).collection("resumes").doc(resumeId).collection("employments").doc(value).delete()
  })
  // Adding the new employments
  var res
  for (let index = 0; index < employmentsToAdd.length; index++) {
    const employmentRef = db.collection('users').doc(userId).collection("resumes").doc(resumeId).collection("employments");
    employmentsToAdd[index] !== null ?
      res = await employmentRef.add({
        id: employmentsToAdd[index].id,
        jobTitle: employmentsToAdd[index].jobTitle,
        employer: employmentsToAdd[index].employer,
        begin: employmentsToAdd[index].begin,
        end: employmentsToAdd[index].end,
        description: employmentsToAdd[index].description,
      }
      ) : console.log("kk")
  }
}
// adding Educations
export async function addEducations(userId, resumeId, educatiionsToAdd) {
  // getting all employments ids first 
  var educationsIds = []
  var educationIndex = 0;
  const db = firebase.firestore();
  const educationRef = db.collection('users').doc(userId).collection("resumes").doc(resumeId).collection("educations");  // Getting all employments inside the resume
  const educationSnapshot = await educationRef.get();
  if (!educationSnapshot.empty) {
    educationSnapshot.forEach((value) => {
      educationsIds[educationIndex] = value.id;
      educationIndex++;
    });
  }
  // Now we have the ids we can loop throu them and delete them to add new ones
  educationsIds.forEach((value) => {
    db.collection("users").doc(userId).collection("resumes").doc(resumeId).collection("educations").doc(value).delete()
  })
  // Adding the new employments
  var res
  for (let index = 0; index < educatiionsToAdd.length; index++) {
    const educationRef = db.collection('users').doc(userId).collection("resumes").doc(resumeId).collection("educations");
    educatiionsToAdd[index] !== null ?
      res = await educationRef.add({
        id: educatiionsToAdd[index].id,
        school: educatiionsToAdd[index].school,
        started: educatiionsToAdd[index].started,
        finished: educatiionsToAdd[index].finished,
        degree: educatiionsToAdd[index].degree,
        description: educatiionsToAdd[index].description,
      }) : console.log();
  }
}
// adding Educations
export async function addSkills(userId, resumeId, skillsToAdd) {
  // getting all employments ids first 
  var skillsIds = []
  var skillIndex = 0;
  const db = firebase.firestore();
  const skillRef = db.collection('users').doc(userId).collection("resumes").doc(resumeId).collection("skills");  // Getting all employments inside the resume
  const skillSnapshot = await skillRef.get();
  if (!skillSnapshot.empty) {
    skillSnapshot.forEach((value) => {
      skillsIds[skillIndex] = value.id;
      skillIndex++;
    });
  }
  // Now we have the ids we can loop through them and delete them to add new ones
  skillsIds.forEach((value) => {
    db.collection("users").doc(userId).collection("resumes").doc(resumeId).collection("skills").doc(value).delete()
  })
  // Adding the new employments
  var res
  for (let index = 0; index < skillsToAdd.length; index++) {
    const skillRef = db.collection('users').doc(userId).collection("resumes").doc(resumeId).collection("skills");
    res = await skillRef.add({
      id: skillsToAdd[index].id,
      name: skillsToAdd[index].name,
      rating: skillsToAdd[index].rating,
    });
  }
}
export async function InitialisationCheck() {
  const db = firebase.firestore();
  const userRef = db.collection("data").doc("id");
  const snapshot = await userRef.get();
  if (snapshot.data() != undefined) {
    return snapshot.data().userId;
  } else {
    return undefined;
  }
}

export  async function checkIfResumeIdAvailable(userId){
  const db = firebase.firestore();
  if(localStorage.getItem("currentResumeId") == undefined ){
    await db.collection("users").doc(userId).collection("resumes").add({
     }).then(resumeRef =>{
       localStorage.setItem("currentResumeId",resumeRef.id)
     })
   }
}
export async function setResumePropertyPerUser(userId, resumeId, propertyName, value) {
  const db = firebase.firestore();
  const user = db.collection('users').doc(userId).collection("resumes").doc(resumeId);
  var res;
  switch (propertyName) {
    case "firstname":
      res = await user.set({
        firstname: value
      }, { merge: true });
      break;
    case "lastname":
      res = await user.set({
        lastname: value
      }, { merge: true });
      break;
    case "summary":
      res = await user.set({
        summary: value
      }, { merge: true });
      break;
    case "email":
      res = await user.set({
        email: value
      }, { merge: true });
      break;
    case "phone":
      res = await user.set({
        phone: value
      }, { merge: true });
      break;
    case "occupation":
      res = await user.set({
        occupation: value
      }, { merge: true });
      break;
    case "country":
      res = await user.set({
        country: value
      }, { merge: true });
      break;
    case "city":
      res = await user.set({
        city: value
      }, { merge: true });
      break;
    case "address":
      res = await user.set({
        address: value
      }, { merge: true });
      break;
    case "postalcode":
      res = await user.set({
        postalcode: value
      }, { merge: true });
      break;
    case "dateofbirth":
      res = await user.set({
        dateofbirth: value
      }, { merge: true });
      break;
    case "aadharNumber":
      res = await user.set({
        aadharNumber: value
      }, { merge: true });
      break;
    case "nationality":
      res = await user.set({
        dateofbirth: value
      }, { merge: true });
      break;
    case "dateofbirth":
      res = await user.set({
        dateofbirth: value
      }, { merge: true });
      break;
    default:
      break;
  }
}
/// Function to generate an id of a given length
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export default addResume;