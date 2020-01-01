import React, { Component } from 'react'

export class AddStock extends Component {
  state = {
    symbol: '',
    noShares: '',
    shareValue: ''
  }

  handleSubmit = () => {
    const symbol = this.state.symbol;
    const noShares = this.state.noShares;
    const shareValue = this.state.shareValue;

    if (symbol === '' || noShares === '' || shareValue === '') {
      alert('Please input all data');
      return;
    }
    this.props.addStock(symbol, noShares, shareValue);
    this.setState({
      symbol: '',
      noShares: '',
      shareValue: ''
    })
  }

  handleChange = (propertyName, event) => {
    const state = this.state;
    state[propertyName] = event.target.value;
    this.setState(state);
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    const stockRow = {
      margin: '10px auto',
      width: '100%',
      textAlign: 'left'
    }

    const footer = {
      left: '0',
      bottom: '0',
      width: '100%',
      color: 'white',
    }

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          <h4>Add a Stock</h4>
          <div style={stockRow}>
            Enter Stock Symbol:
                <input type="text" value={this.state.symbol} onChange={this.handleChange.bind(this, 'symbol')} />
          </div>
          <div style={stockRow}>
            Enter Number of Shares:
                <input type="number" value={this.state.noShares} onChange={this.handleChange.bind(this, 'noShares')} />
          </div>
          <div style={stockRow}>
            Current value of 1 share:
                <input type="number" value={this.state.shareValue} onChange={this.handleChange.bind(this, 'shareValue')} />
          </div>
          <div style={footer}>
            <button onClick={this.handleSubmit}>
              Submit
                </button>
            <button onClick={this.props.onClose}>
              Close
                </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddStock;
