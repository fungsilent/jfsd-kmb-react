import { useRef, useEffect, useState } from 'react'
import { delay } from '../data'

const waitingTime = 200

const Process = ({ process, setProcess }) => {
    const dom = useRef(null)

    useEffect(() => {
        let nextProcess = Math.min(process, 100)
        setProcess(nextProcess)

        if (nextProcess === 100) {
            clearOnComplete()
        }
    }, [process])

    const clearOnComplete = async () => {
        // fade out
        if (!dom.current) return
        dom.current.style.opacity = 0

        // reset to 0
        await delay(waitingTime)
        if (!dom.current) return
        setProcess(0)
        dom.current.style.opacity = 1
    }

    return (
        <div
            ref={dom}
            className={'h-[2px] absolute left-0 top-0 bg-red-500'}
            style={{
                width: `${process}%`,
                transition: `opacity ${waitingTime}ms`,
            }}
        ></div>
    )
}

export const useProcess = () => {
    const [process, setProcess] = useState(0)

    const WrapProcess = (...props) => (
        <Process
            {...props}
            process={process}
            setProcess={setProcess}
        />
    )

    return [process, setProcess, WrapProcess]
}

export default Process
