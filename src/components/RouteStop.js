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
        <div className='route-stop flex flex-col gap-3'>
            <p className='flex flex-row gap-3'>
                {!!route && (
                    <>
                        <span className='font-bold mr-2'>巴士路線:</span>
                        <span>{route}</span> <span>{orig_tc}</span>
                        <span className='text-red-600'>➤</span>
                        <span>{dest_tc}</span>
                    </>
                )}
            </p>
            <div className='flex flex-col gap-2 bg-white p-2 rounded border border-gray-200 drop-shadow-2xl'>
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
    // console.log('BusStop', info)
    const { seq, name_tc, bus } = info
    return (
        <div className='flex flex-row border-b border-b-rose-800'>
            <p className=''>
                <span>{seq}.</span>
                <span>{name_tc}</span>
            </p>
            <ul>
                {bus.map(({ eta, rmk_tc }, index) => {
                    const time = moment(eta)
                    return (
                        <li key={index}>
                            <span data-eta={eta}>
                                {time.isValid() && time.format('HH:mm')}
                            </span>
                            <span>{rmk_tc}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default RouteStop
