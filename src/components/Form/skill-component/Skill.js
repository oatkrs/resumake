import React, { Component } from 'react';
import './Skills.scss';
import Arrow from '../../../assets/arrow.png';
import Cross from '../../../assets/cross.png'
import SimpleInput from '../simple-input/SimpleInput';
import SimpleTextArea from '../simple-textarea/SimpleTextarea';
import ProgressBar from '../progress-bar/ProgressBar';
import Dropdown from '../dropdown-input/DropdownInput'
import { withTranslation } from 'react-i18next';

class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skillName: '(not-set)',
            rating: 0
        }
        this.toggleHandle = this.toggleHandle.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleInputs(inputName, Value) {
        switch (inputName) {
            case "Skill Name":
                this.setState({
                    skillName: Value
                });
                this.props.handleInputs(inputName, Value, this.props.id, "Skills");
                break;
            case "Rating":
                this.setState({
                    rating: Value
                });
                this.props.handleInputs(inputName, Value, this.props.id, "Skills");
                break;
            default:
                break;
        }
    }
    handleDelete() {
        console.log("in");
        this.props.handleDelete("Skills", 2); // This one responsable for removing the skill from the parent state
        this.props.handleComponentDelete("Skills", 2) // This one responsable to remove the skill component from parent
    }
    // Handling toggle click 
    toggleHandle() {
        this.state.isOpened === "false" ? this.setState({ isOpened: "true" }) : this.setState({ isOpened: "false" });
    }
    render() {
        const { t } = this.props;
        return (
            <div className="panel">
                <div className="panel-heading">
                    <span className="panel-title"> {this.state.skillName == "(not-set)" ? this.props.skillName : this.state.skillName}</span>
                    <span className="panel-subtitle">
                    </span>
                    <span className="actionButtons">
                        {/* <img alt="delete" onClick={this.handleDelete} className="panel-toggler cross " src={Cross} /> */}
                        <img alt="more" onClick={this.toggleHandle} className={this.state.isOpened === "false" ? "panel-toggler " : "panel-toggler panel-toggler-opened"} src={Arrow} />
                    </span>
                </div>
                <div className={this.state.isOpened === "false" ? "panel-body hidden" : "panel-body"}>
                    <div className="grid-2-col">
                        <SimpleInput handleInputs={this.handleInputs} title={t("form.skillName")}  name="Skill Name" />
                        <Dropdown handleInputs={this.handleInputs} options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} title={t("form.rating")} name="Rating"  />
                    </div>
                </div>
            </div>
        )
    }
}
const MyComponent = withTranslation('common')(Skill)
export default MyComponent;