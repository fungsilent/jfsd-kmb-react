import { useState } from 'react'

const Search = ({ routeList, selectRoute }) => {
    const [text, setText] = useState('')

    const onText = event => {
        let text = event.target.value
        text = text.toUpperCase().replace(/[^A-Z0-9]/g)
        setText(text)
    }

    return (
        <div className='search flex flex-col gap-3'>
            <input
                className='bg-white border-2 border-l-4 outline-none rounded border-zinc-300 focus-visible:border-red-800 py-1 px-2'
                type='text'
                max={4}
                value={text}
                placeholder='輸入路線'
                onChange={onText}
            />
            {text && (
                <SearchSelect
                    routeList={routeList}
                    text={text}
                    selectRoute={selectRoute}
                />
            )}
        </div>
    )
}

const SearchSelect = ({ routeList, text, selectRoute }) => {
    const items = routeList.filter(item => item.route.startsWith(text))

    return (
        <div className='flex flex-col gap-1 rounded shadow-sm max-h-[200px] overflow-y-scroll'>
            {items.map((item, index) => (
                <button
                    key={index}
                    className='w-full grid grid-cols-[40px_1fr_auto_1fr] gap-4 rounded border border-rose-100 bg-rose-50 px-2 py-1 drop-shadow-sm hover:bg-rose-100'
                    onClick={() => selectRoute(item)}
                >
                    <span className='text-left font-bold text-red-800'>
                        {item.route}
                    </span>
                    <span className='text-left text-gray-500'>
                        <span className='text-xs mr-1'>由</span>
                        {item.orig_tc}
                    </span>
                    <span className='text-rose-500'>▶</span>
                    <span className='text-right text-gray-500'>
                        <span className='text-xs mr-1'>往</span>
                        {item.dest_tc}
                    </span>
                </button>
            ))}
        </div>
    )
}

export default Search
