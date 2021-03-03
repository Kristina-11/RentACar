import React from 'react'

function Profile() {
    return (
        <main className="container has-text-centered mt-6 p-4">
            <h1 className="is-size-1 has-text-dark">Hello, user</h1>
            {/* VIP user or not */}
            <div className="">
                <ul>
                    <li>Renting info</li>
                    <li>Active renting</li>
                    <li>Price</li>
                </ul>
            </div>
        </main>
    )
}

export default Profile
