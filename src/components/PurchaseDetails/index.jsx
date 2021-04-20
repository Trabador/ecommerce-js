import React from 'react'
import Buttons from '../forms/Buttons'
import FormCustom from '../forms/FormCustom'
import FormInput from '../forms/FormInput'
import Errors from '../forms/Errors'
import useData, { TYPES } from './useData'
import './styles.scss'

function PurchaseDetails() {
    const [state, dispatchData, handleOnPaymentSubmit, errors] = useData()
    const { name , address, city, zipcode, phone} = state

    return (
        <FormCustom headline='Shipment Data'>
            <Errors errors={errors} />
            <form onSubmit={handleOnPaymentSubmit}>
                <FormInput type='text'
                            label='Name'
                            name='name'
                            value={name}
                            placeholder='Name'
                            handleOnChange={(e) => dispatchData({action: TYPES.NAME, payload: e.target.value})}/>
                <FormInput type='text'
                            label='Address'
                            name='address'
                            value={address}
                            placeholder='Address'
                            handleOnChange={(e) => dispatchData({action: TYPES.ADDRESS, payload: e.target.value})}/>
                <FormInput type='text'
                            label='City'
                            name='city'
                            value={city}
                            placeholder='City'
                            handleOnChange={(e) => dispatchData({action: TYPES.CITY, payload: e.target.value})}/>
                <FormInput type='text'
                            label='Zip Code'
                            name='zipcode'
                            value={zipcode}
                            placeholder='Zip code'
                            handleOnChange={(e) => dispatchData({action: TYPES.ZIPCODE, payload: e.target.value})}/>
                <FormInput type='text'
                            label='Phone Number'
                            name='phone'
                            value={phone}
                            placeholder='Phone number'
                            handleOnChange={(e) => dispatchData({action: TYPES.PHONE, payload: e.target.value})}/>
                <Buttons type='submit'>Finish Payment</Buttons>
            </form>
        </FormCustom>
        
    )
}

export default PurchaseDetails
