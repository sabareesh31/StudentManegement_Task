import React, { Component } from 'react'
import EmployeeService from '../services/Student';
import {Link} from 'react-router-dom';

class Create extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            location:'',
            emailId: '',
            dob:'',
            education:'',
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeDobHandler = this.changeDobHandler.bind(this);
        this.changeEducationHandler = this.changeEducationHandler.bind(this);
        this.save = this.save.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({
                    firstName: employee.firstname,
                    lastName: employee.lastname,
                    location : employee.location,
                    emailId : employee.email,
                    dob : employee.dob,
                    education : employee.education
                });
                this.setState({data:res.data});
            });
        }        
    }

    save = (e) => {
        e.preventDefault();
        // if(this.validateForm()){
        let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName, 
            emailId: this.state.emailId,
            location : this.state.location,
            dob : this.state.dob,
            education : this.state.education

            };
        console.log('employee => ' + JSON.stringify(employee));
        EmployeeService.createEmployee(employee).then(res =>{
            this.props.history.push('/employees');
        });
        alert("Form Submitted");
        window.location.reload();
        // }
    }

    // validateForm(){
    //     let employee=this.state.employee;
    //     let error ={};
    //     let formIsValid=true;

    //     if(!employee["firstName"]){
    //         formIsValid=false;
    //         error["firstName"]="*Please entrr your firstname";
    //     }
    //     if(typeof employee["firstName"] !== "undefined"){
    //         if(!employee["firstName"].match(/^[a-zA-Z]*$/)){
    //             formIsValid=false;
    //             error["firstName"]="*please enter alphabet characters only ";
    //         }
    //     }
    //     this.setState({error:error});
    //     return formIsValid;
    // }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
        // if(this.state.pass !== this.state.firstName){
        //     let a=document.getElementById("firstname");
        //     a.style.color="red";
        // }
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeLocationHandler= (event) => {
        this.setState({location: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    changeDobHandler= (event) => {
        this.setState({dob: event.target.value});
    }
    changeEducationHandler= (event) => {
        this.setState({education: event.target.value});
    }
    

        cancel(){
            this.props.history.push('/employees');
        }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add New Student</h3>
        }else{
            return <h3 className="text-center">Update Student </h3>
        }
    }

    getContent(){
        
        if(this.state.id === '_add'){
            return <form>
            <div className = "form-group">
                <label> First Name: </label>
                <input placeholder="Enter Your First Name" name="firstName" className="form-control" id='firstName'
                    onChange={this.changeFirstNameHandler}/>
                
            </div>
            {/* <div className='errormsg'>{this.state.error.firstName}</div> */}
            <div className = "form-group">
                <label> Last Name: </label>
                <input placeholder="Enter Your Last Name" name="lastName" className="form-control" 
                     onChange={this.changeLastNameHandler}/>
            </div>
            <div className = "form-group">
                <label> Location: </label>
                <input placeholder="Location" name="location" className="form-control" 
                     onChange={this.changeLocationHandler}/>
            </div>
            <div className = "form-group">
                <label> Email Id: </label>
                <input placeholder="Email Address" name="emailId" className="form-control" 
                     onChange={this.changeEmailHandler}/>
            </div>
            <div className = "form-group">
                <label> DOB: </label>
                <input type="date" placeholder="Date Of Birth" name="dob" className="form-control" 
                     onChange={this.changeDobHandler}/>
            </div>
            <div className = "form-group">
                <label> Education: </label>
                <input placeholder="Education" name="education" className="form-control" 
                     onChange={this.changeEducationHandler}/>
            </div>

            <button className="alert alert-info" onClick={this.save}>Submit</button>
            <button className="alert alert-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
        </form>
        }
    }

    render() {
        
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                        <div><Link to='/ListEmployeeComponent'><svg  xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg><i class="bi bi-arrow-left " ></i></Link></div>
                            <div className = "card col-md-6 mt-4 ">
                                    {/* <h3 className="text-center">Add New Student</h3> */}
                                    { this.getTitle()}
                                <div className = "card-body">
                                    {this.getContent()}
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default Create
