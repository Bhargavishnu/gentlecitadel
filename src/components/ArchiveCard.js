import React from 'react';



class ArchiveCard extends React.Component{
    
     constructor(props) 
    {
        super(props);
        this.state= {deadline : new Date(this.props.due)}
        
    
    }
    
    
    
    render(){
        
        
        const dateStart = new Date(this.props.start);
        const dateEnd = new Date(this.props.due);
        const dateNow = new Date();
        const totalDiffTime = Math.abs(dateEnd - dateStart);
        const nowDiffTime = Math.abs(dateNow - dateStart);
        const totalDiffDays = Math.ceil(totalDiffTime / (1000 * 60 * 60 * 24)); 
        const nowDiffDays = Math.ceil(nowDiffTime / (1000 * 60 * 60 * 24)); 
        const percentDays = ((nowDiffDays/totalDiffDays))*100;
        
        if (dateEnd<dateNow)
            {
                
        return(
            <div className="col-lg-3 col-lg-offset-0 col-md-3 col-sm-5 col-xs-10" id="task-card" style={{padding:"20px"}}>
            <h4 className="text-left team-card-title">{this.props.name}</h4>
            <p>Report : {this.props.reporter} </p>
            <span className="label label-primary">Archived Before</span>
            <br />
            <br />
            <p>{(totalDiffDays - nowDiffDays)} Days</p>
            <span className="label label-warning">Deadline </span>
            <br />
            <br />
            <p>{this.state.deadline.toDateString()} </p>
            <span class="label label-primary">Status</span>
            <br />
            <br />
            <p>{this.props.status}</p>
            </div>
    
        )
    }
    else
    {
        return(<div></div>
              )
    }
        
    }
    
}

export default ArchiveCard;