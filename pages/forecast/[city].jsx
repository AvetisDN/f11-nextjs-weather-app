import axios from 'axios';
import moment from 'moment';
import React from 'react';
import ForecastChart from '../../components/ForecastChart';

export async function getServerSideProps(context) {
    const slug = context.params.city
    const slugArray = slug.split('-')
    const id = slugArray[slugArray.length - 1]
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${process.env.NEXT_API_KEY}&id=${id}`)

    let start = moment().add(1, 'day').startOf('day').unix()
    let finish = moment().add(3, 'day').endOf('day').unix()

    const forecast = res.data.list.filter( item => item.dt >= start && item.dt <= finish)

    const cityName = `${res.data.city.name}, ${res.data.city.country}`

    return {
        props: {
            forecast,
            cityName,
        }
    }
}

export default function City({ forecast, cityName }) {
    return (
        <div className='w-full pt-6'>
            <h1 className='text-3xl text-gray-300 font-extrabold text-center'>
                {cityName}
            </h1>
            <ForecastChart forecast={forecast.slice(0,8)} />
            <ForecastChart forecast={forecast.slice(8,16)} />
            <ForecastChart forecast={forecast.slice(16,24)} />
        </div>
    )
}
