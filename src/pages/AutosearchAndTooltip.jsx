//  react auto search with tooltip 

// stap -1 install two pakage

// 1.    npm install react-search-autocomplete


// 2.    npm install react-tooltip


// Note tooltip edit webside

// 1.    (   https://reacttooltip.github.io/react-tooltip/   )
// 2.     (  https://react-tooltip.com/docs/examples/place    )



import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Tooltip } from 'react-tooltip'

function TooltipComponents() {
    const [items, setItems] = useState([])
    useEffect(() => {
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(res => {
                setItems(res.data.categories)
            })

    }, [])


    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        alert(item)

        // all secelct data here


        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item) => {
        return (
            <div className='cursor-pointer'>


                <div >
                    <a data-tooltip-id={item?.idCategory}><img src={item?.strCategoryThumb} alt="" /></a>
                    <Tooltip id={item?.idCategory}>
                        <div>
                            <img src={item?.strCategoryThumb} alt="" />
                            <span className='' style={{ display: 'block', textAlign: 'left' }}>id: {item?.idCategory}</span>
                            <span className='' style={{ display: 'block', textAlign: 'left' }}>name: {item?.strCategoryDescription}</span>
                        </div>
                    </Tooltip>
                </div>

            </div>
        )
    }

    console.log(items)
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        fuseOptions={{ keys: ["strCategory", "idCategory"] }}
                        resultStringKeyName="strCategory"
                    />
                </div>
            </header>
        </div>
    )
}

export default TooltipComponents