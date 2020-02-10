import React from 'react';
import {Link}  from 'react-router-dom';
import ReactDOM from 'react-dom';

class Navbar extends React.Component{
    
    render(){
       
            
        return(
            <nav className="navbar navbar-default navbar-fixed-top custom-header">
        <div className="container-fluid">
            <div className="navbar-header"><Link to={{pathname: '/dashboard', state : {baseURL: this.props.url,authToken : this.props.token, uid : this.props.uid }}} ><a className="navbar-brand navbar-link" href="#">Task<span className="text-muted title-side">Board </span> </a></Link>
                <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse">
                <ul className="nav navbar-nav links">
                    <li role="presentation" className="navbar-items"></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="#"> <span className="caret"></span><img src="assets/img/icondisplay.png" className="dropdown-image" /></a>
                        <ul className="dropdown-menu dropdown-menu-right" role="menu">
                            <li role="presentation" className="topbar-items"><Link to={{pathname: '/dashboard',state: {baseURL: this.props.url,authToken : this.props.token,uid : this.props.uid}}} >DashBoard <i className="glyphicon glyphicon-th"></i></Link></li>
                            <li role="presentation"><Link to={{pathname: '/settings',state: {baseURL: this.props.url,authToken : this.props.token,uid : this.props.uid}}}> Settings <i className="glyphicon glyphicon-wrench"></i></Link></li>
                            <li role="presentation" className="active"><Link to={{pathname: '/abcde',state: {baseURL: this.props.url,authToken : this.props.token,uid : this.props.uid}}} >Logout <i className="glyphicon glyphicon-off"></i></Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>  
        );
        
    }
    
}
export default Navbar;