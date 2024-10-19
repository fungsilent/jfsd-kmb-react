import { useState, useEffect } from 'react'
import './main.css'
import { useProcess } from './components/Process'
import Search from './components/Search'
import RouteStop from './components/RouteStop'
import { fetchRouteList } from './data'

const App = () => {
    const [routeList, setRouteInfoList] = useState([])
    const [routeInfo, setRouteInfo] = useState({})
    const [process, setProcess, Process] = useProcess()

    useEffect(() => {
        const getData = async () => {
            setProcess(50)
            const data = await fetchRouteList()
            setProcess(100)
            setRouteInfoList(data)
        }
        getData()
    }, [])

    /* callback */
    const selectRoute = info => {
        // set a new object to stay updated upon clicking
        setRouteInfo({ ...info })
    }

    /* render */
    return (
        <>
            <Process />
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
        </>
    )
}

export default App
