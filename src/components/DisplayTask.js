import React from 'react';


class DisplayTask extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            taskData: [],
            dispTask : false,
            progType : ["to do","in progress","completed"]
        }
    }
    
    
    componentWillMount() {
        //const fetchurl = {this.props.url}+"/user/"+{this.props.uid}+"/tasks/all?key="+{this.props.token}
        var responseCode = 0; 
        var taskID=this.props.id;
        //var fetchurl="https://task-line.herokuapp.com/user/rahul/tasks/"+taskID+"?key=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6InJhaHVsIiwibmFtZSI6InJhaHVsIiwicm9sZSI6ImFkbWluIn0.tYUgIZXi8V4Twq_QdPC1rsfMltaqmCwZRUYhmp8hiEY"
        var fetchurl = this.props.url+"/user/"+this.props.uid+"/tasks/"+taskID+"?key="+this.props.token
        if( this.state.dispTask == false )
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
                                this.state.taskData = data;
                                
                                this.setState({dispTask : true})
                            }

                        else
                        {
                            alert("Cannot Fetch Data Try Later!!");
                        }
                });
        
               
            }
    }
        
    
    
    updateProgress()
    {
        document.getElementById("taskForm").className="ui segment loading"; 
        var oldindex = 0;
        var newindex = 0;
        for(var i=0;i<this.state.progType.length;i++)
            {
                if(this.state.progType[i]==this.state.taskData[0]["progress"])
                    {
                        oldindex=i;
                        newindex=i+1;
                    }
            }
        //if old index change
        if (oldindex >= 2)
            {
                //print error
                document.getElementById("taskForm").className="ui segment";
                document.getElementById("updateDetails").innerHTML="Cannot Update !! Already Done";
                
            }
        else
            {
               const sendData = new URLSearchParams({
                                              'progress' : this.state.progType[newindex].toString(),
                                              'oldProgress' : this.state.progType[oldindex].toString()
                                             });
        
                var  responseCode = 404;
               
        
    
                var fetchurl = this.props.url+"/user/"+this.props.uid+"/tasks/"+this.state.taskData[0]["id"]+"/update?key="+this.props.token;
                //var fetchurl = "https://task-line.herokuapp.com/user/rahul/tasks/"+this.state.taskData[0]["id"]+"/update?key=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6InJhaHVsIiwibmFtZSI6InJhaHVsIiwicm9sZSI6ImFkbWluIn0.tYUgIZXi8V4Twq_QdPC1rsfMltaqmCwZRUYhmp8hiEY";
                
        
                fetch(fetchurl,{method: 'PUT',
                                headers: {
                                        'Content-type': 'application/x-www-form-urlencoded' 
                                },body: sendData })
                .then(res => 
                { 
                    responseCode = res.status;
                   
      
                    if (responseCode == 204)
                        {
                            
                            return res; 
                            
                        }
                    else{
                       document.getElementById("taskForm").className="ui segment"; 
                    }
              })
        .then( data => 
              {     
                   
                     document.getElementById("taskForm").className="ui segment";
                    
                        if (data == undefined)
                        {
                            document.getElementById("updateDetails").innerHTML="Cannot Update !!! Try Again Later";
                        }
            
            
                        else if ( data )
                        {
                            document.getElementById("updateDetails").innerHTML="Progress Updated to "+this.state.progType[newindex];
                           
                        }
            
                    
                    else
                    {
                        document.getElementById("updateDetails").innerHTML="Cannot Update !!! Try Again Later"; 
                    }
            }); 
                
                
                
                
                
                
            }
        
        
    }
    
    
    
    
    render() {
        
        
        if(this.state.dispTask == true)
            {
                var type=this.state.taskData[0]["progress"]
                var label = ""
                if(type=="completed")
                    {
                        
                        label="Move to Archive"
                    }
                else
                    {
                        label="Update Progress"
                    }
                
                return(
                                    
    <div id="displayTaskForm" style={{width:"80%",position:"fixed",top:"20vh",zIndex:"5",backgroundColor:"#0e0e0e",height:"70vh",left:"10%",overflowY:"scroll",borderRadius:"10px",display:"block",transition:"all 0.5s"}}>
            <button className="circular ui icon button" onClick={ this.props.displayTask} style={{position:"absolute",left:"1%",top:"0",zIndex:"6",float:"left"}}>
                <i className="icon close"></i>
            </button>
               <div className="ui segment" id="taskForm" style={{padding:"10%",backgroundColor:"black",color:"white"}}>
               
                <h3> Task Details </h3>
                <div className="ui inverted form">
                    <div className="two fields">
                        <div className="field" >
                        <label>Task Name</label>
                        <p>{this.state.taskData[0]["name"].toUpperCase()}</p>
                        </div>
                        <div className="field">
                        <label>Report To</label>
                         <p>{this.state.taskData[0]["report_to"]}</p>
                        </div>
                    </div>
                    <div className="two fields">
                    <div className="field">
                        <label>Description</label>
                        <p>{this.state.taskData[0]["description"]}</p>
                    </div>
                    <div className="field">
                        <label>Priority</label>
                        <p>{this.state.taskData[0]["priority"]}</p>
                    </div>
                    </div>
                    <div className="field">
                        <label>Progress</label>
                        <p>{this.state.taskData[0]["progress"]}</p>
                    </div>
                    <div className="two fields">
                        <div className="field">
                        <label>Assigned On</label>
                        <p>{new Date(this.state.taskData[0]["progress_recorded_on"]).toDateString()}</p>
                        </div>
                        <div className="field">
                        <label>DeadLine</label>
                         <p>{new Date(this.state.taskData[0]["due_date"]).toDateString()}</p>
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="ui submit button" onClick={()=>this.updateProgress()}>{label}</div>
                    </div>  
                    <div id="updateDetails"></div>
                </div>
            </div>
        </div>   
                                );
            }
            
            else
                {
                    return(
        <div id="displayTaskForm" style={{width:"80%",position:"fixed",top:"20vh",zIndex:"5",backgroundColor:"#0e0e0e",height:"70vh",left:"10%",overflowY:"scroll",borderRadius:"10px",display:"block",transition:"all 0.5s"}}>
            <button className="circular ui icon button" onClick={this.props.displayTask} style={{position:"absolute",left:"1%",top:"0",zIndex:"6",float:"left"}}>
                <i className="icon close"></i>
            </button>
        </div>
                    
                    );
                }
            
            
            
    }
}
export default DisplayTask;

