import React, { Component } from 'react'
import './AddPortfolio.css'

export class AddPortfolio extends Component {
    state = {
        isForm : false,
        portfolioname : ''
    }
    showHideForm = () => {
        const isForm = !this.state.isForm;
        this.setState({
            isForm : isForm,
            portfolioname: ''
        })
    }
    handleChange = (event) => {
        this.setState({portfolioname: event.target.value});
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.portfolioname === '') {
            alert('Enter a name to continue');
            return;
        }
        this.props.addPortfolio(this.state.portfolioname);
        this.setState({portfolioname: ''})
    }
    
    render() {
        return (
            <div>
                <div>
                    <button className="addNewPortFolio" title="Create New portfolio"
                    onClick={() => this.showHideForm()}>Create New portfolio</button> 
                </div>
                <div>
                {
                    this.state.isForm ? 
                    <div>
                        <input type="text" onChange={this.handleChange} value={this.state.portfolioname}/>
                        <input type="submit" onClick={this.handleSubmit} />
                    </div> : null
                }
                </div>
            </div>
        )
    }
}

export default AddPortfolio
