import React from 'react'

type ListManufacturesType = {
    name: string
}

function ManufacturesList(props: ListManufacturesType) {
    return (
        <div
            className="filter-search__list py-3"
            data-target="filter-search.results"
            id="MixItUpC3DA20"
        >

            <a
                className="filter-search__list-item mix all filter-z"
                data-filter="filter-z"
                href="/manufacturers/zydus-pharmaceuticals-usa-inc"
            >
                {props.name}
            </a>
        </div>
    )
}
export default ManufacturesList