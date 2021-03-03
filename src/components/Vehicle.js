import React from 'react'

const Vehicle = ({ props }) => {
    return (
        <div>
            <div>{props.brand}</div>
            <div>{props.model}</div>
            <div>{props.constructionYear}</div>
            <div>{props.fuelType}</div>
            <div>{props.seats}</div>
            <div>{props.pricePerDay}</div>
        </div>
    )
}

export default Vehicle;