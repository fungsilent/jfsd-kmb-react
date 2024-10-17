const apiUrl = 'https://data.etabus.gov.hk/v1/transport/kmb/'

const boundMap = {
    I: 'inbound',
    O: 'outbound',
}

export const fetchRouteList = async () => {
    const data = await fetchData('route')
    return data ?? []
}

export const fetchRouteStop = async ({ route, bound, serviceType }) => {
    let result = []
    const data = await fetchData(
        `route-stop/${route}/${boundMap[bound]}/${serviceType}`
    )

    if (!data) return result
    const tasks = await data.map(async info => {
        const stopData = await fetchStopData({
            stopId: info.stop,
            route,
            bound,
            serviceType,
        })

        if (stopData) {
            return {
                ...info,
                ...stopData,
            }
        }
    })
    result = await Promise.all(tasks)
    return result
}

const fetchStopData = async ({ stopId, route, bound, serviceType }) => {
    const [stopName, stopETA] = await Promise.all([
        fetchData(`stop/${stopId}`),
        fetchData(`eta/${stopId}/${route}/${serviceType}`),
    ])

    return {
        ...stopName,
        bus: stopETA.filter(item => item.dir === bound).slice(0, 3), // get first 3 items
    }
}

export async function fetchData(endpoint) {
    try {
        let response = await fetch(`${apiUrl}${endpoint}`)
        response = await response.json()

        if (response.code) {
            throw new Error(`[${response.code}]: ${response.message}`)
        }

        return response.data
    } catch (err) {
        console.log(`ERROR: ${endpoint}`, err.message)
        return null
    }
}
