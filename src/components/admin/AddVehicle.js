import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import { db, storage } from '../../firebase/config';

function AddVehicle({ setVehicleAdd, vehicle }) {
  let history = useHistory();

  const [ fileName, setFileName ] = useState('');
  const [ fileUrl, setFileUrl ] = useState();

  // form data
  const [ brand, setBrand ] = useState('');
  const [ model, setModel ] = useState('');
  const [ constructYear, setConstructYear ] = useState('');
  const [ fuel, setFuel ] = useState('');
  const [ seats, setSeats ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ type, setType] = useState('');

  // modal
  useEffect(() => {
    const addVehicle = document.querySelector('#addVehicle');
    const modal = document.querySelector('.modal');
    const modalBg = document.querySelector('.modal-background');

    addVehicle.addEventListener('click', () => {
        modal.classList.add('is-active');
    });

    modalBg.addEventListener('click', () => {
        modal.classList.remove('is-active');
    });
  })

  const handleFileUploud = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);

    await fileRef.put(file);
    setFileName(file.name);
    setFileUrl(await fileRef.getDownloadURL());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const Id = Math.round(Math.random() * 10000);
    const docId = Id.toLocaleString();
    
    try {
      // Adding vehicle to a db
      if (fileName !== '') {
        db.collection('vehicles').doc(docId).set({
          id: docId,
          picture: fileUrl,
          brand,
          model,
          constructYear,
          fuel,
          seats,
          price,
          type,
          renting: false
        }).then(ref => {
          
        }).catch(err => {
          console.log(err);
        });
      }
    } catch (error) {
      console.log(error)
    }

    // Removing modal after submit
    const modal = document.querySelector('.modal');
    modal.classList.remove('is-active');

    setVehicleAdd(!vehicle);
    history.push('/');
  }

  return (
    <div>
      <button className="button is-light add" id="addVehicle">Add Vehicle</button>

      <div className="modal">
        <div className="modal-background"></div>
        
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add Vehicle</p>
          </header>
          <div className="modal-card-body has-background-grey p-5">
            <form onSubmit={handleSubmit}>
            <label className="label">Choose a picture:</label>
            <div className="field file">
              <div className="file is-boxed">
                <label className="file-label">
                  <input className="file-input" onChange={handleFileUploud} type="file" name="picture" accept=".jpg, .jpeg, .png" required />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload">
                          <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.freeiconspng.com%2Fuploads%2Fupload-icon-6.png&f=1&nofb=1" alt=""/>
                      </i>
                    </span>
                    <span className="file-label">
                      Choose a file…
                    </span>
                  </span>
                  <span className="file-name">
                    { fileName }
                  </span>
                </label>
              </div>
            </div>
              <div className="field">
                <label htmlFor="brand" className="label">Brand</label>
                <div className="control">
                    <input onChange={(e) => setBrand(e.target.value)} className="input" name="brand" id="brand" type="text" placeholder="e.g Toyota" required />
                </div>
              </div>

              <div className="field">
                <label htmlFor="model" className="label">Model</label>
                <div className="control">
                  <input onChange={(e) => setModel(e.target.value)} className="input" name="model" id="model" type="text" placeholder="e.g Toyota Prius" required />
                </div>
              </div>

                <div className="field">
                  <label htmlFor="year" className="label">Construction year</label>
                  <div className="control">
                    <input onChange={(e) => setConstructYear(e.target.value)} className="input" name="year" id="year" type="text" placeholder="e.g 2020" required />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Fuel type</label>
                  <div className="control">
                    <div className="select">
                    <select onChange={(e) => setFuel(e.target.value)} required>
                      <option value="">Select</option>
                      <option value="Ethanol">Ethanol</option>
                      <option value="Methanol">Methanol</option>
                      <option value="Gasoline">Gasoline</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Natural gas">Natural gas</option>
                      <option value="Hydrogen">Hydrogen</option>
                      <option value="Biodiesel">Biodiesel</option>
                    </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Vehicle type</label>
                  <div className="control">
                    <div className="select">
                    <select onChange={(e) => setType(e.target.value)} required>
                      <option value="">Select</option>
                      <option value="Economy">Economy</option>
                      <option value="Estate">Estate</option>
                      <option value="Luxury">Luxury</option>
                      <option value="SUV">SUV</option>
                      <option value="Cargo">Cargo</option>
                    </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Number of seats</label>
                  <div className="control">
                    <div className="select">
                    <select onChange={(e) => setSeats(e.target.value)} required>
                      <option value="">Select</option>
                      <option value="2">2</option>
                      <option value="4">4</option>
                      <option value="6">6</option>
                    </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="price" className="label">Price per Day in &euro;(EUR)</label>
                  <div className="control">
                    <input onChange={(e) => setPrice(e.target.value)} className="input" name="price" id="price" type="number" placeholder="e.g 50" required />
                  </div>
                </div>
                <button className="button is-link">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddVehicle
