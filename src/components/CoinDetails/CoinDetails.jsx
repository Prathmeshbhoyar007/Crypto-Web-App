// import React from 'react'
import { useEffect, useState } from 'react'
import Loader from '../Loader'
import { Baseurl } from '../baseUrl'
import  axios  from 'axios'
import { useParams } from 'react-router-dom';
import './CoinDetails.css'
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi'
import { IoPulseOutline } from 'react-icons/io5'
import CoinChart from '../CoinChart/CoinChart';

const CoinDetails = () => {
  const {id} = useParams()
  const [currency, setCurrency] = useState('inr')
  const [coin, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const currencySymbole = currency === 'inr' ? '₹' : '$'
  const profit = coin.market_data?.price_change_percentage_24h > 0
  useEffect(() => {
    const getCoin = async() => {
      try {
        const {data} = await axios.get(`${Baseurl}/coins/${id}`)
        console.log(data);
        setCoins(data)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    getCoin()
  }, [])
  return (
    <>
    { 
      loading ? <Loader/> : <>
        <div className="coin-details" >
          <div className="coin-info">
          <div className="btn">
          <button onClick={() => setCurrency('inr')} >inr</button>
          <button onClick={() => setCurrency('usd')} >usd</button>
        </div>
          <div className="update-time">
            {coin.last_updated}
          </div>
          <div className="coin-image">
            <img src={coin.image.large} alt="" height={"150px"}/>
          </div>
          <div className="coin-name">
           {coin.name}
          </div>
          <div className="coin-price">
           {currencySymbole} {coin.market_data.current_price[currency]}
          </div>
          <div className="coin-profit">
            {profit ? <BiSolidUpArrow color='green'/> : <BiSolidDownArrow color='red' /> }
            {coin.market_data.price_change_percentage_24h}%
          </div>
          <div className="market-rank">
           <IoPulseOutline color='red'/> #{coin.market_cap_rank}
          </div>
          <div className="coin-desc">
             <p>
             {coin.description['en'].split('.')[0]}
             </p>
          </div>
          </div>
          <div>
            <CoinChart currency={currency}/>
          </div>
        </div>
      </>
    }
    </>
  )
}

export default CoinDetails