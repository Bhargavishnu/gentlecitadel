import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import TaskCard from './TaskCard';
import DisplayTask from './DisplayTask';
import TeamCard from './TeamCard';
import ArchiveCard from './ArchiveCard';


//**************************Taskcard Rendering


class Tasks extends React.Component{
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            taskArray: []
        }
    }
    
    
    
    componentDidMount() {
        const fetchurl = this.props.url+"/user/"+this.props.uid+"/tasks/all?key="+this.props.token
        //const fetchurl = "https://task-line.herokuapp.com/user/rahul/tasks/all?key=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6InJhaHVsIiwibmFtZSI6InJhaHVsIiwicm9sZSI6ImFkbWluIn0.tYUgIZXi8V4Twq_QdPC1rsfMltaqmCwZRUYhmp8hiEY"
            var responseCode = 0;
            var taskArray = [];
            var j=0
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
                                for( var i=0; i<data.length; i++)
                                    {
                                        if (data[i]["progress"] == this.props.type)
                                            {
                                                
                                                var taskName = data[i]["name"].toUpperCase();
                                                var taskID = data[i]["id"];
                                                var taskReport = data[i]["report_to"];
                                                var taskPriority = data[i]["priority"];
                                                var taskDue = data[i]["due_date"];
                                                var taskStart = data[i]["progress_recorded_on"];

                                                taskArray.push(
                                                    <TaskCard key={j} id={taskID} name={taskName} reporter={taskReport} priority={taskPriority} due={taskDue} start={taskStart} displayTask={this.props.displayTask} /> 
                                                              );
                                                j++;

                                            }

                                    }
                                //push Add new task as last element
                                
                                if (this.props.type == "to do")
                                {taskArray.push(<div class="col-lg-3 col-lg-offset-0 col-md-3 col-sm-5 col-xs-10 add-task-card" id="task-card" onClick={this.props.addTaskForm} >
                                        <i class="glyphicon glyphicon-plus" id="add-task"></i>
                                        <h1 class="text-center team-card-title">Add Task </h1>
                                        </div>
                                        );
                                }
                                    this.setState({taskArray});
                            
                            }

                        else
                        {
                            alert("Cannot Fetch Data Try Later!!");
                        }
                });
         
    }
    
    render() {
        return <div>{this.state.taskArray}</div>
    }
}


//************************************* TeamsCard Rendering


class Teams extends React.Component{
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            teamArray: []
        }
    }
    
    componentDidMount() {
        const fetchurl = this.props.url +"/user/"+this.props.uid+"/team/all?key="+this.props.token
        //const fetchurl = "https://task-line.herokuapp.com/user/rahul/team/all?key=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6InJhaHVsIiwibmFtZSI6InJhaHVsIiwicm9sZSI6ImFkbWluIn0.tYUgIZXi8V4Twq_QdPC1rsfMltaqmCwZRUYhmp8hiEY"
            var responseCode = 0;
            var teamArray = [];
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
                                for( var i=0; i<data.length; i++)
                                    {
                                        var teamName = data[i]["name"].toUpperCase();
                                        var teamID = data[i]["id"];
                                        var teamDescription = data[i]["description"];

                                        teamArray.push(
                                             <TeamCard key={i} name={teamName} id={teamID} description={teamDescription} /> 
                                                        );

                                    }

                                this.setState({teamArray});
                            }

                        else
                        {
                            alert("Cannot Fetch Data Try Later!!");
                        }
                });
         
    }
    
    render() {
        return <div>{this.state.teamArray}</div>
    }
}


//************************************* ArchiverCard Rendering


class Archives extends React.Component{
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            archiveArray: []
        }
    }
    
    componentDidMount() {
        const fetchurl = this.props.url+"/user/"+this.props.uid+"/tasks/all?key="+this.props.token
        //const fetchurl = "https://task-line.herokuapp.com/user/rahul/tasks/all?key=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6InJhaHVsIiwibmFtZSI6InJhaHVsIiwicm9sZSI6ImFkbWluIn0.tYUgIZXi8V4Twq_QdPC1rsfMltaqmCwZRUYhmp8hiEY"
            var responseCode = 0;
            var archiveArray = [];
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
                                for( var i=0; i<data.length; i++)
                                    {
                                        var archiveName = data[i]["name"];
                                        var archiveReport = data[i]["report_to"];
                                        var archiveStart = data[i]["progress_recorded_on"];
                                        var archiveDue = data[i]["due_date"];                    
                                        var archiveProgress = data[i]["progress"]; 
                                        var stat = "Incomplete"
                                        if (archiveProgress == "completed")
                                            {
                                                stat="Complete"
                                            }
                                

                                        archiveArray.push(
                                             <ArchiveCard key={i} name={archiveName} reporter={archiveReport} start={archiveStart} due={archiveDue}  status={stat} /> 
                                                        );

                                    }

                                this.setState({archiveArray});
                            }

                        else
                        {
                            alert("Cannot Fetch Data Try Later!!");
                        }
                });
         
    }
    
    render() {
        return <div>{this.state.archiveArray}</div>
    }
}


//*************************************Main Dashboard 



class Dashboard extends React.Component{
   
    constructor(props)
    {
        super(props);
        this.footerLast = this.footerLast.bind(this);
        this.render = this.render.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.bodyCenter = this.bodyCenter.bind(this);
        this.closeTask = this.closeTask.bind(this);
        this.handleTaskForm = this.handleTaskForm.bind(this);
        this.addTaskToBase = this.addTaskToBase.bind(this);
        this.state={mode: "mytasks", baseURL: this.props.location.state.baseURL , authToken : this.props.location.state.authToken , uid : this.props.location.state.uid , dispForm: false,changes:true};
        
    }
    
    
    
   
    
    
    
    //Related to display of task details
    displayTheTask(event)
    {
          var taskID=event.target.getAttribute("title");
            ReactDOM.render(
                <DisplayTask id={taskID} url={this.state.baseURL} token= {this.state.authToken} uid= {this.state.uid} displayTask={this.closeTask}  /> 
                ,document.getElementById("showTaskDetail")
                            );
    }
    
  
    
   
    

    closeTask()
    {
        ReactDOM.unmountComponentAtNode(document.getElementById("showTaskDetail"))
        window.location.reload()
        
    }
        

    
    
    
    //for task adding form
   
   
    handleTaskForm()
    {
        if(this.state.dispForm == true)
            {
                this.state.dispForm = false;
                document.getElementById("addTaskForm").style.display="none";
                
            }
         else if(this.state.dispForm == false)
            {
                this.state.dispForm = true;
                document.getElementById("addTaskForm").style.display="block";
                
            }
            
    }
    
    addTaskToBase(event)
    {
        
        event.preventDefault();
        
         document.getElementById("taskInside").className="ui inverted segment loading"; 
        const formdata = new FormData(event.target);
        
        const sendData = new URLSearchParams({'name': formdata.get("name"),
                                              'priority' : formdata.get("priority"),
                                              'description' : formdata.get("description"),
                                              'dueDate' : formdata.get("dueDate"),
                                              'assignee' : formdata.get("assignee")
                                             });
        
        var  responseCode = 404;
      
        
        var fetchurl = this.state.baseURL+"/user/"+this.state.uid+"/tasks/new?key="+this.state.authToken;
        //var fetchurl = "https://task-line.herokuapp.com/user/rahul/tasks/new?key=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6InJhaHVsIiwibmFtZSI6InJhaHVsIiwicm9sZSI6ImFkbWluIn0.tYUgIZXi8V4Twq_QdPC1rsfMltaqmCwZRUYhmp8hiEY";
        
        fetch(fetchurl,{method: 'POST' ,body: sendData })
        .then(res => 
              { 
            responseCode = res.status;
            
      
                if (responseCode == 201 )
                    {
                        return res; 
                       
                    }
              })
        .then( data => 
              {     
                  
                    
                        if (data == undefined)
                        {
                            document.getElementById("addTaskError").innerHTML="Cannot Create Task Try Again Later!!!";
                            document.getElementById("taskInside").className="ui inverted segment"; 
                        }
            
            
                        else if ( data )
                        {
                            document.getElementById("addTaskError").innerHTML="Task Created";
                            document.getElementById("taskInside").className="ui inverted segment"; 
                        }
            
                    
                    else
                    {
                        document.getElementById("addTaskError").innerHTML="Cannot Create Task Try Again Later!!!";
                         document.getElementById("taskInside").className="ui inverted segment"; 
                    }
            });
         
    }
    
    
    showForm()
    {
        var d = new Date();
        var day = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDay();
        
        
        return(
        <div id="addTaskForm" style={{width:"80%",position:"fixed",top:"20vh",zIndex:"5",backgroundColor:"#0e0e0e",height:"70vh",left:"10%",overflowY:"scroll",borderRadius:"10px",display:"none",transition:"all 0.5s"}}>
             <button className="circular ui icon button" onClick={() => this.handleTaskForm()} style={{position:"absolute",left:"1%",top:"0",zIndex:"6",float:"left"}}>
                    <i className="icon close"></i>
            </button>
            <form onSubmit={this.addTaskToBase}>
            <div className="ui inverted segment" id="taskInside" style={{padding:"10%"}}>
               
                <h3> Add New Task</h3>
                <div className="ui inverted form">
                    <div className="two fields">
                        <div className="field">
                        <label>Task Name</label>
                        <input placeholder="Task Name" name="name" type="text" />
                        </div>
                        <div className="field">
                        <label>Assigne Name</label>
                        <input placeholder="Assignee Name" name= "assignee" type="text"/> 
                        </div>
                    </div>
                    <div className="field">
                        <label>Description</label>
                        <textarea name="description" placeholder= "Description" style={{marginTop: "0px" ,marginBottom: "0px", height: "20%"}}></textarea>
                    </div>
                    <div className="field">
                        <label>Priority</label>
                        <select multiple=""name="priority" className="ui dropdown">
                            <option value="high">High</option>
                            <option value="normal">Normal</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className="five wide required field">
                        <label>DeadLine Date</label>
                        <input type="date" name="dueDate" min={day} placeholder="Task DeadLine" />
                    </div>
                    <button type="submit" className="ui submit button">Add Task</button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div id="addTaskError"></div>
                </div>
            </div>
        </form>
        
        </div>
        
        
        )
    }
    
    
    
    // footer stuffs
    changeMode(modeName)
    {
        var downIcons = document.getElementsByClassName("down-icon-items");
        if (this.state.mode == modeName )
            {
                return
            }
        for (var i=0;i<downIcons.length;i++)
            {
                downIcons[i].setAttribute("id","");
            }
        if ( modeName=="teams" )
        {
            downIcons[0].setAttribute("id","present-page");
           this.setState({mode: modeName});
        }
        else if ( modeName=="mytasks" )
        {
            downIcons[1].setAttribute("id","present-page");
            this.setState({mode: modeName});
         
        }
        else if ( modeName=="archives" )
        {
            downIcons[2].setAttribute("id","present-page");
           this.setState({mode: modeName});
            
            
        }
        else{
            alert("Refresh Page")
        }
        
    }
    
    footerLast() 
    {
        
         return(
        <footer className="down-nav">
    
        <div className="col-lg-5 col-lg-offset-1 col-md-12 down-icon-items" onClick={() => this.changeMode("teams")}><i className="fa fa-slideshare left-icons"></i>
            <p className="text-center">Teams </p>
        </div>
        <div className="col-lg-5 col-lg-offset-1 col-md-12 down-icon-items" id="present-page" onClick={() => this.changeMode("mytasks")} ><i className="fa fa-tasks left-icons"></i>
            <p className="text-center">My Tasks</p>
        </div>
        <div className="col-lg-5 col-lg-offset-1 col-md-12 down-icon-items" onClick={() => this.changeMode("archives")} ><i className="fa fa-history left-icons"></i>
            <p className="text-center">Archives </p>
        </div>

        </footer> 
         );
        
                    
    }
    
    
    
    //body handling
    bodyCenter()
    {
        if ( this.state.mode == "mytasks")
            {
                var headingName = "My Tasks";
                return(
                    <div>
                    <div className="col-md-12">
                        <h3>{headingName}</h3>
                        <hr />
                    </div>
                    <div className="col-md-12">
                        <h5 className="text-info">To-Do </h5>
                        <hr />
                        <div className="row task-row">
                            <div className="col-md-12">
                                <div className="task-cards-container">
                                    <Tasks displayTask={this.displayTheTask.bind(this)} addTaskForm= {this.handleTaskForm} type="to do" url={this.state.baseURL} token= {this.state.authToken} uid= {this.state.uid} />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                
            
                    <div className="col-md-12">
                        <h5 className="text-info"> In Progress</h5>
                        <hr />
                        <div className="row task-row">
                            <div className="col-md-12">
                                <div className="task-cards-container">
                                    <Tasks type="in progress" displayTask = {this.displayTheTask.bind(this)} addTaskForm= {this.handleTaskForm} url={this.state.baseURL} token= {this.state.authToken} uid= {this.state.uid}/>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    <div className="col-md-12">
                        <h5 className="text-info">Completed </h5>
                        <hr />
                        <div className="row task-row">
                            <div className="col-md-12">
                                <div className="task-cards-container">
                                    <Tasks type="completed" displayTask = {this.displayTheTask.bind(this)} url={this.state.baseURL} token= {this.state.authToken} uid= {this.state.uid}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.showForm()}
                    <div id="showTaskDetail"></div>
                    </div>
                );
            }
        //for archives
        
        else if ( this.state.mode == "archives")
            {
                var headingName = "Archives";
                return(
                <div>
                    <div className="col-md-12">
                        <h3>{headingName}</h3>
                        <hr />
                    </div>
                    <Archives url={this.state.baseURL} token= {this.state.authToken} uid= {this.state.uid} />
                </div>
                    );
            }
        
        //for teams
        else if ( this.state.mode == "teams")
            {
                var headingName = "My Teams";
                return(
                <div>
                    <div className="col-md-12">
                        <h3>{headingName}</h3>
                        <hr />
                    </div>
                    
                    <Teams url={this.state.baseURL} token= {this.state.authToken} uid= {this.state.uid} />
                </div>
                
                    );
            }
        else
            {
                var headingName = "Try Later !!";
                return(
                    <div className="col-md-12">
                        <h3>{headingName}</h3>
                        <hr />
                    </div>
                    );
            }
        
    }



    render()
    {
       
        return(
            <div style={{backgroundColor:"#f1f1f1"}}>
                <Navbar url={this.state.baseURL} token= {this.state.authToken} uid= {this.state.uid}></Navbar>
                <div className="row" id="main-row">    
                {this.bodyCenter()}
                </div>
                
                {this.footerLast()}
             </div>
        );
    }
  
    
}
export default Dashboard;