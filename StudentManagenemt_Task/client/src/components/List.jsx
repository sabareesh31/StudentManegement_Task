import React, { Component } from 'react'
import EmployeeService from '../services/Student'

class List extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            if(window.confirm("are you sure ?"))
                {
                    alert("Deleted Successfully");
                    // window.location.reload();
                }
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
                
        });
        
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    /*editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }*/
    
    editEmployee(id){
        this.props.history.push(`/update-employee/${id}`);  
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (

            <div>
                 <h4 className="head_data mt-4">Student Management System</h4>
                 
                 <div className = "row">
                    <button className="data_add btn btn-dark mt-3" onClick={this.addEmployee}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                    </svg><i class="bi bi-person-plus"></i> Add </button>
                 </div>

                 <br></br>

                 <div className = "row mt-3">
                        <table  className = "table table-striped ">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th> First Name </th>
                                    <th> Last Name </th>
                                    <th> Location </th>
                                    <th> Email Id </th>
                                    <th> DOB </th>
                                    <th> Education </th>
                                    <th> Actions </th>
                                    <th> Delete </th>
                                    {/* <th> View </th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = { employee.id }>
                                            <td> { employee.id } </td>   
                                             <td> { employee.firstname } </td>   
                                             <td> { employee.lastname } </td>
                                             <td> { employee.location } </td>
                                             <td> { employee.email } </td>
                                             <td> { employee.dob } </td>
                                             <td> { employee.education } </td>
                                             <td>
                                               
                                                <button onClick={ () => this.editEmployee(employee.id)} className="alert alert-danger">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                                </svg><i class="bi bi-person-plus"></i> Edit </button>
                                             </td>
                                             <td>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="alert alert-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                </svg><i class="bi bi-trash"></i> Delete </button>
                                             </td>
                                             {/* <td>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                                             </td> */}
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
                
            </div>
        )
    }
}

export default List
