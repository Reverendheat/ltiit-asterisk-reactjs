import React from 'react';
import axios from 'axios';

import DeviceInfo from './DeviceInfo'
import DeviceNew from './DeviceNew'

class DevicePicker extends React.Component {
    state = {
        devices: [],
        selectedValue: "",
        selectedValueInfo:[],
        deviceNewActive: false,
        isLoading: true,
        error: null
    }
    handleChange = (event) => {
        let value = event.target.value
        axios.get(`http://localhost:3000/api/devices/${value}`)
        .then(res => {
            this.setState({
                selectedValueInfo: res.data,
                selectedValue: value,
                deviceNewActive: false
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleClick = (event) => {
        if (event.target.name === "new") {
            this.setState({
                deviceNewActive:true
            })
        } else if (event.target.name === "edit") {
            this.setState({
                deviceNewActive:false
            })
        } else if (event.target.name === "delete") {
            this.setState({
                deviceNewActive:false
            })
            if (window.confirm(`Are you sure you want to delete the selected device?`)) {
                axios.delete(`http://localhost:3000/api/devices/${this.state.selectedValue}`)
                    .then(res=> {
                        this.fetchDevices();
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }

    fetchDevices() {
        axios.get(`http://localhost:3000/api/devices`)
        .then(res => {
            const devices = res.data
            this.setState({devices,selectedValue:devices[0].cat_metric,isLoading:false})
        })
        .catch(error => {
            console.log(error)
        }) 
    }

    componentDidMount() {
        this.fetchDevices();
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
                <button onClick={this.handleClick} name="new">New Device</button>
                <button onClick={this.handleClick} name="edit">Edit</button>
                <button onClick={this.handleClick} name="delete">Delete</button>
                <DeviceInfo selectedValueInfo={this.state.selectedValueInfo} />
                {this.state.deviceNewActive ? <DeviceNew /> : <h3>Use the buttons to select an action</h3>}
            </div>
        )
    }
}

export default DevicePicker;