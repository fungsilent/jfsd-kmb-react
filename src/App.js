import { useState, useEffect } from 'react'
import './main.css'
import Loading from './components/Loading'
import Search from './components/Search'
import RouteStop from './components/RouteStop'
import { fetchRouteList } from './data'

const App = () => {
    const [routeList, setRouteInfoList] = useState([])
    const [routeInfo, setRouteInfo] = useState({})

    useEffect(() => {
        const getData = async () => {
            const data = await fetchRouteList()
            setRouteInfoList(data)
        }
        getData()
    }, [])

    /* callback */
    const selectRoute = info => {
        setRouteInfo(info)
    }

    /* render */
    if (!routeList.length) return <Loading />
    return (
        <section className='container flex flex-col gap-6 max-w-5xl m-auto'>
            <Search
                routeList={routeList}
                selectRoute={selectRoute}
            />
            <RouteStop info={routeInfo} />
        </section>
    )
}

export default App
