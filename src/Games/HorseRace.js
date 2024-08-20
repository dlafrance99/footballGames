import '../App.css';
import { useEffect, useState, useRef } from 'react';
import { Grid, Row, Col, Button, ButtonToolbar } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import NFLTeamList from '../NFLTeamList';

const HorseRace = () => {
    const [GameStarted, setGameStarted] = useState(false)
    const [GameOver, setGameOver] = useState(false)
    const [GameStartTime, setGameStartTime] = useState(null)
    const [GameOverTime, setGameOverTime] = useState(null)

    const [Rounds, setRounds] = useState(10)
    const [CurrentRound, setCurrentRound] = useState(1)

    const parentRef = useRef(null)

    const getRandomNum = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    const handleRestart = () => {
        setGameOver(false)
        setGameStartTime(null)
        setGameOverTime(null)
        setGameStarted(false)
        setCurrentRound(1)
    }

    const handleStartGame = () => {
        setGameStarted(true)
        setGameStartTime(new Date())
    }

    const handleEndGame = () => {
        setGameOver(true)
        setGameOverTime(new Date())
    }

    const handleCorrectAnswer = () => {
        setCurrentRound(CurrentRound + 1)
        if (CurrentRound + 1 === Rounds) {
            handleEndGame()
        }
    }

    const handleIncorrectAnswer = () => {
        setCurrentRound(1)
    }

    const handleTeamSelection = (Team) => {
        if (Team === 'Broncos') {
            handleCorrectAnswer()
        } else {
            handleIncorrectAnswer()
        }
    }

    const showRandomTeams = () => {
        return (
            <>
                {
                    NFLTeamList.map((Team) => {
                        let imgHeight = getRandomNum(10, 40)
                        return (
                            <>
                                <img
                                    src={require(`../Assets/TeamImages/${Team.Logo}`)}
                                    alt='team logo'
                                    onClick={() => handleTeamSelection(Team.Team)}
                                    style={{
                                        position: 'absolute',
                                        height: `${imgHeight}%`,
                                        objectFit: 'contain',
                                        top: `${getRandomNum(0, (100 - imgHeight))}%`,
                                        left: `${getRandomNum(0, 85)}%`,
                                        zIndex: Team.Team === 'Broncos' ? 1 : 0,
                                        cursor: 'pointer'
                                    }}
                                />
                            </>
                        )
                    })
                }
            </>
        )
    }

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
                        <Row className='GameTitle'>
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

                        </Row>
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

                        <Row>
                            <Col ref={parentRef} sm={24} className='FootballField'>
                                {
                                    GameStarted
                                        ?
                                        <>
                                            {showRandomTeams()}
                                        </>
                                        :
                                        <>
                                            <ButtonToolbar style={{ width: '50%', margin: 'auto', marginTop: '15px', height: '100%', alignContent: 'center' }}>
                                                <Button
                                                    style={{ fontSize: '25px', padding: '10px 15px 10px 15px', backgroundColor: 'transparent', border: '2px solid green', color: 'green', borderRadius: '5px', cursor: 'pointer' }}
                                                    onClick={() => handleStartGame()}
                                                >
                                                    Start
                                                </Button>
                                            </ButtonToolbar>
                                        </>
                                }

                            </Col>
                        </Row>
                    </>
            }
        </Grid>
    )
};

export default HorseRace;