import moment from 'moment';
import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { db } from '../firebase/config';

const Vehicle = ({ props, user }) => {
  let history = useHistory();
  const [ rentMe, setRentMe ] = useState(false);
  const [ rentFrom, setRentFrom ] = useState(false);
  const [ rentTo, setRentTo ] = useState(false);
  const [ timeRenting, setTimeRenting ] = useState();
  const [ price, setPrice ] = useState(0);

  const [ amountOfTimeRented, setTimeRented ] = useState(0);
  const [ vip, setVip ] = useState(false);

  // Getting renting info
  const getRentingInfo = (userId) => {
    db.collection('users-renting').doc(userId).get()
    .then(res => {
      setTimeRented(res.data().rentingTime)
    })
  }

  const updateUsersRentingInfo = (userId) => {
    if(rentFrom !== false && rentTo !== false){
      db.collection('users-renting').doc(userId).update({
        brandId: props.id,
        brandRenting: props.brand,
        date: moment().format('YYYY-MM-DD'),
        modelRenting: props.model,
        payment: price,
        rentingFrom: rentFrom,
        rentingTo: rentTo,
        rentingTime: amountOfTimeRented + 1,
        vip: vip
      })
      .then(res => {
        db.collection('vehicles').doc(props.id).update({
          renting: true
        }).then(() => {
          history.push('/profile')
        })
      }).catch(err => {
        console.log(err)
      })

    }else {
      setRentFrom(false);
      setRentTo(false);
    }
  }

  const handleRent = () => {
    updateUsersRentingInfo(user.uid)
  }


  useEffect(() => {
    if(user !== null) {
      getRentingInfo(user.uid);
    }

    if (amountOfTimeRented > 3) {
      setVip(true);
    }

    if (rentMe) {
      let time = moment(rentTo).diff(rentFrom, 'days');
      setTimeRenting(time);

      let pricePerDay = parseInt(props.price);
      let sum = timeRenting * pricePerDay;
      
      // Discount based of number of days rented
      if (timeRenting <= 3){
        setPrice(sum);
      }else if(timeRenting > 3 && timeRenting <= 5) {
        let withDiscount = sum - (sum * 0.05)
        setPrice(withDiscount)
      } else if (timeRenting > 5 && timeRenting <= 10) {
        let withDiscount = sum - (sum * 0.07)
        setPrice(withDiscount)
      } else if (timeRenting > 10) {
        let withDiscount = sum - (sum * 0.1)
        setPrice(withDiscount)
      }
    } else {
      setTimeRenting();
      setPrice();
    }
  })

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
          {
            user !== null && props.renting === false ?
            <div>
              <label>Rent me? </label>
              <input type='checkbox' onChange={() => setRentMe(!rentMe)} />
            </div> : 
            <div>
              Not Available
            </div>
          }
          {
            user !== null && rentMe &&
            <div>
              <label>Rent from:</label>
              <input type="date" onChange={(e) =>setRentFrom(e.target.value)} /> <br/>
              <label>Rent to:</label>
              <input type="date" onChange={(e) =>setRentTo(e.target.value)} />

              <div>
                <label>Total price: (&euro;) </label>
                <input type="text" placeholder={price} disabled/>
              </div>

              <button className="button" onClick={handleRent}>Rent me</button>
            </div>
          }
      </div>
  )
}

export default Vehicle;