import React from 'react';
import Navbar from './Navbar';
import DisplayUser from './DisplayUser';



class Settings extends React.Component{
    
     constructor(props)
    {
        super(props);
        alert(this.props.location.state.uid)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            uid :this.props.location.state.uid,
            baseURL:this.props.location.state.baseURL,
            authToken:this.props.location.state.authToken
        }
        
        
    }
   
    
    
    handleSubmit(event) {
        event.preventDefault();
        
         document.getElementById("loginForm").className="ui large form loading"; 
        const formdata = new FormData(event.target);
        
        const sendData = new URLSearchParams({'oldPassword': formdata.get("oldPassword"),'newPassword' : formdata.get("newPassword")});
        
        var  responseCode = 404;
        var fetchurl = this.state.baseURL + "/user/"+this.state.uid + "/changePassword?key="+this.state.authToken
        //var fetchurl ="https://task-line.herokuapp.com/user/rahul/changePassword?key=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Imk5MTY2IiwibmFtZSI6ImVzaHdhciIsInJvbGUiOiJhZG1pbiJ9.1ITAAbp8mef4OKAmbfnxWM3_YoPTWhpT3F-x3RAamQ8"
        fetch(fetchurl,{method: 'PUT' ,body: sendData})
        .then(res => 
              { 
            responseCode = res.status;
      
                if (responseCode > 200 && responseCode < 300 )
                    {
                        return res; 
                    }
            else{
                document.getElementById("userDetails").innerHTML="Invalid Credentials!!!";
                         document.getElementById("loginForm").className="ui large form"; 
            }
              })
        .then( data => 
              {       
                    if ( data )
                        {
                                document.getElementById("userDetails").innerHTML="Password Updated Successfully";
                                document.getElementById("loginForm").className="ui large form";
                            
                        }
                    else
                    {
                        document.getElementById("userDetails").innerHTML="Invalid Credentials!!!";
                         document.getElementById("loginForm").className="ui large form"; 
                    }
            });
        
    }
    
    
    //body handling
    UserDetails()
    {
               
                return(
                    <div>
                    <div className="col-md-12">
                        <h3>My Profile</h3>
                        <hr />
                    </div>
                    <DisplayUser url={this.state.baseURL} token={this.state.authToken} uid={this.state.uid}/>
                    </div>
                );
    }
    
    changePassword()
    {
        
                return(
                    <div>
                    <div className="col-md-12">
                        <h3>Change Password</h3>
                        <hr />
                    </div>
                    <div className="ui segment" id="updatePassword" style={{textAlign:"center"}}> 
                    <h3 >Change Password</h3>
                        <div class="ui raised card" style={{margin:"auto",width:"80%"}}>
                            <div class="content">
                            <form className="ui form" id="loginForm" onSubmit={this.handleSubmit} >
                                
                                    <div className="field" >
                                        <input type="text" name="oldPassword" placeholder="Old Password "/>
                                    </div>
                                    <div className="field ">
                                            <input type="password" name="newPassword" placeholder="New Password"/>
                                    </div>
                         
                                        <button type="submit" className="ui fluid large submit button">CHANGE PASSWORD</button>
                                    
                            </form> 
                            <div id="userDetails"></div>
                        </div>
                    </div>
                    </div>
                    </div>
                );
    }
       
        
    



    render()
    {
        return (
            <div style={{backgroundColor:"#f1f1f1"}}>
                <Navbar url={this.state.baseURL} token= {this.state.authToken} uid= {this.state.uid}></Navbar>
                <div className="row" id="main-row">    
                {this.UserDetails()}
                <br />
                <br />
                <br />
                {this.changePassword()}
                </div>
            </div>
        );
    }
  
    
}
export default Settings;