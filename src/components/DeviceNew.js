import React from 'react';
import axios from 'axios';


class DeviceNew extends React.Component {
    state = {
        fields:{
            category: "",
            type:"",
            host:"",
            context:""
        },
        optionalfields:{},
        newFieldName:""
    }

    addField = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            optionalfields: {
                ...prevState.optionalfields,
                [this.state.newFieldName]: ""
            },
            newFieldName: ""
        }));
    }
    removeField = (newfield, event) => {
        console.log(newfield);
        this.setState(prevState => ({
            optionalfields: {
                ...prevState.optionalfields,
                [newfield]:""
            }
        }))
        console.log(this.state);
    }
    handleChange = (event) => {
        const target = event.target
        console.log(target);
        if (target.name === 'newFieldName') {
            this.setState({
                newFieldName: target.value
            })
        } else if (target.name in this.state.fields) {
            this.setState(prevState => ({
                fields: {
                    ...prevState.fields,
                    [target.name]:target.value
                }
            }))
        } else {
            this.setState(prevState => ({
                optionalfields: {
                    ...prevState.optionalfields,
                    [target.name]:target.value
                }
            }))
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
/*         axios.post('http://localhost:3000/api/devices', this.state.fields)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error)
            }) */
    }

    renderHelper() {
        return (
            Object.keys(this.state.optionalfields).map((newfield) => {
                return (
                    <div key={newfield}>
                    {newfield}:<input onChange={this.handleChange} type="text" name={newfield} value={this.state.optionalfields.newfield} autoComplete="off" /><button onClick={(event) => this.removeField(newfield, event)} type="button">Remove</button><br/>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Please Enter the required information:
                    </label><br />
                        Category <input onChange={this.handleChange} value={this.state.fields.category} type="text" name="category" placeholder="device name" autoComplete="off"/> <br/>
                        Type <input onChange={this.handleChange} value={this.state.fields.type} type="text" name="type" placeholder="friend" autoComplete="off"/> <br/>
                        Host <input onChange={this.handleChange} value={this.state.fields.host} type="text" name="host" placeholder="dynamic" autoComplete="off"/> <br/>
                        Context <input onChange={this.handleChange} value={this.state.fields.context} type="text" name="context" placeholder="ltiit" autoComplete="off"/> <br/>
                        {this.renderHelper()}
                    <input onChange={this.handleChange} value={this.state.newFieldName} type="text" name="newFieldName" placeholder="Type new field name here" autoComplete="off"/>
                    <button onClick={this.addField}>Add field</button>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default DeviceNew;