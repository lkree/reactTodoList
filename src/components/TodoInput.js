import React, { Component } from 'react'

export default class TodoInput extends Component {
    render() {
        const {item, handleChange, handleSubmit, editItem} = this.props;
        
        return (
            <div className="form-holder">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        { /* Doesn't work in last versions of B.
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-info text-white">
                                <i className="fa fa-book" />
                            </div>
                        </div> */}

                        
                        <span>Let's</span>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="plan new task"
                            value={item}
                            onChange={handleChange}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="input-group_btn"
                    >
                        {editItem ? 'Edit task' : 'Add new task'} 
                    </button>
                </form>
            </div>
        )
    }
}
