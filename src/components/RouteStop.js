import { useState, useEffect } from 'react'
import moment from 'moment'
import Refresh from './Refresh'
import { fetchRouteStop } from '../data'

const RouteStop = ({ info }) => {
    const [stops, setStops] = useState([])
    const [isRefresh, doRefresh] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const { route, bound, orig_tc, dest_tc, service_type } = info

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const data = await fetchRouteStop({
                route,
                bound,
                serviceType: service_type,
            })
            setLoading(false)
            setStops(data)
        }
        if (route) getData()
    }, [route, bound, service_type, isRefresh])

    const onRefresh = () => {
        doRefresh(prev => !prev)
    }

    return (
        <div className='flex flex-col gap-3'>
            <p className='flex flex-row gap-3'>
                {!!route && (
                    <>
                        <span className='font-bold mr-2'>巴士路線:</span>
                        <span>{route}</span> <span>{orig_tc}</span>
                        <span className='text-red-600'>➤</span>
                        <span>{dest_tc}</span>
                    </>
                )}
                <span className='flex-1 flex justify-end'>
                    <Refresh
                        isSpin={isLoading}
                        onClick={onRefresh}
                    />
                </span>
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

    const renderRemark = remark => {
        return (
            <span className='bg-gray-200 text-gray-500 rounded text-xs py-1 px-2'>
                {remark}
            </span>
        )
    }

    return (
        <div className='flex flex-row justify-between gap-6 border-b-2 border-b-rose-500'>
            <span className='bg-rose-500 text-stone-100 w-[36px] text-center'>
                {seq}.
            </span>
            <span className='grow'>{name_tc}</span>
            <ul className='flex flex-col items-end mb-2'>
                {bus.map(({ eta, rmk_tc }, index) => {
                    if (!eta && !rmk_tc) {
                        return renderRemark('未能提供服務')
                    }

                    const time = moment(eta)
                    return (
                        <li
                            key={index}
                            className='flex flex-row items-center gap-12 py-1'
                        >
                            {!!rmk_tc && renderRemark(rmk_tc)}
                            {time.isValid() && (
                                <span data-eta={eta}>
                                    {time.format('HH:mm')}
                                </span>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default RouteStop
