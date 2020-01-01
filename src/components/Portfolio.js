import React, { Component } from 'react'
import './Portfolio.css'

export class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            usdChecked: props.portfolio.isUsd
        }

    }

    setCurrency = (event) => {
        const isUsd = event.target.value === 'usd';
        this.setState({
            usdChecked: isUsd
        });
        this.props.toggleCurrency(this.props.portfolio.id, isUsd);
    }

    render() {
        return (
            <div>
                <div className="portfolioHeader">
                    <div>
                        <label id="portfolioNameID">
                            {this.props.portfolio.portfolioname}
                        </label>
                        <div id="stockCurrencyDisplayID">
                            <label>
                                Shown In:
                        </label>
                            <div onChange={this.setCurrency.bind(this)} class='currencyGroup'>
                                <input type="radio" name={this.props.portfolio.id} value="euro" checked={!this.state.usdChecked} /><b>€</b>
                                <input type="radio" name={this.props.portfolio.id} value="usd" checked={this.state.usdChecked} /><b>$</b>
                            </div>
                        </div>
                        <div id="deletePortfolioID" onClick={() => this.props.deletePortfolio(this.props.portfolio.id)}>&#x274C;</div>
                    </div>
                </div>
                {this.props.portfolio.stocks.length > 0 ?
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Unit Value</th>
                                    <th>Quantity</th>
                                    <th>Total Value</th>
                                    <th>Select</th>
                                </tr>
                                {
                                    this.props.portfolio.stocks ?
                                        this.props.portfolio.stocks.map((stock) => (
                                            <tr>
                                                <td>{stock.symbol}</td>
                                                <td>{stock.shareValue}</td>
                                                <td>{stock.noShares}</td>
                                                <td>{stock.totalValue}</td>
                                                <td><input type="checkbox" onChange={() => this.props.selectStock(stock.symbol, this.props.portfolio.id)} checked={stock.selected} ></input></td>
                                            </tr>
                                        )) : null
                                }
                            </tbody>
                        </table>
                        <div>
                            Total value of portfolio: <b>{this.props.portfolio.portfolioWorth}</b>
                        </div>
                    </div> : <div class='noStocks'> No stocks added yet </div>
                }
                <div className="portfolioFooter">
                    <button id="addStockID" onClick={() => this.props.openModal(this.props.portfolio.id)}>Add Stock</button>
                    <button id="perfGraphID">Perf Graph</button>
                    <button id="removeStocksID" onClick={() => this.props.deleteStocks(this.props.portfolio.id)}>Remove Selected</button>
                </div>
            </div>
        )
    }
}

export default Portfolio
