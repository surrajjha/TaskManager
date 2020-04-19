import React, { Component } from 'react'
import axios from 'axios'
export default class AllTaskItems extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allTaskItem: [],
            taskItem_name: ''
        }
    }

    componentDidMount = (e) => {
        axios.get("http://127.0.0.1:5000/get-task-Item-all/" + this.props.match.params.tasklist_id)
            .then((response) => {
                this.setState({
                    allTaskItem: response.data
                })
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
            taskItem_name: this.state.taskItem_name
        }
        console.log(taskDetails)
        axios.post("http://127.0.0.1:5000/add-taskItem/" + this.props.match.params.tasklist_id, taskDetails)
            .then((response) => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }

    render() {
        let allTaskItem = this.state.allTaskItem.map((e, index) => {
            return (
                <tbody>
                    <tr>
                        <td>{index + 1}</td>
                        <td>{e.taskItem_name}</td>
                    </tr>
                </tbody>
            )
        })
        return (
            <div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <h2 className="offset-5">Add Taskitems</h2>
                        <input className="offset-4 form-control w-25 mt-4" name="taskItem_name" placeholder="Add Task Item" onChange={this.onChange}></input>
                        <button className="btn btn-danger w-25 mt-3 offset-4" >Add</button>
                    </form>
                    <table class="table w-50 offset-3 mt-5">
                        <tbody>
                            <tr>
                                <td>S.No</td>
                                <td>TaskItem</td>
                            </tr>
                        </tbody>
                        {allTaskItem}
                    </table>
                </div>
            </div>
        )
    }
}
