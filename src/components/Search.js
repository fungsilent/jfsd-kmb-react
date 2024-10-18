import { useState } from 'react'

const Search = ({ routeList, selectRoute }) => {
    const [text, setText] = useState('')

    const onText = event => {
        let text = event.target.value
        text = text
            .toUpperCase()
            .match(/[A-Z0-9]+/g)
            ?.join('')
        setText(text ?? '')
    }

    return (
        <div className='search flex flex-col gap-3'>
            <input
                className='bg-white border-2 border-l-4 rounded border-zinc-300 focus-visible:border-red-800 py-1 px-2'
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
                    className='w-full flex flex-row gap-4 rounded border border-rose-100 bg-rose-50 px-2 py-1 drop-shadow-sm'
                    onClick={() => selectRoute(item)}
                >
                    <span className='w-[30px] text-left font-bold text-red-800'>
                        {item.route}
                    </span>
                    <span className='w-[160px] text-left text-gray-500'>
                        {item.orig_tc}
                    </span>
                    <span className='grow text-rose-500'>▶</span>
                    <span className='w-[160px] text-right text-gray-500'>
                        {item.dest_tc}
                    </span>
                </button>
            ))}
        </div>
    )
}

export default Search
