import '../App.css';
import { useEffect, useState } from 'react';
import { Grid, Row, Col, Button, ButtonToolbar } from 'rsuite';

import NFLTeamList from '../NFLTeamList';

const UpAndDownTheNFL = () => {
    const [GameStage, setGameStage] = useState('Pre')

    const [RandomTeam, setRandomTeam] = useState('')
    const [GameRound, setGameRound] = useState(1)
    const [CurrentTeam, setCurrentTeam] = useState('')
    const [Correct, setCorrect] = useState(0)

    const [Message, setMessage] = useState('')

    const [GameStartTime, setGameStartTime] = useState(null)
    const [GameOverTime, setGameOverTime] = useState(null)


    useEffect(() => {
        getRandomTeam()
    }, [GameStartTime])

    useEffect(() => {
        setTimeout(() => {
            setMessage('')
        }, '2500')
    }, [Message])

    const handleStartGame = () => {
        setGameStage('GameTime')
        setGameStartTime(new Date())
    }

    const handleGameOver = () => {
        setGameStage('GameOver')
        setGameOverTime(new Date())
    }

    const handleRestart = () => {
        getRandomTeam()
        setCorrect(0)
        setGameRound(1)
        handleStartGame()
    }

    const getRandomTeam = (RestrictedTeam1, RestrictedTeam2) => {
        let randomNum = parseInt(Math.random() * NFLTeamList.length)

        while (NFLTeamList[randomNum].Team === RestrictedTeam1 || NFLTeamList[randomNum].Team === RestrictedTeam2) {
            randomNum = parseInt(Math.random() * NFLTeamList.length)
        }

        setRandomTeam(NFLTeamList[randomNum])
    }

    const handleRound1Selection = (Team) => {
        if (Team.OddToWinSuperBowl === RandomTeam.OddToWinSuperBowl) {
            setCurrentTeam(Team)
            setGameRound(GameRound + 1)
            setMessage('Success!')
            getRandomTeam(Team.Team)
        } else {
            getRandomTeam()
        }
    }

    const handleRound2Selection = (Team) => {
        const handleCorrectAnswer = (Team) => {
            setCurrentTeam(RandomTeam)
            getRandomTeam(Team.Team)
            setMessage('Success!')
            setCorrect(Correct + 1)
            if (Correct + 1 === 5) {
                setGameRound(3)
                setCorrect(0)
            }
        }
        const handleWrongAnswer = (correctAnswer) => {
            getRandomTeam(CurrentTeam.Team)
            setMessage(correctAnswer)
            setCorrect(0)
        }

        if (Team === 'Same') {
            if (CurrentTeam.WinRecord23 === RandomTeam.WinRecord23) {
                handleCorrectAnswer(Team)
            } else {
                handleWrongAnswer('They did not have the same record')
            }
        } else if (Team.Team === RandomTeam.Team) {
            if (Team.WinRecord23 > CurrentTeam.WinRecord23) {
                handleCorrectAnswer(Team)
            } else {
                handleWrongAnswer(`${Team.Team} won ${Team.WinRecord23} times while ${CurrentTeam.Team} won ${CurrentTeam.WinRecord23} times`)
            }
        } else if (Team.Team === CurrentTeam.Team) {
            if (Team.WinRecord23 > RandomTeam.WinRecord23) {
                handleCorrectAnswer(Team)
            } else {
                handleWrongAnswer(`${Team.Team} won ${Team.WinRecord23} times while ${RandomTeam.Team} won ${RandomTeam.WinRecord23} times`)
            }
        }
    }

    const handleRound3Selection = (Team) => {
        const handleCorrectAnswer = (Team) => {
            setCurrentTeam(RandomTeam)
            getRandomTeam(Team.Team)
            setMessage('Success!')
            setCorrect(Correct + 1)
            if (Correct + 1 === 5) {
                handleGameOver()
            }
        }
        const handleWrongAnswer = (correctAnswer) => {
            getRandomTeam(CurrentTeam.Team)
            setMessage(correctAnswer)
            setCorrect(0)
        }

        if (Team === 'Same') {
            if (CurrentTeam.ProjectedWinRecord24 === RandomTeam.ProjectedWinRecord24) {
                handleCorrectAnswer(Team)
            } else {
                handleWrongAnswer('They are not projected to have the same record')
            }
        } else if (Team.Team === RandomTeam.Team) {
            if (Team.ProjectedWinRecord24 > CurrentTeam.ProjectedWinRecord24) {
                handleCorrectAnswer(Team)
            } else {
                handleWrongAnswer(`${Team.Team} are projected to win ${Team.ProjectedWinRecord24} times while ${CurrentTeam.Team} are projected to win ${CurrentTeam.ProjectedWinRecord24} times`)
            }
        } else if (Team.Team === CurrentTeam.Team) {
            if (Team.ProjectedWinRecord24 > RandomTeam.ProjectedWinRecord24) {
                handleCorrectAnswer(Team)
            } else {
                handleWrongAnswer(`${Team.Team} are projected to win ${Team.ProjectedWinRecord24} times while ${RandomTeam.Team} are projected to win ${RandomTeam.ProjectedWinRecord24} times`)
            }
        }
    }

    const convertTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;
    
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        const formattedMilliseconds = milliseconds.toString().padStart(3, '0');
    
        return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
    };

    return (
        <Grid className='Wrapper'>
            <Row className='GameTitle'>
                {
                    Message && (
                        <div style={{ position: 'absolute', color: 'white', backgroundColor: Message === 'Success!' ? '#00FF0080' : '#FF000080', top: '50%', left: '40%', height: '20%', width: '20%', textAlign: 'center', alignContent: 'center', borderRadius: '10px', border: Message === 'Success!' ? '5px solid darkgreen' : '5px solid darkred' }}>
                            {Message}
                        </div>
                    )
                }
                <Col sm={24}>
                    <h1 style={{ color: 'white' }}>
                        Up And Down The NFL
                    </h1>
                </Col>
            </Row>

            <Row className='GameRules' style={{ paddingBottom: '0px' }}>
                <Col sm={24}>
                    <div className='GameRulesFont'>
                        This is similar to the drinking game Up and Down the River, with three different rounds.
                    </div>
                    <div className='GameRulesFont'>
                        Round 1: Figure out your randomly assigned random team. We'll provide their betting odds to win the super bowl and you'll have to guess the team. If you're wrong, you'll get a new team.
                    </div>
                    <div className='GameRulesFont'>
                        Round 2: Up and Down the River... With your starting team, you'll have to guess whether the new randomly selected team had a better, worse, or same record, you'll have to get 5 in a row before moving onto the next round.
                    </div>
                    <div className='GameRulesFont'>
                        Round 3: Up and Down the River... On this river, you'r guessing based on the teams projected records, again you have to get 5 in a row before the game is over.
                    </div>
                    <div className='GameRulesFont'>
                        Based on DraftKings records as of Aug 4th (+500 is the best odds and +30000 is the worst odds)
                    </div>
                </Col>
            </Row>

            {
                GameStage === 'Pre' && (
                    <>
                        <Row className='GameTitle' style={{ marginTop: '10px', marginBottom: '10px', height: '50vh' }}>
                            <Col sm={24} style={{ height: '100%' }}>
                                <ButtonToolbar style={{ width: '50%', margin: 'auto', marginTop: '15px', height: '100%', alignContent: 'center', textAlign: 'center' }}>
                                    <Button
                                        style={{ fontSize: '25px', padding: '10px 15px 10px 15px', backgroundColor: 'transparent', border: '2px solid green', color: 'green', borderRadius: '5px', cursor: 'pointer', textAlign: 'center' }}
                                        onClick={() => handleStartGame()}
                                    >
                                        Start
                                    </Button>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    </>
                )
            }

            {
                GameStage === 'GameTime' && (
                    <>
                        <Row className='GameTitle' style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <Col sm={24}>
                                <h1 style={{ color: 'white' }}>
                                    Round: {GameRound}
                                </h1>
                                {
                                    GameRound === 1 && (
                                        <h3>
                                            Match the team to the odds to win the super bowl this year
                                        </h3>
                                    )
                                }
                                {
                                    (GameRound === 2 || GameRound === 3) && (
                                        <>
                                            <h3>
                                                {GameRound === 2 ? 'Which team had the better 2023' : 'Which team is projected to have a better 2024'} record?
                                            </h3>
                                            <h4>
                                                {Correct}/5
                                            </h4>
                                        </>
                                    )
                                }
                            </Col>
                        </Row>

                        <Row style={{ display: 'flex' }}>
                            <span style={{ flex: 5 }} />

                            <div style={{ flex: 6, marginLeft: '10px', marginRight: '10px', height: '50vh', justifyContent: 'center', alignContent: 'center' }}>
                                {
                                    GameRound === 1 && (
                                        <>
                                            <h1>
                                                Odds to Win:
                                            </h1>
                                            <h2>
                                                + {RandomTeam.OddToWinSuperBowl}
                                            </h2>
                                        </>
                                    )
                                }
                                {
                                    (GameRound === 2 || GameRound === 3) && (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img
                                                    src={require(`../Assets/TeamImages/${CurrentTeam.Logo}`)}
                                                    alt='team logo'
                                                    onClick={GameRound === 2 ? () => handleRound2Selection(CurrentTeam) : () => handleRound3Selection(CurrentTeam)}
                                                    style={{
                                                        objectFit: 'contain',
                                                        cursor: 'pointer',
                                                        maxWidth: '30%',
                                                        textAlign: 'center',
                                                        maxHeight: '30%',
                                                        flex: '1 1 auto',
                                                        margin: '5px'
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            {(GameRound === 2 || GameRound === 3) && (
                                <div style={{ flex: 3, marginLeft: '10px', marginRight: '10px', height: '50vh', justifyContent: 'center', alignContent: 'center' }}>
                                    <h1
                                        style={{ border: '2px solid white', cursor: 'pointer' }}
                                        onClick={GameRound === 2 ? () => handleRound2Selection('Same') : () => handleRound3Selection('Same')}
                                    >
                                        Same is an answer
                                    </h1>
                                </div>
                            )}

                            <div style={{
                                flex: 6,
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                marginLeft: '10px',
                                marginRight: '10px',
                                height: '50vh'
                            }}>
                                {
                                    GameRound === 1 && (
                                        <>
                                            {NFLTeamList.map((Team) => {
                                                return (
                                                    <>
                                                        <img
                                                            src={require(`../Assets/TeamImages/${Team.Logo}`)}
                                                            alt='team logo'
                                                            onClick={() => handleRound1Selection(Team)}
                                                            style={{
                                                                objectFit: 'contain',
                                                                cursor: 'pointer',
                                                                maxWidth: '15%',
                                                                maxHeight: '15%',
                                                                flex: '1 1 auto',
                                                                margin: '5px'
                                                            }}
                                                        />
                                                    </>
                                                )
                                            })}
                                        </>
                                    )
                                }
                                {
                                    (GameRound === 2 || GameRound === 3) && (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <img
                                                    src={require(`../Assets/TeamImages/${RandomTeam.Logo}`)}
                                                    alt='team logo'
                                                    onClick={GameRound === 2 ? () => handleRound2Selection(RandomTeam) : () => handleRound3Selection(RandomTeam)}
                                                    style={{
                                                        objectFit: 'contain',
                                                        cursor: 'pointer',
                                                        maxWidth: '30%',
                                                        textAlign: 'center',
                                                        maxHeight: '30%',
                                                        flex: '1 1 auto',
                                                        margin: '5px'
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <span style={{ flex: 5 }} />
                        </Row>

                    </>
                )
            }

            {
                GameStage === 'GameOver' && (
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
                                    {convertTime(GameOverTime - GameStartTime)}
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
                )
            }

        </Grid>
    )
};

export default UpAndDownTheNFL;
