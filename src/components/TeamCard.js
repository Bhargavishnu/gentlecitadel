import React from 'react';



class TeamCard extends React.Component{
    
     constructor(props) 
    {
        super(props);
    
    }
    
    
    render(){
        
        return(
         <div className="col-lg-3 col-lg-offset-0 col-md-3 col-sm-5 col-xs-10" id="team-card" title={this.props.id}>
            <h4 className="text-left team-card-title">{this.props.name}</h4>
            <br />
            <span class="label label-primary">Description</span>
            <br />
            <br />
            <p>{this.props.description}</p>
            
        </div>
        )
        
    }
    
}

export default TeamCard;