import React from 'react';
import Header from "../Header/Header"

const Tracking = () => {
    return (
        <>
            <Header/>
            <div>
                <h1>Order Tracking</h1>
                <form>
                    <label for="tracking">Tracking number</label>
                    <input  type="text" id='tracking' name='tracking' className="outlined_fields" placeholder='Enter your tracking number'required/>                
                </form>
            </div>
        </>
    );
};

export default Tracking;
