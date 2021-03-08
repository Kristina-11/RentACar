import React from 'react'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'

function Profile({userObject, visitor}) {
  const [ data, setData ] = useState([]);
  
  const handelCancel = () => {
    db.collection('vehicles').doc(data.brandId).update({
      renting: false
    }).then(res => {
      db.collection('users-renting').doc(userObject.uid).update({
        brandId: '',
        brandRenting: '',
        date: '',
        modelRenting: '',
        payment: 0,
        rentingFrom: '',
        rentingTo: ''
      })
    }).catch(err => {
      console.log(err)
    })
  }

  const getData = () => {
    if (userObject !== null) {
      db.collection('users-renting').doc(userObject.uid).get()
      .then(res => {
        setData(res.data())
      }).catch(err => {
        console.log(err)
      })
    } else {
      console.log('Wait')
    }
  }
  
  useEffect(() => {
    getData();
  },[])

  return (
    userObject !== null && visitor !== 'Admin' ? 
    <main className="container has-text-centered mt-6 p-4">
      <div className='has-background-light p-7 rounded-corners'>
        <div className="is-size-1 has-text-dark">
          {visitor } - 
          { data.vip ? <span>VIP member</span> :
          <span>Regular member</span>}
        </div>
        <div className="">
          <div>Renting: { data.brandRenting }</div>
          <div>Model: {  data.modelRenting } </div>
          <div>Date: { data.rentingFrom } - { data.rentingTo }</div>
          <div>Last renting date: { data.date }</div>
          <div className="">Total times renting: { data.rentingTime }</div>
          <div>Total price: {data.payment} &euro; </div>
          <div>{ data.vip && <span>VIP price: {data.payment - (data.payment * 0.15)}</span>}</div>
          <button className="button" onClick={handelCancel}>Cancel?</button>
        </div>
      </div>
    </main> : 
    <main className="container has-text-centered mt-6 p-4">
      <div className="is-size-1 has-text-dark">Loading...</div>
    </main>
  )
}

export default Profile
