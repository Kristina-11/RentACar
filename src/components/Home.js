import React, { useState } from 'react'
import Vehicle from './Vehicle';

export default function Home() {
    const [ vehicles, setVehicles ] = useState([
        { brand: 'Mercedes', model: 'A8', constructionYear: '2002', fuelType: 'dizel', seats: '5', pricePerDay: '50$' },
        { brand: 'Mercedes', model: 'A8', constructionYear: '2002', fuelType: 'dizel', seats: '5', pricePerDay: '50$' },
        { brand: 'Mercedes', model: 'A8', constructionYear: '2002', fuelType: 'dizel', seats: '5', pricePerDay: '50$' },
        { brand: 'Mercedes', model: 'A8', constructionYear: '2002', fuelType: 'dizel', seats: '5', pricePerDay: '50$' },
        { brand: 'Mercedes', model: 'A8', constructionYear: '2002', fuelType: 'dizel', seats: '5', pricePerDay: '50$' }
    ]);
    
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
                    vehicles && vehicles.map((vehicle) => {
                        return <Vehicle props={vehicle} key={Math.random() * 10} />
                    })
                }
            </section>
        </main>
    )
}
