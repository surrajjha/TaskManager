import React, { Component } from 'react'
import axios from 'axios'
export default class MarkTaskItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allTaskItemNotComplete: [],
            allTaskItemComplete: []
        }
    }
    componentDidMount = (e) => {
        axios.get("http://127.0.0.1:5000/get-task-Item-not/" + this.props.match.params.tasklist_id)
            .then((response) => {
                this.setState({
                    allTaskItemNotComplete: response.data
                })
            })
            .catch((err) => alert(err))
        axios.get("http://127.0.0.1:5000/get-task-Item-complete/" + this.props.match.params.tasklist_id)
            .then((response) => {
                this.setState({
                    allTaskItemComplete: response.data
                })
            })
            .catch((err) => alert(err))

    }
    markTask = (taskItem_id) => {
        axios.post("http://127.0.0.1:5000/mark-task-Item/" + taskItem_id)
            .then((response) => {
                window.location.reload(false);
            })
            .catch((err) => alert(err))

    }
    render() {
        let allTaskItemNotComplete = this.state.allTaskItemNotComplete.map((e, index) => {
            return (
                <tbody>
                    <tr>
                        <td>{index + 1}</td>
                        <td>{e.taskItem_name}</td>
                        <td><button onClick={() => this.markTask(e.taskItem_id)} className="btn btn-primary ml-5">Mark</button></td>
                    </tr>
                </tbody>
            )
        })
        let allTaskItemComplete = this.state.allTaskItemComplete.map((e, index) => {
            return (
                <tbody>
                    <tr>
                        <td>{index + 1}</td>
                        <td>{e.taskItem_name}</td>
                        <td></td>
                    </tr>
                </tbody>
            )
        })
        return (
            <div>
                {
                    this.state.allTaskItemNotComplete != '' ? <>
                        <h2 className="offset-5 mt-3">Task Not Complete</h2>
                        <table class="table w-50 offset-3 mt-5">
                            <tbody>
                                <tr>
                                    <td>S.No</td>
                                    <td>TaskItem</td>
                                </tr>
                            </tbody>
                            {allTaskItemNotComplete}
                        </table></> : null
                }
                {
                    this.state.allTaskItemComplete != '' ? <>
                        <h2 className="offset-5 mt-3">Task Completed</h2>
                        <table class="table w-50 offset-3 mt-5">
                            <tbody>
                                <tr>
                                    <td>S.No</td>
                                    <td>TaskItem</td>
                                </tr>
                            </tbody>
                            {allTaskItemComplete}
                        </table>
                    </> : <h1 className="text-center mt-5">No Task Completed</h1>
                }

            </div>
        )
    }
}
