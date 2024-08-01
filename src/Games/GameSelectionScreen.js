import '../App.css';
import { useEffect, useState, useRef } from 'react';
import { Grid, Row, Col, Button, ButtonToolbar } from 'rsuite';

import GameCard from './Components/GameCard';

const GameSelectionScreen = ({ handleGameSelection }) => {

    const checkDate = (Dates) => {
        if (!Dates) {
            return false
        }
        let now = new Date()
        let startDate = new Date(Dates[0])
        let endDate = new Date(Dates[1])
        if (now > startDate && endDate > now) {
            return true
        } else {
            return false
        }
    }

    return (
        <Grid>
            <Row className='GameTitle'>
                <Col sm={24}>
                    <h1>
                        Game Selection
                    </h1>
                </Col>
            </Row>

            <Row style={{ marginTop: '10px' }}>
                <h2>
                    Upcoming Games
                </h2>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Col
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: checkDate([new Date('August 10 2024'), new Date('August 11 2024')]) ? 'pointer' : 'not-allowed' }}
                    onClick={checkDate([new Date('August 10 2024'), new Date('August 11 2024')]) ? () => handleGameSelection('Wheres Thunder') : null}
                >
                    <GameCard
                        Title='Wheres Thunder'
                        availableDates={[new Date('August 10 2024'), new Date('August 11 2024')]}
                    />
                </Col>
                <Col
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: checkDate() ? 'pointer' : 'not-allowed' }}
                    onClick={checkDate() ? () => handleGameSelection('Coming Soon') : null}
                >
                    <GameCard
                        Title='Coming Soon'
                    />
                </Col>
                <Col
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: checkDate() ? 'pointer' : 'not-allowed' }}
                    onClick={checkDate() ? () => handleGameSelection('Coming Soon') : null}
                >
                    <GameCard
                        Title='Coming Soon'
                    />
                </Col>
                <Col
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: checkDate() ? 'pointer' : 'not-allowed' }}
                    onClick={checkDate() ? () => handleGameSelection('Coming Soon') : null}
                >
                    <GameCard
                        Title='Coming Soon'
                    />
                </Col>
                <Col
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: checkDate() ? 'pointer' : 'not-allowed' }}
                    onClick={checkDate() ? () => handleGameSelection('Coming Soon') : null}
                >
                    <GameCard
                        Title='Coming Soon'
                    />
                </Col>
            </Row>

            <Row style={{ marginTop: '10px' }}>
                <h2>
                    Archived Games
                </h2>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Col
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: 'pointer' }}
                    onClick={() => handleGameSelection('Footbordle')}
                >
                    <GameCard
                        Title='Footbordle'
                    />
                </Col>
                <Col
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: 'pointer' }}
                    onClick={() => handleGameSelection('NFL Match')}
                >
                    <GameCard
                        Title='NFL Match'
                    />
                </Col>
            </Row>

        </Grid >
    )
};

export default GameSelectionScreen;