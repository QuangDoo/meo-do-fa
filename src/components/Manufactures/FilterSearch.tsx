import React from 'react'

type PropsType = {
    dataValue: string,
    character: string
    filter: () => void
}

function FilterSearch(props: PropsType) {
    const filter1 = () => {
        return props.filter()
    }
    return (
        <div className="filter my-4">
            <span
                className="alphabet mix"
                data-value={props.dataValue}
                onClick={filter1}
            >
                {props.character}
            </span>

        </div>
    )
}
export default FilterSearch