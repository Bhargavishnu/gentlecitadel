import React from 'react';




class DisplayUser extends React.Component{
    constructor(props) {
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.state = {
            userData: [],
            dispUser : false
        }
    }
    
    
    componentWillMount() {
        const fetchurl = this.props.url+"/user/"+this.props.uid+"?key="+this.props.token
        var responseCode = 0; 
        //var fetchurl="https://task-line.herokuapp.com/user/rahul?key=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6InJhaHVsIiwibmFtZSI6InJhaHVsIiwicm9sZSI6ImFkbWluIn0.tYUgIZXi8V4Twq_QdPC1rsfMltaqmCwZRUYhmp8hiEY"
        if( this.state.dispUser == false )
            {
        fetch(fetchurl)
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
                                this.state.userData = data;
                               
                                this.setState({dispUser : true})
                            }

                        else
                        {
                            alert("Cannot Fetch Data Try Later!!");
                        }
                });
        
               
            }
    }
    
    render() {
      
        
        if(this.state.dispUser == true)
            {
                
                return(
<div className="ui segment" id="userForm" style={{textAlign:"center"}}>   
                    <h3 >My Details</h3>
<div class="ui raised card" style={{margin:"auto"}}>
  <div class="content">
    <div class="header">{this.state.userData[0]["name"].toUpperCase()}</div>
        <br />
        <br />
    <div class="meta">
      <span class="category">UID:{this.state.userData[0]["id"]}</span>
    </div>
    <div class="description">
      <p>Role:{this.state.userData[0]["role"]}</p>
      <p>Phone:{this.state.userData[0]["phone"]}</p>
      <p>Email:{this.state.userData[0]["email"]}</p>
    </div>
  </div>
         
</div>
</div>
                    );
            }
            
            else
                {
                    return(
                        
                <div className="ui segment" id="userForm" >
                    <div className="ui ">
                            <div className="field">
                                <label>UID</label>
                                <p>{this.props.uid}</p>
                            </div>
                    </div>
                </div>
                        
                    );
                }
            
            
            
    }
}
export default DisplayUser;

