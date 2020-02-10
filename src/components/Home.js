import React from 'react';
import  { Redirect } from 'react-router-dom';

class Home extends React.Component{
  
    
    constructor(props) 
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { uid : "0", authToken : "" ,baseURL:"https://task-line.herokuapp.com"};
    }
    
    
    
    handleSubmit(event) {
        event.preventDefault();
        
         document.getElementById("loginForm").className="ui large form loading"; 
        const formdata = new FormData(event.target);
        
        const sendData = new URLSearchParams({'username': formdata.get("username"),'password' : formdata.get("password")});
        
        var  responseCode = 404;
        
        var username = formdata.get("username");
        
        fetch(this.state.baseURL+"/login",{method: 'POST' ,body: sendData })
        .then(res => 
              { 
            responseCode = res.status;
      
                if (responseCode == 200 )
                    {
                        return res.json(); 
                    }
              })
        .then( data => 
              {       
                    if ( data )
                        {
                            var token = data["token"];
                            var userid = data["id"];
                            this.state.uid = userid;
                            this.state.authToken = token;
                            this.props.history.push( {
                                    pathname: '/dashboard',
                                    state: { uid : this.state.uid , authToken : this.state.authToken , baseURL: this.state.baseURL }
                                    });
                            
                        }
                    else
                    {
                        document.getElementById("errorMessage").innerHTML="Invalid Credentials!!!";
                         document.getElementById("loginForm").className="ui large form"; 
                    }
            });
        
    }
            
            
            
       componentDidMount() 
    {
        document.getElementsByTagName('body')[0].style.backgroundColor="black";
    }

                
        
    
    render(){
        
         const mystyle = {
            marginTop:"30vh"
            };
        return(
            <div className="ui middle aligned center aligned grid login-component" style ={mystyle}>
            <div className="column" style={{color:"firebrick"}}>
            <h2 className="ui teal image header">
            <div className="content">
                LOGIN FOR <div className="extras">TASKS</div>
            </div>
            </h2>
            <form className="ui large form" id="loginForm" onSubmit={this.handleSubmit} >
            <div className="ui stacked segment" style={{borderRadius:"3%",
              backgroundColor:"rgba(69, 62, 62, 0.5)"}}>
                <div className="field" >
                <div className="ui left icon input">
                <i className="user icon"></i>
                <input type="text" name="username" placeholder="Username "/>
                </div>
                </div>
                <div className="field ">
                <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" name="password" placeholder="Password"/>
                </div>
            </div>

            
            <button type="submit" className="ui fluid large submit button">LOGIN</button>
      </div>
    </form>
    
    <div id="errorMessage"  style={{color:"white"}}></div>
  </div>
</div>
            
        )
        
    }
    
}
export default Home;