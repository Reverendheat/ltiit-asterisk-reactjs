import React from 'react';


class Footer extends React.Component {
    render() {
        return (
            <footer>Copyright {(new Date().getFullYear())}</footer>
        )
    }
}

export default Footer;