import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Portfolios from './components/Portfolios';
import AddPortfolio from './components/AddPortfolio';
import AddStock from './components/AddStock';

class App extends Component {
  state = {
    portfolios: [
    ],
    isOpen: false,
    currentPortfolioID: ''
  };

  componentDidMount () {
    let portfolios = localStorage.getItem("portfolios");
    this.setState({
      portfolios: portfolios ? JSON.parse(portfolios) : []
    })
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openModal = (portfolioID) =>{
    this.setState({
      currentPortfolioID: portfolioID
    })
    this.toggleModal();
  }

  addPortfolio = (portfolioname) => {
    const portfolios = this.state.portfolios;
    const currentId = portfolios.length + 1;
    this.setState({
      portfolios: portfolios.concat([{'portfolioname': portfolioname, 'id': currentId, 'stocks': [], 'isUsd': false}])
    }, () => {
      localStorage.setItem('portfolios', JSON.stringify(this.state.portfolios))
    })
  }

  addStock = (symbol, noShares, shareValue) => {
    const totalValue = noShares * shareValue;
    this.toggleModal();
    this.setState({
      portfolios: this.state.portfolios.map(portfolio => (portfolio.id === this.state.currentPortfolioID ? 
        Object.assign({}, portfolio, {'stocks': portfolio.stocks.concat([{'symbol':symbol, 'noShares': noShares, 'shareValue': shareValue, 'totalValue': totalValue, 'selected': false, 'portfolioWorth':0}])}) : portfolio) )
    }, () => {
      this.updatePortfolioWorth(this.state.currentPortfolioID);
    });
  }

  updatePortfolioWorth = (portfolioID) => {
    const portfolios = this.state.portfolios
    console.log(portfolios);
    this.setState({
      portfolios: portfolios.map(portfolio => (
        portfolio.id === portfolioID ? Object.assign({}, portfolio, {'portfolioWorth': portfolio.stocks.reduce((a, b) => a + b.totalValue, 0) + (portfolio.isUsd ? ' $' : ' €')}) : portfolio
      ))
    },  () => {
      localStorage.setItem('portfolios', JSON.stringify(this.state.portfolios))
    })
  }

  selectStock = (stockSymbol, portfolioID) => {
    const portfolios = this.state.portfolios;
    this.setState({
      portfolios: portfolios.map(portfolio => (portfolio.id === portfolioID ? 
        Object.assign({}, portfolio,
          {'stocks': portfolio.stocks.map(stock => (stock.symbol === stockSymbol ?
          Object.assign({}, stock, {'selected': !stock.selected }) : stock))}) : portfolio))
    })
  }

  deleteStocks = (portfolioID) => {
    let isSelect = false;
    const portfolios = this.state.portfolios;

    this.setState({
      portfolios: portfolios.map(portfolio => (portfolioID === portfolio.id ?
          Object.assign({},portfolio,{'stocks': portfolio.stocks.filter(stock => !stock.selected)}) : portfolio
      ))
    }, () => {
      this.updatePortfolioWorth(portfolioID);
    })  
  }

  deletePortfolio = (portfolioID) => {
    let deletePor = window.confirm('Confirm deleting this portfolio ?')
    if(!deletePor) {
      return;
    }
    const portfolios = this.state.portfolios;
    this.setState({
      portfolios: portfolios.filter(portfolio => portfolio.id !== portfolioID)
    },  () => {
      this.updatePortfolioWorth(portfolioID);
    })
  }

  toggleCurrency = (portfolioID, isUsd) => {
    const portfolios = this.state.portfolios;
    this.setState({
      portfolios: portfolios.map(portfolio => portfolio.id === portfolioID?
          Object.assign({}, portfolio, {'isUsd': isUsd, 'stocks': portfolio.stocks.map(stock =>  isUsd ? 
            Object.assign({}, stock, {'shareValue': Math.round(1.2 * stock.shareValue), 'totalValue': Math.round(1.2 * stock.totalValue)}): 
            Object.assign({}, stock, {'shareValue': Math.round(stock.shareValue/1.2), 'totalValue': Math.round(stock.totalValue/1.2)})
            )}) : portfolio
        )
    }, () => {
      this.updatePortfolioWorth(portfolioID);
    })
  }

  render(){
    
    return (
      <div className="App">
        <h2> Stocks Portfolio Management System </h2>
        <AddPortfolio addPortfolio={this.addPortfolio}/>
        <h4>Portfolios List</h4>
        <Portfolios portfolios={this.state.portfolios} openModal={this.openModal} selectStock={this.selectStock} 
        deleteStocks={this.deleteStocks} deletePortfolio={this.deletePortfolio} toggleCurrency={this.toggleCurrency}/>
        <AddStock show={this.state.isOpen}
          onClose={this.toggleModal} portfolioID={this.state.portfolioID} addStock={this.addStock}/>
      </div>
    );
  }

 
}

export default App;
