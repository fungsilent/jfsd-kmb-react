import { useState, useEffect } from 'react'
import moment from 'moment'
import { fetchRouteStop } from '../data'

const RouteStop = ({ info }) => {
    const [stops, setStops] = useState([])
    const { route, bound, orig_tc, dest_tc, service_type } = info

    useEffect(() => {
        const getData = async () => {
            const data = await fetchRouteStop({
                route,
                bound,
                serviceType: service_type,
            })
            setStops(data)
        }
        if (route) getData()
    }, [route, bound, service_type])

    return (
        <div className='route-stop flex flex-col gap-4'>
            <p className='flex flex-row gap-2'>
                {!!route && (
                    <>
                        <span>巴士線:</span>
                        <span>{route}</span> <span>{orig_tc}</span>➤
                        <span>{dest_tc}</span>
                    </>
                )}
            </p>
            <div className='flex flex-col gap-2'>
                {stops.map(stopInfo => (
                    <BusStop
                        key={stopInfo.stop}
                        info={stopInfo}
                    />
                ))}
            </div>
        </div>
    )
}

const BusStop = ({ info }) => {
    console.log('BusStop', info)
    const { seq, name_tc, bus } = info
    return (
        <div className='flex flex-row border border-red-800'>
            <p className='w-[300px]'>
                <span>{seq}.</span>
                <span>{name_tc}</span>
                <span>{}</span>
            </p>
            <ul>
                {bus.map(({ eta, rmk_tc }) => (
                    <li>
                        <span data-eta={eta}>
                            {moment(eta).format('HH:mm')}
                        </span>
                        <span>{rmk_tc}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RouteStop
