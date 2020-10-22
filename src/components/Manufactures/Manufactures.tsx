import React, { useState } from 'react'
import FilterSearch from './FilterSearch'
import InputSearchManufactures from './InputSearchManufactures'
import ManufacturesList from './ManufacturesList'

export default function Manufactures(props) {
    const manufactures = [
        { name: 'Alamingo' },
        { name: 'Blamingo' },
        { name: 'Clamingo' },
        { name: 'Dlamingo' },
        { name: 'Elamingo' },
        { name: 'Flamingo' },
        { name: 'Glamingo' },
        { name: 'Hlamingo' },
        { name: 'Llamingo' },
        { name: 'Mlamingo' },
        { name: 'Nlamingo' },
        { name: 'Olamingo' },
        { name: 'Plamingo' },
        { name: 'Qlamingo' },
        { name: 'Rlamingo' },
        { name: 'Slamingo' },
        { name: 'Tlamingo' },
        { name: 'Ulamingo' },
        { name: 'Vlamingo' },
        { name: 'Wlamingo' },
        { name: 'Xlamingo' },
        { name: 'Ylamingo' },
        { name: 'Zlamingo' },

    ]
    const [cloneManufactures, setCloneManufactures] = useState(manufactures)

    const characters = [
        { character: 'A', dataValue: 'a' },
        { character: 'B', dataValue: 'b' },
        { character: 'C', dataValue: 'c' },
        { character: 'D', dataValue: 'd' },
        { character: 'E', dataValue: 'e' },
        { character: 'F', dataValue: 'f' },
        { character: 'G', dataValue: 'g' },
        { character: 'H', dataValue: 'h' },
        { character: 'I', dataValue: 'i' },
        { character: 'J', dataValue: 'j' },
        { character: 'K', dataValue: 'k' },
        { character: 'L', dataValue: 'l' },
        { character: 'M', dataValue: 'm' },
        { character: 'N', dataValue: 'n' },
        { character: 'O', dataValue: 'o' },
        { character: 'P', dataValue: 'p' },
        { character: 'R', dataValue: 'r' },
        { character: 'S', dataValue: 's' },
        { character: 'T', dataValue: 't' },
        { character: 'U', dataValue: 'u' },
        { character: 'V', dataValue: 'v' },
        { character: 'W', dataValue: 'w' },
        { character: 'X', dataValue: 'x' },
        { character: 'Y', dataValue: 'y' },
        { character: 'Z', dataValue: 'z' },
        { character: '#', dataValue: '#' },
    ]

    const filterByCharacter = (character) => {
        let newsManufactures = manufactures.filter((item) => item.name.toLocaleLowerCase().substr(0, 1).includes(character.dataValue))
        setCloneManufactures(newsManufactures)
    }
    return (
        <div className="filter-search container mobile-content " data-controller="filter-search">
            {/* <div className="filter-search__search text-right mb-4"> */}
                <InputSearchManufactures />


                {characters.map((item) => {
                    return <FilterSearch {...item} filter={() => filterByCharacter(item)} />
                })}
            {/* </div> */}
            <div className="count_result">
                <em>Hiển thị {cloneManufactures.length} kết quả tìm kiếm cho</em>
                <b>Tất cả</b>
            </div>

            {cloneManufactures.map((item, index) => {
                return <ManufacturesList {...item} />
            })}

        </div>
    )
}
