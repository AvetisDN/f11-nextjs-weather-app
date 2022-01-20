import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-gray-900 min-h-screen text-gray-200 flex items-center justify-center'>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
