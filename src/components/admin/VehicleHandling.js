import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../firebase/config';
import AddVehicle from './AddVehicle';
import ListVehicles from './ListVehicles';

function VehicleHandling() {
  const [ vehicles, setVehicles ] = useState([]);
  const [ vehicleAdded, setVehicleAdd ] = useState(false);

  // Show data from db
  const fetchVehicles = async () => {
    const vehiclesCollection = await db.collection('vehicles').get();
    setVehicles(vehiclesCollection.docs.map(doc => {
      return doc.data();
    }))
  }

  useEffect(() => {
    fetchVehicles();
  }, [vehicleAdded]);

  return (
    <section className='container'>
      <AddVehicle setVehicleAdd={setVehicleAdd} vehicle={vehicleAdded} />
      <ListVehicles setVehicleAdd={setVehicleAdd} vehicle={vehicleAdded} vehicles={vehicles} />
    </section>
  )
}

export default VehicleHandling
