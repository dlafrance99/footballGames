import { useEffect, useState, useRef } from 'react';
import { Grid, Row, Col, Button, ButtonToolbar } from 'rsuite';
import '../../App.css'


const GameCard = ({ Title, availableDates }) => {
    //State------------------------------------------------------
    let now = new Date()

    //Context----------------------------------------------------


    //Functions--------------------------------------------------
    const convertTitle = (value) => {
        return value.replaceAll(' ', '_')
    }

    const convertDates = (value) => {
        let dateValue = new Date(value)
        let dateYear = dateValue.getFullYear()
        let dateMonth = dateValue.getMonth()
        let dateDay = dateValue.getDate()
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        return `${months[dateMonth]} ${dateDay}`
    }

    //Show-------------------------------------------------------


    //Main-------------------------------------------------------


    return (
        <>
            {
                availableDates
                    ?
                    <h4 style={{ color: (now > new Date(availableDates[0]) && now < new Date(availableDates[1])) ? 'green' : 'red', textAlign: 'center', marginTop: 0, marginBottom: '5px' }}>
            {(now > new Date(availableDates[0]) && now < new Date(availableDates[1])) ? 'available' : `Available ${convertDates(availableDates[0])} - ${convertDates(availableDates[1])}`}
        </h4 >
                    :
<div style={{ height: '19px', marginBottom: '5px' }} />
            }
<img
    src={require(`../../Assets/GameCardImages/${convertTitle(Title)}.png`)}
    alt='team logo'
    style={{
        width: '100%',
        objectFit: 'contain',
        borderRadius: '10px',
    }}
/>
        </>
    )
}

export default GameCard;