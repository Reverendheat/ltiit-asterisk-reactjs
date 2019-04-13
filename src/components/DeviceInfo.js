import React from 'react';

class DeviceInfo extends React.Component {
    state = {
        isLoading: true,
        error: null
    }

    renderHelper() {
        return this.props.selectedValueInfo.map(entry => <tr key={entry.id}><td>{entry.var_name}</td><td>{entry.var_val}</td></tr>)
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Option Name</th>
                            <th>Option Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderHelper()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DeviceInfo