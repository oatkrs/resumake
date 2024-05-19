import React, { Component } from 'react';
import './Languages.scss'
import Arrow from '../../../assets/arrow.png';
import SimpleInput from '../simple-input/SimpleInput';
import DropdownInput from '../dropdown-input/DropdownInput';
import { withTranslation } from 'react-i18next';
class Languages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: "false",
            title: "(not-specified)", /// this is the title of the component . we will change it based on input change from ( SimpleInput )
            level: ''
        }
        this.toggleHandle = this.toggleHandle.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
    }
    // Handling toggle click 
    toggleHandle() {
        this.state.isOpened === "false" ? this.setState({ isOpened: "true" }) : this.setState({ isOpened: "false" });
    }
    // Handling toggle click 
    handleInputs(input, value) {
        if (input === "Language") {
            this.setState({ title: value })
            this.props.handleInputs(input, value, this.props.id, "Languages");
        } else if (input === "Level") {
            this.setState({ level: value })
            this.props.handleInputs(input, value, this.props.id, "Languages");
        }
    }
    render() {
        const { t } = this.props;
        return (
            <div className="panel">
                <div className="panel-heading">
                    <span className="panel-title"> {this.state.title}</span>
                    <span className="panel-subtitle">{this.state.level} </span>
                    <img alt="more" onClick={this.toggleHandle} className={this.state.isOpened === "false" ? "panel-toggler " : "panel-toggler panel-toggler-opened"} src={Arrow} />
                </div>
                <div className={this.state.isOpened === "false" ? "panel-body hidden" : "panel-body"}>
                    <div className="grid-2-col">
                        <SimpleInput handleInputs={this.handleInputs} placeholder="Ex: Spanish" title={t("form.language")} name="Language" />
                        <DropdownInput options={[t("Language.elemntary"), t("Language.Intermediate"), t("Language.Advanced"),t("Language.Proficient")]} handleInputs={this.handleInputs} title={t("form.level")} name="Level" />
                    </div>
                </div>
            </div>
        )
    }
}
const MyComponent = withTranslation('common')(Languages)
export default MyComponent;

