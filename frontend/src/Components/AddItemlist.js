import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default class AddItemlist extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             allTask:[],
             tasklist_name:'',
             tokenId: localStorage.getItem("token"),
             user_id:''
        }
    }
    
    componentDidMount = (e) => {
            axios.get("http://127.0.0.1:5000/get-user-token", {
                headers: {
                    Authorization: "Bearer " + this.state.tokenId,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.setState({
                    name: response.data.name,
                    user_id: response.data.user_id
                })
                axios.get("http://127.0.0.1:5000/get-task-list/"+response.data.user_id)
                .then((response) => {
                    this.setState({
                        allTask: response.data
                    })
                })
                .catch((err) => alert(err))
            })
            .catch((err) => alert(err))           
    }
    onChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        var taskDetails = {
            tasklist_name: this.state.tasklist_name,
            user_id:this.state.user_id
        }
        console.log(taskDetails)
        axios.post("http://127.0.0.1:5000/add-tasklist", taskDetails)
            .then((response) => {
                console.log(response.data)
                alert(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }

    deleteTasklist = (tasklist_id) => {
        axios.delete("http://127.0.0.1:5000/delete-tasklist",{
            headers: {
                tasklist_id:tasklist_id,
                user_id:this.state.user_id
            }
        })
            .then((response) => {
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }

    render() {
        let allTask = this.state.allTask.map((e,index)=>{
            return(
                <tbody>
                <tr>
                    <td>{index+1}</td>
                    <td>{e.tasklist_name}</td>
                    <td>{e.taskitems}</td>
                    <td><Link to={`/marktaskItem/${e.tasklist_id}`}><button className="btn btn-success ml-5">Mark Task Item</button></Link></td>
                    <td><Link to={`/addtaskItem/${e.tasklist_id}`}><button className="btn btn-primary ml-5">Add Task Item</button></Link></td>
                    <td><button onClick={() => this.deleteTasklist(e.tasklist_id)} className="btn btn-danger ml-5">Delete Tasklist</button></td>
                </tr>
            </tbody>
            )
        })
        return (
            <div>
               <div>
                   <form onSubmit={this.onSubmit}>
                    <h2 className="offset-5">Add Tasklist</h2>
                    <input className="offset-4 form-control w-25 mt-4" name="tasklist_name" placeholder="Add Task name" onChange={this.onChange}></input>
                    <button className="btn btn-secondary w-25 mt-3 offset-4" >Add</button>                             
                   </form>
                <table class="table w-50 offset-3 mt-5">
                <tbody>
                <tr>
                    <td>S.No</td>
                    <td>Tasklist</td>
                    <td>Taskitems</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
                    {allTask}
                </table>
                </div>

            </div>
        )
    }
}
