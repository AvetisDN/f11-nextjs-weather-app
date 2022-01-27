import Link from 'next/link';
import React, {useState} from 'react'
// import cities from '../lib/cities.json'
import axios from 'axios';

export default function SearchBox() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([])

    const onChange = async e => {
        const {value} = e.target
        
        setQuery(value)

        let matchedCities = []

        // if(value.length > 3) {
        //     for(let city of cities) {
        //         if(matchedCities.length >= 5) {
        //             break
        //         }
        //         const match = city.name.toLowerCase().includes( value.toLowerCase() )
        //         if(match) {
        //             matchedCities.push({
        //                 ...city,
        //                 slug: `${city.name.toLowerCase().replace(/ /g, '-')}`
        //             })
        //         }
        //     }
        // }

        if (value.length > 3) {
            const res = await axios.get(`http://localhost:5000/cities?name_like=${value}`)
            matchedCities = res.data
        }
        setResults(matchedCities)
    }

    const getSlug = (cityName, cityId) => {
        return `${cityName.toLowerCase().replace(' ', '-')}-${cityId}`
    }

    return (
        <div>
            <input 
                type="search" 
                value={query} 
                onChange={onChange} 
                className='bg-gray-700 p-4 w-full rounded-lg'
            />
            <div className='mt-3 flex flex-col gap-2 max-h-80 overflow-auto'>
                {results.length > 0 && 
                    results.map( (city, index) => (
                        <div key={index}>
                            <Link href={`/location/${getSlug(city.name, city.id)}`} passHref>
                                <a className='block py-2 px-3 rounded bg-gray-700 transition-colors hover:bg-gray-900'>
                                    {`${city.name}, ${city.country}`}
                                </a>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}