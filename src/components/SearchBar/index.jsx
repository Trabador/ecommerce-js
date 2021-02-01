import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchProductsAction } from '../../redux'
import { withRouter } from 'react-router-dom'
import FormInput from '../../components/forms/FormInput'
import Buttons from '../forms/Buttons'
import './styles.scss'

function SearchBar({ productCategory }) {
    const [criteria, setCriteria] = useState('')
    const dispatch = useDispatch()

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if(criteria !== ''){
            dispatch(searchProductsAction({ criteria, productCategory }))
        } 
    }

    return (
        <div className='search-bar'>
            <form onSubmit={handleOnSubmit}>
                <div className='search-input'>
                    <FormInput 
                        type='text'
                        name='search'
                        value={criteria}
                        placeholder='Search...'
                        handleOnChange={(e) => setCriteria(e.target.value)}
                    />
                </div>
                <div className='search-btn'>
                    <Buttons type='submit'>
                        Search
                    </Buttons>
                </div>
            </form>
        </div>
    )
}

export default withRouter(SearchBar)
