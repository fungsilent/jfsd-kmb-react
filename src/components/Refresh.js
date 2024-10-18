import refreshIcon from '../refresh.svg'

const Refresh = ({ isSpin, onClick }) => {
    let _className = []
    if (isSpin) _className.push('spin')

    return (
        <i
            className={[
                'reload block aspect-square w-[24px] p-1 text-orange-300 cursor-pointer',
                ..._className,
            ].join(' ')}
            onClick={onClick}
        >
            <img src={refreshIcon} />
        </i>
    )
}

export default Refresh
