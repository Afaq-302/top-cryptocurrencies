import { useEffect, useState } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import Coin from "./components/Coin";
import Head from "next/head";


export async function getServerSideProps() {

  var response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
    headers: {
      'X-CMC_PRO_API_KEY': 'ce18122d-887f-48a6-8e76-2c124229e86c',
    },
  });

  if (response) {
    var filteredData = [];
    for (var r of response.data.data) {
      filteredData.push({
        id: r.id,
        name: r.name,
        symbol: r.symbol,
        rank: r.cmc_rank,
        price: r.quote.USD.price,
        percent_24hChange: r.quote.USD.percent_change_24h
      });
    }

    var renderPricesData = [
      { symbol: 'BTC', type: 'crypto' },
      { symbol: 'ETH', type: 'crypto' },
      { symbol: 'GBP', type: 'fiat' }
    ];

    for (let c of renderPricesData) {
        if (c.type == 'crypto') {
          let [{ price }] = filteredData.filter(coin => {
            return coin.symbol == c.symbol;
          });
          c.price = price;
        }
        if (c.type == 'fiat') {
          var res = await axios.get(`https://api.wise.com/v1/rates?source=${c.symbol}&target=USD`, {
            headers: {
                "Authorization": "Basic OGNhN2FlMjUtOTNjNS00MmFlLThhYjQtMzlkZTFlOTQzZDEwOjliN2UzNmZkLWRjYjgtNDEwZS1hYzc3LTQ5NGRmYmEyZGJjZA=="
            }
          });
          c.price = res.data[0].rate;
        }
    }

    return {
      props: {
        filteredData,
        renderPricesData
      },
    };

  }
}

function allCoins({ filteredData, renderPricesData}) {
  const [coins, setCoins] = useState(filteredData);
  const [currencyData, setCurrencyData] = useState(filteredData);
  const [search, setSearch] = useState({
    col: 'name',
    value: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  // CMC_API_KEY=ce18122d-887f-48a6-8e76-2c124229e86c

  useEffect(() => {
    setIsLoading(false);
  }, []);


  function handleChange(col, value) {
    setSearch({
      col,
      value
    });
  }

  return (
    <>
      <Head>
        <title>Top 100 Cryptocurrencies</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <div className="px-12 py-4 mt-10">
        <h1 className="text-4xl font-semibold text-blue-600 mb-6 text-center">
          Search Top 100 Cryptocurrencies
        </h1>

        <form className="flex justify-center my-6">
          <input type='text' placeholder="Search by name..." className="mt-4 px-3 border-b border-blue-500 light:border-red-600 focus:outline-none" onChange={(e) => handleChange('name', e.target.value)} />
          <button type="button" className="px-6 py-2 bg-gray-200 ml-4 hover:bg-gray-300 duration-500">Search</button>
        </form>

        {isLoading ? <BeatLoader color="#36d7b7" margin={4} className='text-center mt-32' /> :
          <div className="relative overflow-x-auto mt-10">

            <Coin coins={coins} currencyData={currencyData} renderPricesData={renderPricesData} handleSearchInput={handleChange} searchInput={search} setCoins={setCoins} />

          </div>
        }
      </div>

    </>
  );
}

export default allCoins;
