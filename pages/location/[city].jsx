import axios from 'axios';
import React from 'react';

export async function getServerSideProps(context) {
    const slug = context.params.city
    const city = slug.replace('-', ' ')
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.NEXT_API_KEY}`)
    
    return {
        props: {
            data: res.data
        }
    }
} 

export default function City({data}) {
  return (
    <div>
        {data.city.name}
        <div>
            <img src={`/images/3d-icons/${data.list[0].weather[0].icon}.png`} alt="" width={300} />
        </div>
    </div>
  )
}
