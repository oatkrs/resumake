import React, { Component } from 'react'
import { Stage, Layer, Rect, Circle, Image, Text, Group, Line } from 'react-konva';
import jsPDF from 'jspdf';
import ImageCall from '../../../../../assets/cv6-assets/phone-call.svg'
import Envelope from '../../../../../assets/cv6-assets/envelope.svg'
import Address from '../../../../../assets/cv6-assets/address.svg'
import { withTranslation } from 'react-i18next';
import useImage from 'use-image';
class Cv6 extends Component {
    constructor(props) {
        super(props)
        this.returnEmployments = this.returnEmployments.bind(this);
        this.returnEducations = this.returnEducations.bind(this);
        this.returnLanguages = this.returnLanguages.bind(this);
        this.returnSkills = this.returnSkills.bind(this);
        this.checkForDownload = this.checkForDownload.bind(this);
    }
    //////////  Handling return of employments
    employmentsHeightToAdd = []; // Height of every employments Item
    employmentsRefs = [] // Reference of every employments Item
    returnEmployments() {
        const employmentsObjects = [] // will hold employments items
        const arrayToReturn = [] // Array thet will be return to render function
        this.employmentsRefs = Object.assign([], this.employmentsRefs);// To fix Object not assignable 
        var TotalHeightToAdd = 8;
        for (let index = 0; index < this.props.values.employments.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.employmentsHeightToAdd[index - 1] + 5
            }
            employmentsObjects[index] = {
                item:
                    <Group y={index == 0 ? TotalHeightToAdd + 18 : TotalHeightToAdd + 20} ref={node => { this.employmentsRefs[index] = node }}>
                        <Text y={5} text={this.props.values.employments[index].jobTitle} fontStyle="bold" fontFamily="Montserrat" fontSize="9" />
                        <Text y={17} text={this.props.values.employments[index].employer + " | " + this.props.values.employments[index].begin + " - " + this.props.values.employments[index].end} fontFamily="Montserrat" fontSize="6" />
                        <Text y={27} width={300} fill="#6b6b6b" text={this.props.values.employments[index].description} fontFamily="Montserrat" fontSize="8" />
                    </Group>
                ,
                height: index > 0 ? this.employmentsHeightToAdd[index - 1] : 0
            }
            this.employmentsRefs[index] != undefined ? this.employmentsHeightToAdd[index] = parseInt(this.employmentsRefs[index].getClientRect().height) : this.employmentsHeightToAdd[index] = 0;
            arrayToReturn.push(employmentsObjects[index].item)
        }
        return arrayToReturn;
    }
    //////////  Handling return of Educations
    educationsHeightToAdd = []; // Height of every Educations Item
    educationsRefs = [] // Reference of every Educations Item
    returnEducations() {
        const educationsObjects = [] // will hold Educations items
        const arrayToReturn = [] // Array thet will be return to render function
        this.educationsRefs = Object.assign([], this.educationsRefs);// To fix Object not assignable 
        var TotalHeightToAdd = 8;
        for (let index = 0; index < this.props.values.educations.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.educationsHeightToAdd[index - 1] + 5
            }
            educationsObjects[index] = {
                item:
                    <Group y={index == 0 ? TotalHeightToAdd + 18 : TotalHeightToAdd + 20} ref={node => { this.educationsRefs[index] = node }}>
                        <Text y={5} text={this.props.values.educations[index].degree} fontStyle="bold" fontFamily="Montserrat" fontSize="9" />
                        <Text y={17} text={this.props.values.educations[index].school + " | " + this.props.values.educations[index].started + " - " + this.props.values.educations[index].finished} fontFamily="Montserrat" fontSize="6" />
                        <Text y={27} width={300} fill="#6b6b6b" text={this.props.values.educations[index].description} fontFamily="Montserrat" fontSize="8" />
                    </Group>,
                height: index > 0 ? this.educationsHeightToAdd[index - 1] : 0
            }
            this.educationsRefs[index] != undefined ? this.educationsHeightToAdd[index] = parseInt(this.educationsRefs[index].getClientRect().height) : this.educationsHeightToAdd[index] = 0;
            arrayToReturn.push(educationsObjects[index].item)
        }
        return arrayToReturn;
    }
    // Languages list data holders
    languagesHeightToAdd = [];
    languagesRefs = [];
    ////  Languages
    returnLanguages() {
        var languagesObjects = [];
        var arrayToReturn = [];
        var TotalHeightToAdd = 10;
        this.languagesRefs = Object.assign([], this.languagesRefs);
        for (let index = 0; index < this.props.values.languages.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.languagesHeightToAdd[index - 1]
            }
            languagesObjects[index] = {
                item: <Group x={0} y={TotalHeightToAdd + 10} ref={node => { this.languagesRefs[index] = node }}  >
                    <Text x={30} y={0} width={95} text={this.props.values.languages[index].name} fill="white" fontStyle="bold" fontSize={8} />
                    <Circle x={20} y={4} width={5} height={5} fill="white" />
                    <Text x={90} y={0} width={95} text={this.props.values.languages[index].level} fill="white" fontSize={8} />
                </Group>
                ,
                height: index > 0 ? this.languagesHeightToAdd[index - 1] : 0,
            }
            this.languagesRefs[index] != undefined ? this.languagesHeightToAdd[index] = parseInt(this.languagesRefs[index].getClientRect().height) : this.languagesHeightToAdd[index] = 0
            arrayToReturn.push(languagesObjects[index].item);
        }
        return arrayToReturn;
    }
    // Skills list data holders
    skillsHeightToAdd = [];
    skillsRefs = [];
    // Skills return
    returnSkills() {
        var skillsObjects = [];
        var arrayToReturn = [];
        var TotalHeightToAdd = 0;
        this.skillsRefs = Object.assign([], this.skillsRefs);
        for (let index = 0; index < this.props.values.skills.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.skillsHeightToAdd[index - 1] + 5
            }
            console.log(TotalHeightToAdd)
            skillsObjects[index] = {
                item:
                    <Group x={10} y={TotalHeightToAdd + 20} ref={node => { this.skillsRefs[index] = node }} >
                        <Text x={2} y={4} width={95} text={this.props.values.skills[index].name} fill="white" fontStyle="bold" fontSize={8} />
                        <Rect x={0} y={14} width={111} height={11} stroke="white" strokeWidth={0.1} />
                        <Rect x={3} y={17} width={this.props.values.skills[index].rating < 100 ? this.props.values.skills[index].rating : 105} height={5} fill="#ffe3d8" />
                    </Group>
                ,
                height: index > 0 ? this.skillsHeightToAdd[index - 1] : 0,
            }
            this.skillsRefs[index] != undefined ? this.skillsHeightToAdd[index] = parseInt(this.skillsRefs[index].getClientRect().height) : this.skillsHeightToAdd[index] = 0
            arrayToReturn.push(skillsObjects[index].item);
        }
        return arrayToReturn;
    }
    checkForDownload() {
        var dataUrl = this.stageRef.getStage().toDataURL({ pixelRatio: 4, y: 0 });
        var doc = new jsPDF("p", "mm", "a4");
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        const pdf = new jsPDF();
        pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
        pdf.save("Resume" + ".pdf");
        this.props.downloadEnded()
        if (this.props.pages > 1) {
            var dataUrl = this.stageRef.getStage().toDataURL({ pixelRatio: 3, y: 637 });
            var doc = new jsPDF("p", "mm", "a4");
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            const pdf = new jsPDF();
            pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
            pdf.save("Resume_Page_2" + ".pdf");
        }
    }
    componentDidUpdate() {
        if (this.layer != undefined) {
            if (parseInt(this.layer.getClientRect().height) > 640 && this.props.pages == 1) {
                this.props.addPage();
            }
        }
        this.props.triggerDownload == true && this.checkForDownload()
    }
    render() {
        const { t } = this.props;
        return (
            <Stage y={this.props.currentPage > 1 ? -650 : 0} fontFamily="Georgia" width={470} height={640} ref={node => { this.stageRef = node }}>
                <Layer ref={node => { this.layer = node }} >
                    {/* Left Side */}
                    <Rect height={this.layer ? this.layer.getClientRect().height : 640} width={150} fill="#0a043c" >
                    </Rect>
                    <Image x={30} y={25} width={80} height={85} image={this.props.values.photo} />
                    {/* Left side content */}
                    {/* Contact Start */}
                    <Group x={10} y={140} ref={node => { this.contactRef = node }} >
                        <Text x={7} text={t("resume.info")} align="center" width={99} fontFamily="Montserrat" fontStyle="bold" fill="white" fontSize={10} />
                        <Rect x={8} y={-6} width={100} height={20} stroke="#03506f" strokeWidth={0.7} />
                        {/* Phone number*/}
                        <ImageCanvas width={14} height={14} x={10} y={28} image={ImageCall} />
                        <Text x={30} y={28} width={95} text={this.props.values.phone} fill="white" fontSize={8} />
                        <ImageCanvas width={14} height={14} x={10} y={48} image={Envelope} />
                        <Text x={30} y={48} width={95} text={this.props.values.email} fill="white" fontSize={8} />
                        <ImageCanvas width={14} height={14} x={10} y={68} image={Address} />
                        <Text x={30} y={68} width={95} text={this.props.values.address + " ," + this.props.values.city + ", " + this.props.values.country + ", " + this.props.values.postalcode} fill="white" fontSize={8} />
                    </Group>
                    {/* Contact End */}
                    {/* Languages Start */}
                    <Group x={10} y={this.contactRef ? this.contactRef.getClientRect().height + 150 : 140} ref={node => { this.LangugaesRef = node }}    >
                        <Text x={7} text={t("resume.languages")} align="center" width={99} fontFamily="Montserrat" fontStyle="bold" fill="white" fontSize={10} />
                        <Rect x={8} y={-6} width={100} height={20} stroke="#03506f" strokeWidth={0.7} />
                        {/* Language item*/}
                        {/* <Group y={28}>
                        <Text x={30} y={0} width={95} text="English" fill="white" fontStyle="bold" fontSize={8} />
                        <Circle x={20} y={4} width={5} height={5} fill="white" />
                        <Text x={90} y={0} width={95} text="Standard" fill="white" fontSize={8} />
                        </Group> */}
                        {this.returnLanguages()}
                    </Group>
                    {/* Languages End */}
                    {/* Skills Start */}
                    <Group x={10} y={this.contactRef ? this.contactRef.getClientRect().height + this.LangugaesRef.getClientRect().height + 160 : 140} ref={node => { this.SkillsRef = node }}    >
                        <Text x={7} text={t("resume.skills")} align="center" width={99} fontFamily="Montserrat" fontStyle="bold" fill="white" fontSize={10} />
                        <Rect x={8} y={-6} width={100} height={20} stroke="#03506f" strokeWidth={0.7} />
                        {/* Skill Item */}
                        {/* <Group x={10} y={20} >
                        <Text x={2} y={4} width={95} text="English" fill="white" fontStyle="bold" fontSize={8} />
                        <Rect x={0} y={14} width={111} height={11} stroke="white" strokeWidth="0.1"  />
                        <Rect x={3} y={17} width={105} height={5} fill="#F0C30E" />
                        </Group> */}
                        {this.returnSkills()}
                    </Group>
                    {/* Skills End */}
                    {/* Left Side End */}
                    {/* Right Side */}
                    {/* Personal Details  */}
                    <Group width={100} x={170} y={40} ref={node => { this.PersonalRef = node }}  >
                        <Text text={this.props.values.firstname + " " + this.props.values.lastname} fontSize={24} fontStyle="bold" fontFamily="Montserrat" />
                        <Text width={300} text={this.props.values.occupation} fontSize={15} y={24} fontFamily="Montserrat" />
                    </Group>
                    {/* Personal Details End */}
                    {/* Profile  */}
                    <Group x={170} y={this.PersonalRef ? this.PersonalRef.getClientRect().height + 50 : 40} ref={node => { this.ProfileRef = node }}  >
                        <Text text={t("resume.personalSummary")} y={8} fontSize={13} fontStyle="bold" fontFamily="Montserrat" ref={node => { this.ProfileTitleRef = node }} />
                        <Text width={300} fill="#6b6b6b" text={this.props.values.summary} fontSize={8} y={32} fontFamily="Montserrat" />
                        <Rect x={0} width={this.ProfileTitleRef ? this.ProfileTitleRef.getClientRect().width : 100} height={2} fill="blac k" y={22} />
                    </Group>
                    {/*  Profile End */}
                    {/* Professional History  */}
                    <Group x={170} y={this.PersonalRef ? this.PersonalRef.getClientRect().height + this.ProfileRef.getClientRect().height + 60 : 40} ref={node => { this.ProHistoryRef = node }}  >
                        <Text text={t("resume.employmentHistory")} y={8} fontSize={13} fontStyle="bold" fontFamily="Montserrat" ref={node => { this.ExperienceTitleRef = node }} />
                        <Rect x={0} width={this.ExperienceTitleRef ? this.ExperienceTitleRef.getClientRect().width : 100} height={2} fill="blac k" y={22} />
                        {/* Job Item */}
                        {/* <Group y={25}>
                            <Text y={5} text="JOB TITILE" fontStyle="bold" fontFamily="Montserrat" fontSize="9" />
                            <Text y={17} text="Company Name | 2020-2022"  fontFamily="Montserrat" fontSize="6" />
                            <Text y={27}  width={300} text="Company Name  desxcew ewkjnwew ejkwed wjefwejdwejhwendjwe fnwejdwej wedwjed wdjewd djewndkje dekwjd edwkjedw dejkwdw edkwjd"  fontFamily="Montserrat" fontSize="8" />
                        </Group> */}
                        {this.returnEmployments()}
                    </Group>
                    {/* Professional History End */}
                    {/* Education Start */}
                    <Group x={170} y={this.PersonalRef ? this.PersonalRef.getClientRect().height + this.ProfileRef.getClientRect().height + this.ProHistoryRef.getClientRect().height + 70 : 40} ref={node => { this.EducationRef = node }}  >
                        <Text text={t("resume.educationHistory")} y={8} fontSize={13} fontStyle="bold" fontFamily="Montserrat" ref={node => { this.EducationTitleRef = node }} />
                        <Rect x={0} width={this.EducationTitleRef ? this.EducationTitleRef.getClientRect().width : 100} height={2} fill="blac k" y={22} />
                        {/* Job Item */}
                        {/* <Group y={25}>
                            <Text y={5} text="JOB TITILE" fontStyle="bold" fontFamily="Montserrat" fontSize="9" />
                            <Text y={17} text="Company Name | 2020-2022"  fontFamily="Montserrat" fontSize="6" />
                            <Text y={27}  width={300} text="Company Name  desxcew ewkjnwew ejkwed wjefwejdwejhwendjwe fnwejdwej wedwjed wdjewd djewndkje dekwjd edwkjedw dejkwdw edkwjd"  fontFamily="Montserrat" fontSize="8" />
                        </Group> */}
                        {this.returnEducations()}
                    </Group>
                    {/* Education end */}
                    {/* Right Side end */}
                </Layer>
            </Stage>
        );
    }
}
/////////////////// Images
const ImageCanvas = (props) => {
    const [image] = useImage(props.image);
    return <Image x={props.x} y={props.y} height={props.height} width={props.width} image={image} />;
};
const MyComponent = withTranslation('common')(Cv6)
export default MyComponent;