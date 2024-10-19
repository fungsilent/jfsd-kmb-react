import { useState, useEffect } from 'react'
import './main.css'
import LoadingBar from 'react-top-loading-bar'
import Search from './components/Search'
import RouteStop from './components/RouteStop'
import { fetchRouteList } from './data'

const App = () => {
    const [routeList, setRouteInfoList] = useState([])
    const [routeInfo, setRouteInfo] = useState({})
    const [progress, setProgress] = useState()

    useEffect(() => {
        const getData = async () => {
            const data = await fetchRouteList(setProgress)
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
            <LoadingBar
                color='#ef4444'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
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
