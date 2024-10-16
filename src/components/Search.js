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
        <div className='search flex flex-col gap-2'>
            <input
                className='border border-red-800'
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
        <div
            className='search-select'
            style={{ maxHeight: 200, overflowY: 'scroll' }}
        >
            {items.map((item, index) => (
                <button
                    key={index}
                    className='search-item'
                    style={{ display: 'block' }}
                    onClick={() => selectRoute(item)}
                >
                    <div className='gap'>
                        <span>{item.route}</span>
                        <span>{item.orig_tc}</span>➤<span>{item.dest_tc}</span>
                    </div>
                </button>
            ))}
        </div>
    )
}

export default Search
