import React from 'react';
import Header from "../Header/Header"
import './create_a_reservation&payment.css'
import { useNavigate} from 'react-router-dom'

const ProductPurchase = () => {

    const history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        history('/payment')
      }
    
    return (
        <>
            <div className='background_purchase'>
                <Header/>
                <h1>Product Purchase</h1>
                <p>Welcome to the Product Purchase page.</p>
                <form onSubmit={handleSubmit}>
                <div>
              <input
                type='submit'
                value='Submit Reservation'
                className='submit'
              />
              <input
                type='reset'
                value='Reset'
                className='reset'
              />
            </div>
                </form>
            </div>
        </>
    );
};

export default ProductPurchase;
