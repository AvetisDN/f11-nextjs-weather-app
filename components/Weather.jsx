import Image from 'next/image';
import React, {useState} from 'react';
import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import { getSlug } from '../lib/helpers';

export default function Weather({data}) {
    const [loaded, setLoaded] = useState(false);
    const cityName = `${data.name}, ${data.sys.country}`
    const icon = data.weather[0].icon
    const isDay = icon[icon.length - 1] === 'd'
    const descr = data.weather[0].description
    const temp = data.main.temp
    const realFeel = data.main.feels_like
    const humidity = data.main.humidity
    const wind = data.wind
    const sunrise = data.sys.sunrise
    const sunset = data.sys.sunset
    const tz = data.timezone * 1000

    const onIconLoaded = (img) => {
        setLoaded(true)
    }

    return (
        <div className='weather-container w-full max-w-xs p-6 bg-gray-800 shadow-xl rounded-3xl'>
            <Head>
                <title>{cityName} | Current Weather</title>
                <meta name='description' content={`Current weather in ${cityName}`} />
            </Head>
            <div className={`weather ${isDay ? 'day' : 'night'} ${loaded ? 'run' : ''}`}>
                <h1 className='text-2xl text-center pt-4 font-bold px-12 whitespace-nowrap'>
                    {cityName}
                </h1>
                <div className=' relative px-6 pb-4'>
                    <Image src={`/images/3d-icons/${icon}.png`}  
                        width={340} 
                        height={320} 
                        objectFit='contain' 
                        onLoadingComplete={onIconLoaded}
                        alt={descr}
                    />
                    <div className=' text-center text-7xl font-bold -mt-6 pb-4'>
                        {Math.round(temp)}&deg;C
                        <div className='text-base'>RealFeel: {Math.round(realFeel)}&deg;C</div>
                        <div className='text-base font-medium -mt-1'>{descr}</div>
                    </div>
                </div>
            </div>
            <div className='mt-6 flex flex-col items-center gap-4'>
                <div className='flex items-end gap-2 text-xl leading-none'>
                    <Image src={'/images/icons/humidity.png'} width={24} height={24} alt=''/>
                    <span>
                        {humidity}%
                    </span>
                </div>
                <div className='flex items-end gap-2 text-xl leading-none'>
                    <div style={{
                            display: 'block',
                            transform: `rotate(${wind.deg}deg)`
                        }}
                    >
                        <Image src={'/images/icons/arrow.png'} width={24} height={24} alt='' />
                    </div>
                    <span>
                        {wind.speed}m/s
                    </span>
                </div>
                <div className="flex justify-between gap-4 text-center">
                    <div>
                        <Image src={'/images/icons/sunrise.png'} width={100} height={100} alt='' />
                        <div>
                            {moment.utc(sunrise * 1000 + tz).format('HH:mm')}
                        </div>
                    </div>
                    <div>
                        <Image src={'/images/icons/sunset.png'} width={100} height={100} alt='' />
                        <div>
                            {moment.utc(sunset * 1000 + tz).format('HH:mm')}
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4 text-center'>
                <Link href={`/forecast/${getSlug(data.name, data.id)}`}>
                    <a className=' inline-block py-3 px-6 bg-rose-600 hover:bg-rose-500 transition-colors rounded-full'>
                        5 days forecast
                    </a>
                </Link>
            </div>
        </div>
    );
}
