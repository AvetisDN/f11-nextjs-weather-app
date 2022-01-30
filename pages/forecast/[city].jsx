import axios from 'axios';
import React from 'react';

export async function getServerSideProps(context) {
    const slug = context.params.city
    const slugArray = slug.split('-')
    const id = slugArray[slugArray.length - 1]
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${process.env.NEXT_API_KEY}&id=${id}`)

    return {
        props: {
            data: res.data
        }
    }
}

export default function City({ data }) {
    console.log(data);
    return (
        <div>
            
        </div>
    )
}
