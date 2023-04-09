import React, { useEffect, useState } from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';


export default function Coin({ coins, setCoins, searchInput, handleSearchInput }) {

    // let coinPrice = coin?.quote?.USD?.price;

    const [searchTerm, setSearchTerm] = useState('');
    const [coinData, setCoinData] = useState(coins);

    const [order, setOrder] = useState({
        id: '',
        name: '',
        symbol: '',
        rank: '',
        price: '',
        percent_24hChange: ''
    });

    const sorting = (col) => {
        if (order[col] === 'ASC') {
            var sorted = [...coins].sort((a, b) => a[col] > b[col] ? 1 : -1);
            var orderStatus = 'DSC';
        } else {
            var sorted = [...coins].sort((a, b) => a[col] < b[col] ? 1 : -1);
            var orderStatus = 'ASC';
        }
        setCoins(sorted);
        order[col] = orderStatus;
        setOrder(order);
    }

    return (
        <>
            <table className="w-full text-sm text-left text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                    <tr>

                        <th scope="col" className="px-6 py-3 cursor-pointer">
                            <div>
                                {/* <input name='id' type='text' className="inputField" style={{ width: '30%' }} onChange={(e) => handleSearchInput('id', e.target.value)} /> */}

                                <input type="text" name='id' style={{ width: '30%' }} onChange={(e) => handleSearchInput('id', e.target.value)} className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-300 focus:border-blue-300 block w-full py-1 px-1.5 mb-3 " placeholder="ID" />
                            </div>

                            <div onClick={() => sorting(`id`)} className=''>
                                {order['id'] === '' ? '' : order['id'] === 'ASC' ? <ArrowDropUpIcon className='upArrow' /> : <ArrowDropDownOutlinedIcon className='downArrow' />}ID
                            </div>

                        </th>

                        <th scope="col" className="px-6 py-3 cursor-pointer">
                            <div>
                                {/* <input name='name' type='text' className="inputField" style={{ width: '50%' }} onChange={(e) => handleSearchInput('name', e.target.value)} /> */}

                                <input type="text" name='name' style={{ width: '50%' }} onChange={(e) => handleSearchInput('name', e.target.value)} className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-300 focus:border-blue-300 block w-full py-1 px-1.5 mb-3 " placeholder="Name" />
                            </div>

                            <div onClick={() => sorting('name')} className=''>
                                {order['name'] === '' ? '' : order['name'] === 'ASC' ? <ArrowDropUpIcon className='upArrow' /> : <ArrowDropDownOutlinedIcon className='downArrow' />} Name
                            </div>

                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer">

                            <div>
                                {/* <input name='symbol' type='text' className="inputField" style={{ width: '50%' }} onChange={(e) => handleSearchInput('symbol', e.target.value)} /> */}

                                <input type="text" name='symbol' style={{ width: '50%' }} onChange={(e) => handleSearchInput('symbol', e.target.value)} className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-300 focus:border-blue-300 block w-full py-1 px-1.5 mb-3 " placeholder="Symbol" />
                            </div>

                            <div onClick={() => sorting('symbol')} className=''>
                                {order['symbol'] === '' ? '' : order['symbol'] === 'ASC' ? <ArrowDropUpIcon className='upArrow' /> : <ArrowDropDownOutlinedIcon className='downArrow' />} Symbol
                            </div>

                        </th>

                        <th scope="col" className="px-6 py-3 cursor-pointer">

                            <div>
                                {/* <input name='rank' type='text' className="inputField" style={{ width: '30%' }} onChange={(e) => handleSearchInput('rank', e.target.value)} /> */}

                                <input type="text" name='rank' style={{ width: '50%' }} onChange={(e) => handleSearchInput('rank', e.target.value)} className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-300 focus:border-blue-300 block w-full py-1 px-1.5 mb-3 " placeholder="Rank" />
                            </div>

                            <div onClick={() => sorting('rank')} className=''>
                                {order['rank'] === '' ? '' : order['rank'] === 'ASC' ? <ArrowDropUpIcon className='upArrow' /> : <ArrowDropDownOutlinedIcon className='downArrow' />}  Ranking
                            </div>

                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer">

                            <div>
                                {/* <input name='price' type='text' className="inputField" style={{ width: '50%' }} onChange={(e) => handleSearchInput('price', e.target.value)} /> */}

                                <input type="text" name='price' style={{ width: '50%' }} onChange={(e) => handleSearchInput('price', e.target.value)} className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-300 focus:border-blue-300 block w-full py-1 px-1.5 mb-3 " placeholder="Price" />
                            </div>

                            <div onClick={() => sorting('price')} className=''>
                                {order['price'] === '' ? '' : order['price'] === 'ASC' ? <ArrowDropUpIcon className='upArrow' /> : <ArrowDropDownOutlinedIcon className='downArrow' />} Price
                            </div>

                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer">

                            <div>
                                {/* <input name='percent_24hChange' type='text' className="inputField" style={{ width: '30%' }} onChange={(e) => handleSearchInput('percent_24hChange', e.target.value)} /> */}

                                <input type="text" name='percent_24hChange' style={{ width: '60%' }} onChange={(e) => handleSearchInput('price', e.target.value)} className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-300 focus:border-blue-300 block w-full py-1 px-1.5 mb-3 " placeholder="24H Change" />
                            </div>

                            <div onClick={() => sorting('percent_24hChange')} className=''>
                                {order['percent_24hChange'] === '' ? '' : order['percent_24hChange'] === 'ASC' ? <ArrowDropUpIcon className='upArrow' /> : <ArrowDropDownOutlinedIcon className='downArrow' />} 24H Change
                            </div>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        coins?.filter((coin) => {
                            return coin[searchInput.col].toString().toLowerCase().includes(searchInput.value.toLowerCase());
                        }).map((coin, index) => (

                            <>
                                <tr key={coin.id} className="bg-white border-b light:bg-gray-800 light:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-black-900 whitespace-nowrap light:text-white">
                                        {coin.id}.
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-black-900 whitespace-nowrap light:text-white">
                                        {coin.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {coin.symbol}
                                    </td>
                                    <td className="px-6 py-4">
                                        {coin.rank}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${
                                            parseInt(coin?.price) >= 1 ? coin?.price.toFixed(2) : coin?.price.toFixed(5)
                                        }
                                    </td>

                                    <td className={` ${coin.percent_24hChange >= 0 ? 'text-green-500' : 'text-red-500'} px-6 py-4 `}>
                                        {coin.percent_24hChangeh >= 0 ? <ArrowDropUpIcon /> : <ArrowDropDownOutlinedIcon />}{coin?.percent_24hChange?.toFixed(3)}%
                                    </td>

                                </tr>
                            </>
                        ))
                    }
                </tbody>
            </table>

        </>
    )
}