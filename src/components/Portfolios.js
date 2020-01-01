import React, { Component } from 'react'
import Portfolio from './Portfolio'
import './Portfolios.css'

export class Portfolios extends Component {
    render() {
        return (
            <div className="grid-container">
                {this.props.portfolios.map((portfolio) => (
                    <div className="grid-item">
                        <Portfolio portfolio={portfolio} openModal={this.props.openModal} selectStock={this.props.selectStock}
                        deleteStocks={this.props.deleteStocks} deletePortfolio={this.props.deletePortfolio} toggleCurrency={this.props.toggleCurrency}/>
                    </div>
                ))}
            </div>
        )
    }
}

export default Portfolios
