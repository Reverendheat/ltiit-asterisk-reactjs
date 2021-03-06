import React from 'react';

import Header from './Header';
import DevicePicker from './DevicePicker';
import Footer from './Footer';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <DevicePicker/>
                <Footer/>
            </div>
        )
    }
}

export default App;