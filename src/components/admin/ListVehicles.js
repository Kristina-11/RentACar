import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { db, storage } from '../../firebase/config';
import editIcon from '../../img/edit.png';

function ListVehicles({ vehicles, vehicle, setVehicleAdd }) {
  const [ update, setUpdate ] = useState(false);

  // form data for update
  const [ price, setPrice ] = useState('');

  const deleteVehicle = (id, fileUrl) => {
    // Delete document from collection
    db.collection('vehicles').doc(id).delete()
    .then(res => {
      
    }).catch(err => {
      console.log(err);
    })

    // Delete image from storage
    let imgRef = storage.refFromURL(fileUrl);
    imgRef.delete().then(() => {
      console.log('deleted pic')
      
    }).catch(err => {
      console.log(err)
    })

    setVehicleAdd(!vehicle);
  }

  // Update document
  const updateField = (price, id) => {
    db.collection('vehicles').doc(id).update({
      price
    }).then(() => setUpdate(false))
    .catch(err => {
      console.log(err);
    });

    setVehicleAdd(!vehicle);
  }
  
  useEffect(() => {
    const deleteButton = document.querySelectorAll('.delete');

    deleteButton.forEach(button => {
      button.addEventListener('click', (e) => {
        const carId = e.target.dataset.target;
        const picUrl = e.target.dataset.url;
        deleteVehicle(carId, picUrl);
      })
    });
  });
  
  const handleEdit = () => {
    setUpdate(true);
  }

return (
  <div className="table-vehicles m-6">
      <table className="table is-hoverable">
        <thead className="has-background-grey-dark">
          <tr className="">
            <th className="has-text-white-ter">Brand</th>
            <th className="has-text-white-ter">Model</th>
            <th className="has-text-white-ter">Year of construction</th>
            <th className="has-text-white-ter">Fuel type</th>
            <th className="has-text-white-ter">Number of seats</th>
            <th className="has-text-white-ter">Price Per Day (&euro;)</th>
            <th className="has-text-white-ter">Edit</th>
            <th className="has-text-white-ter">Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            vehicles.length > 0 ?
            vehicles.map(obj => {
              return <tr key={obj.id}>
                <td>{ obj.brand }
                </td>
                <td>{ obj.model }</td>
                <td>{ obj.constructYear }</td>
                <td>{ obj.fuel }</td>
                <td>{ obj.seats }</td>
                <td>{ update ? 
                  <input type="text" placeholder={obj.price} data-id={obj.id} onChange={(e) => setPrice(e.target.value)} onBlur={() => updateField(price, obj.id)} /> : 
                  obj.price }</td>
                <td>
                  <span className="icon">
                    <i className="fas fa-edit" onClick={(e) => handleEdit(e)} >
                      <img src={editIcon} className='edit' data-id={obj.id}/>
                    </i>
                  </span>
                </td>
                <td>
                <span className="icon delete" data-target={obj.id} data-url={obj.picture}>
                    <i className="fas">

                    </i>
                  </span>
                </td>
              </tr>
            }) : 
            <tr>
              <td colSpan='8'>No vehicles</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default ListVehicles
