import React from 'react';
import axios from 'axios';

import DeviceInfo from './DeviceInfo'

class DevicePicker extends React.Component {
    state = {
        devices: [],
        selectedValue: "",
        selectedValueInfo:[],
        isLoading: true,
        error: null
    }
    handleChange = (event) => {
        this.setState({
            selectedValue: event.target.value
        })
        axios.get(`http://localhost:3000/api/devices/${this.state.selectedValue}`)
        .then(res => {
            this.setState({
                selectedValueInfo: res.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    componentDidMount() {
        axios.get(`http://localhost:3000/api/devices`)
        .then(res => {
            const devices = res.data
            this.setState({devices,selectedValue:devices[0].cat_metric,isLoading:false})
        })
        .catch(error => {
            console.log(error)
        }) 
    }

    renderHelper() {
        return this.state.devices.map(device => <option key={device.cat_metric} value={device.cat_metric}>{device.category}</option>)
    }

    render() {
        return (
            <div>
                {this.state.error ? <strong>{this.state.error}</strong> : null}
                <select value={this.state.selectedValue} onChange={this.handleChange}>
                    {!this.state.isLoading ? this.renderHelper() : <option>Loading...</option>}
                </select>
                <DeviceInfo selectedValueInfo={this.state.selectedValueInfo} />
            </div>
        )
    }
}

export default DevicePicker;