// import React from 'react'
import { useEffect, useState } from 'react'
import { Baseurl } from "../baseUrl";
import Loader from "../Loader";
import axios from "axios";
import Header from '../Header/Header';
import './Coins.css'
import { Link } from 'react-router-dom';

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('usd')
  const [search, setSearch] = useState('')
  const currencySymbole = currency === 'inr' ? '₹' : '$'

  useEffect(() => {
    const getCoinsData = async () => {
      const { data } = await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`);
      console.log(data);
      setCoins(data);
      setLoading(false);
    };
    getCoinsData();
  }, []);
  return (
   <>
    {
      loading ? <Loader/> :
      <>
        <Header/>
        <div className="search-bar">
          <input
           type="text"
           placeholder='Search Your Coins'
           style={{ position:'absolute', height:'2rem', width:'20rem', top:'1%', left:'35%', paddingLeft:'8px'}} 
           onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className="heading">
          <h1>All Coins</h1>
        </div>
        <div className="btns">
          <button onClick={() => setCurrency('inr')} >INR</button>
          <button onClick={() => setCurrency('usd')} >USD</button>
        </div>
          {
            coins.filter((data) => {
              if(data == '') {
                return data
              } else if(data.name.toLowerCase().includes(search.toLowerCase())) {
                return data
              }
            }).map((item, i) => {
              return(
                <CoinCards key={i} item={item} i={i} id={item.id} currencySymbole={currencySymbole} /> 
              )
            })
          }
      </>
    }
   </>
  )
}

const CoinCards = ({item, i, currencySymbole, id}) => {
  const profit = item.price_change_percentage_24h > 0
  return(
    <Link to={`/coins/${id}`} style={{color:'white', textDecoration:'none'}}>
      <div key={i} className="ex-cards">
                  <div className="image">
                   <img height={"80px"} src={item.image} alt="" />
                  </div>
                  <div className="name">
                    {item.name}
                  </div>
                  <div className="price">
                    {currencySymbole} {item.current_price.toFixed(0)}
                  </div>
                  <div style={profit ? {color:'green'} : {color:'red'}} className="rank">
                    {profit ? '+' + item.price_change_percentage_24h.toFixed(2) : item.price_change_percentage_24h.toFixed(2)}
                  </div>
      </div>
    </Link>
  )
}

export default Coins