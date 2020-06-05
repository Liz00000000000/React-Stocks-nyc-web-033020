import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    type: ''
  }

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stocks => this.setState({
      stocks: [...stocks]
    }))
  }
  
  addToPorfolio = (stockId) => () => {
    const newPortfolioStock = this.state.stocks.find(stock => stock.id === stockId )
    console.log(stockId, newPortfolioStock)
    this.setState({
      portfolio: [...this.state.portfolio, newPortfolioStock] 
    })
  }

  leavePortfolio = (stockId) => () => {
    const leavePortfolioStock = this.state.portfolio.find(stock => stock.id === stockId )
    let stockPortfolio = this.state.portfolio.slice()
    let index = stockPortfolio.indexOf(leavePortfolioStock)
     stockPortfolio.splice(index, 1)
    this.setState({ portfolio: [...stockPortfolio]})
  }

  chanceByType = (event) => {
    this.setState({
      type: event.target.value
    })
    console.log(this.state)
  }

  changeSortBy = (event) => {
    switch(event.target.value){
    case ("Alphabetically"):
      let orderByAlph = this.state.stocks.sort((a, b) => (a.name > b.name) ? 1 : -1)
    this.setState({
      stocks: orderByAlph
    })
    break;
    case ("Price"):
      let orderByPrice = this.state.stocks.sort((a, b) => (a.price < b.price) ? 1 : -1)
      this.setState({
        stocks: orderByPrice
      })
      break;
      default:
        null
      break;
    };
  }
  

  render (){
  let filteredStocks = this.state.stocks.filter(stock => stock.type.includes(this.state.type))

  return (
      <div>
        <SearchBar handleChange={this.chanceByType} handleRadio={this.changeSortBy}/>

          <div className="row">
            <div className="col-8">

              <StockContainer handleClick={this.addToPorfolio} stocks={filteredStocks} />

            </div>
            <div className="col-4">

              <PortfolioContainer handleClick={this.leavePortfolio} stocks={this.state.portfolio} />

            </div>
          </div>
      </div>
    )
  }

}

export default MainContainer;
