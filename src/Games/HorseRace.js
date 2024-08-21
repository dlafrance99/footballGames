import '../App.css';
import { useEffect, useState, useRef } from 'react';
import { Grid, Row, Col, Button, ButtonToolbar } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import NFLTeamList from '../NFLTeamList';

import ManagerScore from '../ManagerScores';

const HorseRace = () => {
    const [GameStarted, setGameStarted] = useState(false)
    const [GameOver, setGameOver] = useState(false)
    const [GameStartTime, setGameStartTime] = useState(null)
    const [GameOverTime, setGameOverTime] = useState(null)

    const Managers = ManagerScore.sort((a, b) => {
        if (a.Score === b.Score) {
            return a.Name.localeCompare(b.Name);
        }
        return b.Score - a.Score;
    })

    return (
        <Grid>
            <Row className='GameTitle'>
                <Col sm={24}>
                    <h1>
                        Horse Race
                    </h1>
                </Col>
            </Row>

            {
                GameOver
                    ?
                    <>
                        {/* <Row className='GameTitle'>
                            <Col sm={24}>
                                <h1>
                                    Game Over
                                </h1>
                            </Col>
                        </Row>

                        <Row className='GameTitle'>
                            <Col sm={24}>
                                <h2>
                                    {(GameOverTime - GameStartTime) / 1000} seconds
                                </h2>

                                <ButtonToolbar style={{ width: '50%', margin: 'auto', marginTop: '15px', height: '100%', alignContent: 'center', textAlign: 'center' }}>
                                    <Button
                                        style={{ fontSize: '25px', padding: '10px 15px 10px 15px', backgroundColor: 'transparent', border: '2px solid green', color: 'green', borderRadius: '5px', cursor: 'pointer' }}
                                        onClick={() => handleRestart()}
                                    >
                                        Restart
                                    </Button>
                                </ButtonToolbar>
                            </Col>
                        </Row>

                        <Row>

                        </Row> */}
                    </>
                    :
                    <>
                        <Row className='GameRules'>
                            <Col sm={24}>
                                <div className='GameRulesFont'>
                                    Off to the races! Players will select a horse (NFL team) to bet on. You can bet as many points as you've earned so far, but beware, you could lose them all.
                                </div>
                                <div className='GameRulesFont'>
                                    The horse race is random. whichever horse crosses the finish line first, doubles their bet. If your horse loses, you lose all your points.
                                </div>
                            </Col>
                        </Row>

                        {
                            GameStarted
                                ?

                                <Row>
                                    <Col sm={24} className='FootballField' style={{ display: 'flex' }}>
                                        <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                            <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                6
                                            </div>
                                            <div style={{ marginTop: '75px', marginRight: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                0
                                            </div>
                                        </div>

                                        <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                            <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                5
                                            </div>
                                            <div style={{ marginTop: '75px', marginRight: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                0
                                            </div>
                                        </div>

                                        <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                            <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                4
                                            </div>
                                            <div style={{ marginTop: '75px', marginRight: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                0
                                            </div>
                                        </div>

                                        <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                            <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                3
                                            </div>
                                            <div style={{ marginTop: '75px', marginRight: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                0
                                            </div>
                                        </div>

                                        <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                            <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                2
                                            </div>
                                            <div style={{ marginTop: '75px', marginRight: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                0
                                            </div>
                                        </div>

                                        <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                            <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                1
                                            </div>
                                            <div style={{ marginTop: '75px', marginRight: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>

                                            </div>
                                        </div>

                                        <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '50px', fontWeight: 'bolder', backgroundColor: '#002244' }}>
                                            <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(90deg)', paddingTop: '100%', color: '#FB4F14' }}>
                                                Broncos
                                            </div>

                                        </div>
                                    </Col>
                                </Row>
                                :
                                <Row>
                                    <Col sm={24} style={{ display: 'flex', marginRight: '30px', marginLeft: '30px' }}>
                                        <div style={{ flex: 1, display: 'flex', color: 'white', fontSize: '30px', fontWeight: 'bolder', paddingTop: '140px' }}>
                                            <div style={{ margin: 'auto' }}>
                                                {Managers[7].Name.split(' ')[0]}
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', color: 'white', fontSize: '30px', fontWeight: 'bolder', paddingTop: '100px' }}>
                                            <div style={{ margin: 'auto' }}>
                                                {Managers[5].Name.split(' ')[0]}
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', color: 'white', fontSize: '30px', fontWeight: 'bolder', paddingTop: '60px' }}>
                                            <div style={{ margin: 'auto' }}>
                                                {Managers[3].Name.split(' ')[0]}
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', color: 'white', fontSize: '30px', fontWeight: 'bolder', paddingTop: '20px' }}>
                                            <div style={{ margin: 'auto' }}>
                                                {Managers[1].Name.split(' ')[0]}
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                            <div style={{ margin: 'auto' }}>
                                                {Managers[0].Name.split(' ')[0]}
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', color: 'white', fontSize: '30px', fontWeight: 'bolder', paddingTop: '40px' }}>
                                            <div style={{ margin: 'auto' }}>
                                                {Managers[2].Name.split(' ')[0]}
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', color: 'white', fontSize: '30px', fontWeight: 'bolder', paddingTop: '80px' }}>
                                            <div style={{ margin: 'auto' }}>
                                                {Managers[4].Name.split(' ')[0]}
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', color: 'white', fontSize: '30px', fontWeight: 'bolder', paddingTop: '120px' }}>
                                            <div style={{ margin: 'auto' }}>
                                                {Managers[6].Name.split(' ')[0]}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                        }

                    </>
            }
        </Grid>
    )
};

export default HorseRace;