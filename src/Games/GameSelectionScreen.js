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
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: checkDate([new Date('August 26 2024'), new Date('August 27 2024')]) ? 'pointer' : 'not-allowed' }}
                    onClick={checkDate([new Date('August 26 2024'), new Date('August 27 2024')]) ? () => handleGameSelection('Wheres Thunder') : null}
                >
                    <GameCard
                        Title='Wheres Thunder'
                        availableDates={[new Date('August 26 2024'), new Date('August 27 2024')]}
                    />
                </Col>
                <Col
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: checkDate([new Date('August 27 2024'), new Date('August 28 2024')]) ? 'pointer' : 'not-allowed' }}
                    onClick={checkDate([new Date('August 27 2024'), new Date('August 28 2024')]) ? () => handleGameSelection('Coming Soon') : null}
                >
                    <GameCard
                        Title='Footbordle24'
                        availableDates={[new Date('August 27 2024'), new Date('August 28 2024')]}
                    />
                </Col>
                <Col
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: checkDate([new Date('August 28 2024'), new Date('August 29 2024')]) ? 'pointer' : 'not-allowed' }}
                    onClick={checkDate([new Date('August 28 2024'), new Date('August 29 2024')]) ? () => handleGameSelection('Coming Soon') : null}
                >
                    <GameCard
                        Title='Coming Soon'
                        availableDates={[new Date('August 28 2024'), new Date('August 29 2024')]}
                    />
                </Col>
                <Col
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: checkDate([new Date('August 29 2024'), new Date('August 30 2024')]) ? 'pointer' : 'not-allowed' }}
                    onClick={checkDate([new Date('August 29 2024'), new Date('August 30 2024')]) ? () => handleGameSelection('Coming Soon') : null}
                >
                    <GameCard
                        Title='NFLMatch24'
                        availableDates={[new Date('August 29 2024'), new Date('August 30 2024')]}
                    />
                </Col>
                <Col
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: checkDate([new Date('August 30 2024'), new Date('August 31 2024')]) ? 'pointer' : 'not-allowed' }}
                    onClick={checkDate([new Date('August 30 2024'), new Date('August 31 2024')]) ? () => handleGameSelection('Coming Soon') : null}
                >
                    <GameCard
                        Title='Coming Soon'
                        availableDates={[new Date('August 30 2024'), new Date('August 31 2024')]}

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
                    onClick={() => handleGameSelection('Footbordle23')}
                >
                    <GameCard
                        Title='Footbordle23'
                    />
                </Col>
                <Col
                    style={{ width: '20%', marginLeft: '5px', marginRight: '5px', cursor: 'pointer' }}
                    onClick={() => handleGameSelection('NFLMatch23')}
                >
                    <GameCard
                        Title='NFLMatch23'
                    />
                </Col>
            </Row>

        </Grid >
    )
};

export default GameSelectionScreen;