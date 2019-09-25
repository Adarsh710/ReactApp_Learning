import React, {Component} from 'react';
import './layout.css';

class Navbar extends Component{
    render(){
        return(
            <div className="nav">
                <div className="nav-header">
                    <div className="nav-title">
                    Putatoe
                    </div>
                </div>
                <div className="nav-btn">
                    <label>
                    <span></span>
                    <span></span>
                    <span></span>
                    </label>
                </div>
    
                <div className="nav-links">
                    <a href="//github.io/jo_geek">Github</a>
                    <a href="http://stackoverflow.com/users/4084003/">Stackoverflow</a>
                    <a href="https://in.linkedin.com/in/jonesvinothjoseph">LinkedIn</a>
                    <a href="https://codepen.io/jo_Geek/">Codepen</a>
                    <a href="https://jsfiddle.net/user/jo_Geek/">JsFiddle</a>
                </div>
            </div>
        )
    }
}

export default Navbar;