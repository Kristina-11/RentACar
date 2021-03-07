import React, { useState } from 'react'
import { useEffect } from 'react';
import { db } from '../firebase/config';
import Vehicle from './Vehicle';

export default function Home() {
    const [ vehicles, setVehicles ] = useState([]);

    const fetchVehicles = async () => {
      const vehiclesCollection = await db.collection('vehicles').get();
      setVehicles(vehiclesCollection.docs.map(doc => {
        return doc.data();
      }))
    }

    useEffect(() => {
      fetchVehicles();
    },[]);

    return (
        <main className="container has-text-centered mt-6 p-4">
            <section className="container">
                <h1 className="is-size-1 has-text-dark">WELCOME</h1>
                <p className="is-size-3">
                    Comfort. Stability. Security.
                </p>

                <div className="">
                    Search for a car by brand name
                </div>
                <div className="">
                    <input type="search" name="search" id="search" />
                </div>
            </section>
            <section className="main-content container">
                {
                    vehicles.length ? vehicles.map((vehicle) => {
                        return <Vehicle props={vehicle} key={vehicle.id} />
                    }) : 
                    <div className="button is-loading"></div>
                }
            </section>
        </main>
    )
}
