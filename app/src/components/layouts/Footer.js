import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="foot-link">
                    <a href="terms.html">Terms &amp; Conditions</a>
                    <span>|</span>
                    <a href="policy.html">Privacy Policies</a>
                </div>
                <div className="social">
                    <i className="fab fa-facebook-square" title="Facebook" />
                    <i className="fab fa-twitter-square" title="Twitter" />
                    <i className="fab fa-whatsapp-square" title="Contact" />
                </div>
            </footer>

        );
    }
}

export default Footer;
