import { useState, useEffect } from 'react'
import moment from 'moment'
import { useProcess } from './Process'
import Refresh from './Refresh'
import { fetchRouteStop } from '../data'

const RouteStop = ({ info }) => {
    const [stops, setStops] = useState([])
    const [isRefresh, doRefresh] = useState(false)
    const [process, setProcess, Process] = useProcess()
    const { route, bound, orig_tc, dest_tc, service_type } = info

    useEffect(() => {
        const getData = async () => {
            setProcess(10)
            const data = await fetchRouteStop(
                {
                    route,
                    bound,
                    serviceType: service_type,
                },
                setProcess
            )
            setProcess(100)
            setStops(data)
        }
        if (route) getData()
    }, [info, isRefresh])

    const onRefresh = () => {
        doRefresh(prev => !prev)
    }

    return (
        <div className='flex flex-col gap-3'>
            <p className='flex flex-row gap-3 max-sm:flex-wrap'>
                {!!route && (
                    <>
                        <span className='font-bold mr-2 max-sm:w-full'>
                            巴士路線:
                        </span>
                        <span className='font-bold text-red-800'>{route}</span>
                        <span className='text-gray-500'>
                            <span className='text-xs mr-1'>由</span>
                            {orig_tc}
                        </span>
                        <span className='text-rose-500'>▶</span>
                        <span className='text-gray-500'>
                            <span className='text-xs mr-1'>往</span>
                            {dest_tc}
                        </span>
                    </>
                )}
                <span className='flex-1 flex justify-end'>
                    <Refresh onClick={onRefresh} />
                </span>
            </p>
            <div className='flex flex-col gap-2 bg-white p-2 rounded border border-gray-200 drop-shadow-2xl relative overflow-hidden'>
                <Process />
                {stops.map((stopInfo, index) => (
                    <BusStop
                        key={index}
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
        <div className='grid grid-cols-[36px_1fr_1fr] max-sm:grid-rows-1 justify-between gap-y-1 gap-x-6 border-b-2 border-b-rose-500'>
            <span className=' bg-rose-600 text-stone-100 text-center max-sm:row-span-2'>
                {seq}.
            </span>
            <span className='max-sm:col-span-2'>{name_tc}</span>
            <ul className='flex flex-col items-end mb-2 max-sm:col-span-2'>
                {bus.map(({ eta, rmk_tc }, index) => {
                    const time = moment(eta)
                    return (
                        <li
                            key={index}
                            className='flex flex-row items-center gap-12 py-1'
                        >
                            {!eta && !rmk_tc ? (
                                renderRemark('未能提供服務')
                            ) : (
                                <>
                                    {!!rmk_tc && renderRemark(rmk_tc)}
                                    {time.isValid() && (
                                        <span data-eta={eta}>
                                            {time.format('HH:mm')}
                                        </span>
                                    )}
                                </>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default RouteStop
