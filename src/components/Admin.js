import React from 'react'
import { useEffect } from "react";
import VehicleHandling from './admin/VehicleHandling';
import UsersHandling from './admin/UsersHandling';

function Admin() {

    // Tabs
    useEffect(() => {
        const tabs = document.querySelectorAll('.tabs li');
        const tabContent = document.querySelectorAll('#tab-content > div');

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                tabs.forEach((t) => t.classList.remove('is-active'));
                tab.classList.add('is-active');

                const target = tab.dataset.tab;
                tabContent.forEach(box => {
                    box.getAttribute('id') === target ?
                    box.classList.remove('is-hidden') :
                    box.classList.add('is-hidden');
                })
            })
        })

    }, [])

    return (
        <main className="container has-text-centered mt-6 p-4">
            <h1 className="is-size-1 has-text-dark">Admin panel</h1>
            <div className="tabs is-boxed is-large">
                <ul>
                    <li className='is-active' data-tab='vehicles'><a className='has-text-dark'>Vehicles</a></li>
                    <li data-tab='users'><a className='has-text-dark'>Users</a></li>
                </ul>
            </div>
            <div className="px-2" id='tab-content'>
                <div id="vehicles">
                    <VehicleHandling />
                </div>
                <div id="users" className='is-hidden'>
                    <h2 className="is-size-2">Users</h2>
                    <UsersHandling />
                </div>
            </div>
        </main>
    )
}

export default Admin;