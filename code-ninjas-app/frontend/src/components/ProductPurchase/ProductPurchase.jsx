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
            <Header/>
            <div className='background_purchase'>
                <h1>Product Purchase</h1>
                <div className='QuoteBody'>
                  <form onSubmit={handleSubmit}>
                  <table className='reservationTable'>
                  <tbody>
                    <tr>
                      <th>Pickup location:</th>
                        <td>
                         <input type='text' name='pickupLocation' className='outlined_fields' required/>
                        </td>
                    </tr>
                    <tr>
                      <th>Dropof location:</th>
                        <td>
                          <input type='text' name='pickupLocation' className='outlined_fields' required/>
                        </td>
                    </tr>
                    <tr>
                      <th>Order Weight (in KG):</th>
                      <td>
                        <input type='number' name='weight' className='outlined_fields' min={0} step="0.01" required/>
                      </td>
                    </tr>
                  </tbody>
                  </table>
                  <br />
                  <div className='button-container'>
                    <input
                    type='submit'
                    value='Submit Quote'
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
            </div>
        </>
    );
};

export default ProductPurchase;
