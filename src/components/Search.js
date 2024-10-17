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
                className='border-2 border-red-400 rounded focus:border-red-800 py-1 px-2'
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
        <div className='search-select flex flex-col gap-1 border border-stone-200 rounded shadow-sm max-h-[200px] overflow-y-scroll'>
            {items.map((item, index) => (
                <button
                    key={index}
                    className='search-item w-full flex flex-row gap-4 bg-rose-100 px-2 py-1'
                    onClick={() => selectRoute(item)}
                >
                    <span className='w-[30px] text-left'>{item.route}</span>
                    <span className='w-[160px] text-left'>{item.orig_tc}</span>
                    <span className='text-red-600'>➤</span>
                    <span>{item.dest_tc}</span>
                </button>
            ))}
        </div>
    )
}

export default Search
