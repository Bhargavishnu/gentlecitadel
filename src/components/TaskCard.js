import React from 'react';



class TaskCard extends React.Component{
    
     constructor(props) 
    {
        super(props);
        this.state= {deadline : new Date(this.props.due) ,bordercolor:{}};
    
    }
    
    componentDidMount()
    {
        
       
        
        
        
    }
    
    render(){
        
        
        const dateStart = new Date(this.props.start);
        const dateEnd = new Date(this.props.due);
        const dateNow = new Date();
        const totalDiffTime = Math.abs(dateEnd - dateStart);
        const nowDiffTime = Math.abs(dateNow - dateStart);
        const totalDiffDays = Math.ceil(totalDiffTime / (1000 * 60 * 60 * 24)); 
        const nowDiffDays = Math.ceil(nowDiffTime / (1000 * 60 * 60 * 24)); 
        var percentDays = ((nowDiffDays/totalDiffDays))*100;
        if (percentDays > 100)
            {
                percentDays = 0
               
            }
        else if (percentDays < 0)
            {
                
                percentDays = 0
            }
        if (dateEnd<dateNow)
            {
                this.state.bordercolor={border:"2px solid red"};
                percentDays=100
            }
        
        
        
       if (dateEnd<dateNow)
           {
               return(<div></div>)
           }
        else   
        {
        return(
            <div className="col-lg-3 col-lg-offset-0 col-md-3 col-sm-5 col-xs-10" id="task-card" style={this.state.bordercolor}  title={this.props.id} onClick={this.props.displayTask }>
            <h4 className="text-left team-card-title">{this.props.name}</h4>
            <p>Report : {this.props.reporter} </p>
            <span className="label label-primary">Priority </span>
            <br />
            <br />
            <p>{this.props.priority.toUpperCase()}</p>
            <span className="label label-warning">Deadline </span>
            <br />
            <br />
            <p>{this.state.deadline.toDateString()} </p>
            <span class="label label-primary">Time Left</span>
            <br />
            <br />
            <div className="progress">
                <div className="progress-bar progress-bar-info" aria-valuenow={nowDiffDays} aria-valuemin="0" aria-valuemax={totalDiffDays} style={{width: percentDays +"%"}}>{Math.ceil(percentDays)}%</div>
            </div>
            </div>
        )
            }       
        
    }
    
}

export default TaskCard;