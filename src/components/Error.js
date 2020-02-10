import React from 'react';


class Error extends React.Component{
    
    constructor(props)
    {
        super(props);
        if (this.props.uid==undefined)
            {
                window.location.href = "/";
            }
        this.logout = this.logout.bind(this);
        this.render = this.render.bind(this);
        
    }
    
    logout()
    {
       var i=0;
        while(i=0)
            {
        fetch(this.props.baseURL+"/user/"+this.props.uid+"/logout?key="+this.props.token)
        .then(res => 
              { 
                    if(res.code==200)
                        {
                            i=1;
                        }
                     
              });
            }
        window.location.href = "/";
        
    }
    
    
    render(){
        const mystyle = {
           position:"absolute",
            top:"40%",
            left:"40%",
            color:"lightblue"
        };
        
        
        return(
            <div>
            <div class="ui loading" style={{width:"30px",height:"20px",margin:"auto"}}></div>
            <h1 style={mystyle}>Please Wait!!</h1>
            {this.logout()}
    </div>
            
        )
        
    }
    
}
export default Error;