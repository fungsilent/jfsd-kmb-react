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
        <section className='container flex flex-col gap-6 max-w-4xl m-auto'>
            <img
                className='w-[200px] self-center'
                src='https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/KowloonMotorBus.svg/768px-KowloonMotorBus.svg.png?20190429174651'
            />
            <Search
                routeList={routeList}
                selectRoute={selectRoute}
            />
            {!!routeInfo.route && <RouteStop info={routeInfo} />}
        </section>
    )
}

export default App
