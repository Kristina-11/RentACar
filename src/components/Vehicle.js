import React from 'react'

const Vehicle = ({ props }) => {
    return (
        <div className='has-background-light p-7 rounded-corners'>
            <div className="is-size-3">{props.brand}</div>
            <div>
              <img src={props.picture} alt="" width='200px'/>
            </div>
            <div>Model: {props.model}</div>
            <div>Type: {props.type}</div>
            <div>Construction year: {props.constructYear}</div>
            <div>Fuel type: {props.fuel}</div>
            <div>Number of seats: {props.seats}</div>
            <div>Price Per Day: {props.price}</div>
            <div>{ props.renting ? 
              <div>Not available</div> :
              <div>
                <label>Rent me?</label>
                <input type="checkbox" name="rent" id="rent"/>
              </div>
              }
             </div>
        </div>
    )
}

export default Vehicle;