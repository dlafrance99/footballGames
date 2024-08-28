import '../App.css';
import { useEffect, useState, useRef } from 'react';
import { Grid, Row, Col, Button, Input, ButtonToolbar } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

import NFLTeamList from '../NFLTeamList';
import ManagerScore from '../ManagerScores';

const HorseRace = () => {
    const [GameStarted, setGameStarted] = useState(false)
    const [GameOver, setGameOver] = useState(false)
    const [SelectedManager, setSelectedManager] = useState('')

    const [DefensiveCards, setDefensiveCards] = useState([])
    const [OffensiveCards, setOffensiveCards] = useState([])
    const [GroupLevel, setGroupLevel] = useState(0)

    const [TeamBets, setTeamBets] = useState([
        {
            Manager: "Katie Schmidt",
            StartingScore: 9,
            Team: "49ers",
            Bet: 2,
            Level: 0
        },
        {
            Manager: "Sabrina LaCombe",
            StartingScore: 8,
            Team: "Bears",
            Bet: 3,
            Level: 0
        },
        {
            Manager: "Jesse Ireland",
            StartingScore: 5,
            Team: "Bengals",
            Bet: 2,
            Level: 0
        },
        {
            Manager: "Nick LaCombe",
            StartingScore: 5,
            Team: "Bills",
            Bet: 3,
            Level: 0
        },
        {
            Manager: "Devon LaFrance",
            StartingScore: 4,
            Team: "Broncos",
            Bet: 2,
            Level: 0
        },
        {
            Manager: "Kyle LaCombe",
            StartingScore: 2,
            Team: "Eagles",
            Bet: 3,
            Level: 0
        },
        {
            Manager: "Räley Gonzalez",
            StartingScore: 2,
            Team: "Commanders",
            Bet: 2,
            Level: 0
        },
        {
            Manager: "Tyler Smith",
            StartingScore: 1,
            Team: "Dolphins",
            Bet: 3,
            Level: 0
        }
    ])
    // const [TeamBets, setTeamBets] = useState(ManagerScore.sort((a, b) => {
    //     if (a.Score === b.Score) {
    //         return a.Name.localeCompare(b.Name);
    //     }
    //     return b.Score - a.Score;
    // }).map((manager) => ({
    //     Manager: manager.Name,
    //     StartingScore: manager.Score,
    //     Team: 'AFC',
    //     Bet: 0,
    //     Level: 0
    // })))

    const [NFLTeams, setNFLTeams] = useState(NFLTeamList)

    const handleTeamSelection = (SelectedTeam) => {
        let updatedTeamBets = TeamBets

        let changeTeam = TeamBets.find((name) => name.Manager === SelectedManager)
        if (changeTeam) {
            for (let i = 0; i < updatedTeamBets.length; i++) {
                if (updatedTeamBets[i].Manager === SelectedManager) {
                    updatedTeamBets[i]['Team'] = SelectedTeam
                }
            }
        } else {
            updatedTeamBets.push({
                Manager: SelectedManager,
                Team: SelectedTeam
            })
        }

        let UpdatedNFLTeams = NFLTeams.filter((team) => team.Name !== SelectedTeam)

        setTeamBets(updatedTeamBets)
        setNFLTeams(UpdatedNFLTeams)
    }

    const handleBet = (manager, value) => {
        if (value === '' || isNaN(value)) {
            return null
        }
        const updatedTeamBets = TeamBets.map((m) => {
            if (m.Manager === manager.Manager) {
                return { ...m, Bet: parseInt(value) };
            }
            return m;
        });

        setTeamBets(updatedTeamBets);
    }

    const StartDisabled = () => {
        let disabled = false
        for (let i = 0; i < TeamBets.length; i++) {
            if (TeamBets[i].Bet === 0 || TeamBets[i].Team === 'AFC') {
                return true
            }
        }
        return disabled
    }

    const handleStartGame = () => {
        setGameStarted(true)

        let updatedDefensiveCards = []
        for (let i = 0; i < 5; i++) {
            updatedDefensiveCards.push({
                Team: getRandomCard(TeamBets.map((manager) => manager.Team)),
                Level: i + 1
            })
        }
        setDefensiveCards(updatedDefensiveCards)
    }

    const HandleNewCard = () => {
        //write the logic to check if they need to flip a defensive card and handle that
        let NewCard = getRandomCard(TeamBets.map((manager) => manager.Team))
        let UpdatedOffensiveCards = OffensiveCards
        UpdatedOffensiveCards.push(NewCard)
        setOffensiveCards(UpdatedOffensiveCards)

        let updatedTeamBets = []
        for (let i = 0; i < TeamBets.length; i++) {
            if (NewCard === TeamBets[i].Team) {
                updatedTeamBets.push({
                    ...TeamBets[i],
                    Level: TeamBets[i].Level + 1
                })
            } else {
                updatedTeamBets.push(TeamBets[i])
            }
        }
        setTeamBets(updatedTeamBets)
    }

    const getRandomCard = (Deck) => {
        return Deck[Math.floor(Math.random() * Deck.length)]
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
                                <>
                                    <Row>
                                        <Col sm={24} style={{ display: 'flex', marginRight: '30px', marginLeft: '30px' }}>
                                            {
                                                TeamBets.map((manager) => (
                                                    <>
                                                        <div style={{ marginLeft: '5px', flex: 1, marginRight: '5px' }}>
                                                            <div style={{ color: 'white', width: '100%', textAlign: 'center' }}>
                                                                {manager.Manager.split(' ')[0]} ({manager.StartingScore})
                                                            </div>
                                                            <div style={{ height: '10vh' }}>
                                                                <img
                                                                    src={require(`../Assets/TeamImages/${manager.Team}.png`)}
                                                                    alt='team logo'
                                                                    style={{
                                                                        objectFit: 'contain',
                                                                        width: '100%',
                                                                        height: '100%',
                                                                    }}
                                                                />
                                                            </div>
                                                            <div style={{ color: 'white', width: '100%', textAlign: 'center', fontSize: '30px', fontWeight: 'bolder' }}>
                                                                {manager.Bet}
                                                            </div>
                                                        </div>
                                                    </>
                                                ))
                                            }
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: '10px', display: 'flex' }}>
                                        <Col className='FootballField' style={{ display: 'flex', flex: 7 }}>
                                            <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                                <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                    6
                                                </div>
                                                <div>
                                                    {
                                                        TeamBets.filter((team) => team.Level === 0).map((teamImg) => (
                                                            <img
                                                                src={require(`../Assets/TeamImages/${teamImg.Team}.png`)}
                                                                alt='team logo'
                                                                style={{
                                                                    objectFit: 'contain',
                                                                    height: '12%',
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <div style={{ marginTop: '75px', marginRight: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                    0
                                                </div>
                                            </div>

                                            <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                                <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                    5
                                                </div>
                                                <div>
                                                    {
                                                        TeamBets.filter((team) => team.Level === 1).map((teamImg) => (
                                                            <img
                                                                src={require(`../Assets/TeamImages/${teamImg.Team}.png`)}
                                                                alt='team logo'
                                                                style={{
                                                                    objectFit: 'contain',
                                                                    height: '12%',
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <div style={{ marginTop: '75px', marginRight: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                    0
                                                </div>
                                            </div>

                                            <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                                <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                    4
                                                </div>
                                                <div>
                                                    {
                                                        TeamBets.filter((team) => team.Level === 2).map((teamImg) => (
                                                            <img
                                                                src={require(`../Assets/TeamImages/${teamImg.Team}.png`)}
                                                                alt='team logo'
                                                                style={{
                                                                    objectFit: 'contain',
                                                                    height: '12%',
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <div style={{ marginTop: '75px', marginRight: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                    0
                                                </div>
                                            </div>

                                            <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                                <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                    3
                                                </div>
                                                <div>
                                                    {
                                                        TeamBets.filter((team) => team.Level === 3).map((teamImg) => (
                                                            <img
                                                                src={require(`../Assets/TeamImages/${teamImg.Team}.png`)}
                                                                alt='team logo'
                                                                style={{
                                                                    objectFit: 'contain',
                                                                    height: '12%',
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <div style={{ marginTop: '75px', marginRight: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                    0
                                                </div>
                                            </div>

                                            <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                                <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                    2
                                                </div>
                                                <div>
                                                    {
                                                        TeamBets.filter((team) => team.Level === 4).map((teamImg) => (
                                                            <img
                                                                src={require(`../Assets/TeamImages/${teamImg.Team}.png`)}
                                                                alt='team logo'
                                                                style={{
                                                                    objectFit: 'contain',
                                                                    height: '12%',
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <div style={{ marginTop: '75px', marginRight: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                    0
                                                </div>
                                            </div>

                                            <div style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '30px', fontWeight: 'bolder' }}>
                                                <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }}>
                                                    1
                                                </div>
                                                <div>
                                                    {
                                                        TeamBets.filter((team) => team.Level === 5).map((teamImg) => (
                                                            <img
                                                                src={require(`../Assets/TeamImages/${teamImg.Team}.png`)}
                                                                alt='team logo'
                                                                style={{
                                                                    objectFit: 'contain',
                                                                    height: '12%',
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <div style={{ marginTop: '75px', marginRight: '5px', transform: 'rotate(180deg)', paddingTop: '200%' }} />
                                            </div>

                                            <div onClick={() => HandleNewCard()} style={{ flex: 1, borderLeft: '2px solid white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', fontSize: '50px', fontWeight: 'bolder', backgroundColor: '#002244', cursor: 'pointer' }}>
                                                <div>
                                                    {
                                                        TeamBets.filter((team) => team.Level === 6).map((teamImg) => (
                                                            <img
                                                                src={require(`../Assets/TeamImages/${teamImg.Team}.png`)}
                                                                alt='team logo'
                                                                style={{
                                                                    objectFit: 'contain',
                                                                    height: '12%',
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <div style={{ marginTop: '75px', marginLeft: '5px', transform: 'rotate(90deg)', paddingTop: '120%', color: '#FB4F14' }}>
                                                    Broncos
                                                </div>
                                            </div>
                                        </Col>
                                        <Col style={{ flex: 1, margin: '10px' }}>
                                            <div style={{ flex: 1, flexDirection: 'row', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                                                <div style={{ flex: 1, height: '75vh' }}>
                                                    <div style={{ flex: 1, color: 'white', borderBottom: '2px solid white', }}>
                                                        Defense
                                                    </div>
                                                    {
                                                        DefensiveCards.map((defense) => (
                                                            <img
                                                                src={defense.Level >= GroupLevel ? require(`../Assets/GameCardImages/NFLLogo.png`) : require(`../Assets/TeamImages/${defense.Team}.png`)}
                                                                alt='team logo'
                                                                style={{
                                                                    objectFit: 'contain',
                                                                    height: '12%',
                                                                    width: '100%',
                                                                    borderRight: '1px solid white',
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <div style={{ flex: 1, }}>
                                                    <div style={{ flex: 1, color: 'white', borderBottom: '2px solid white', borderLeft: '1px solid white' }}>
                                                        Offense
                                                    </div>
                                                    {
                                                        OffensiveCards.map((offense) => (
                                                            <img
                                                                src={require(`../Assets/TeamImages/${offense}.png`)}
                                                                alt='team logo'
                                                                style={{
                                                                    objectFit: 'contain',
                                                                    height: '2%',
                                                                    width: '100%',
                                                                    borderRight: '1px solid white',
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </>
                                :
                                <>
                                    <Row>
                                        <Col sm={24} style={{ display: 'flex', marginRight: '30px', marginLeft: '30px' }}>
                                            {
                                                TeamBets.map((manager) => (
                                                    <>
                                                        <div style={{ marginLeft: '5px', flex: 1, marginRight: '5px' }}>
                                                            <div onClick={() => setSelectedManager(manager.Manager)} style={{ color: manager.Manager === SelectedManager ? '#FB4F14' : 'white', width: '100%', textAlign: 'center', cursor: 'pointer' }}>
                                                                {manager.Manager.split(' ')[0]} ({manager.StartingScore})
                                                            </div>
                                                            <div style={{ height: '10vh' }}>
                                                                <img
                                                                    src={require(`../Assets/TeamImages/${manager.Team}.png`)}
                                                                    alt='team logo'
                                                                    style={{
                                                                        objectFit: 'contain',
                                                                        width: '100%',
                                                                        height: '100%',
                                                                    }}
                                                                />
                                                            </div>
                                                            <Input
                                                                style={{ color: 'black', width: '50%', backgroundColor: 'white', border: '1px solid white', fontSize: '50px', alignSelf: 'center', marginTop: '10px', marginLeft: '25%' }}
                                                                value={manager.Bet}
                                                                onChange={(value) => handleBet(manager, value)}
                                                            />
                                                        </div>
                                                    </>
                                                ))
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={24} style={{ textAlign: 'center', margin: '10px 10px 10px 10px' }}>
                                            <Button
                                                style={{ fontSize: '25px', padding: '10px 15px 10px 15px', backgroundColor: 'transparent', border: '2px solid green', color: 'green', borderRadius: '5px', cursor: StartDisabled() ? 'not-allowed' : 'pointer', opacity: StartDisabled() ? .5 : 1, margin: 'auto', textAlign: 'center' }}
                                                disabled={StartDisabled()}
                                                onClick={() => handleStartGame()}
                                            >
                                                Start
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={24} style={{ margin: 'auto', marginTop: '10px' }}>
                                            {NFLTeams.filter((item) => {
                                                let selectedTeams = TeamBets.map((teamOnly) => teamOnly.Team)
                                                return !selectedTeams.includes(item.Team)
                                            })
                                                .map((Team) => (
                                                    <>
                                                        <img
                                                            src={require(`../Assets/TeamImages/${Team.Logo}`)}
                                                            alt='team logo'

                                                            onClick={SelectedManager === '' ? () => console.log('nothing') : () => handleTeamSelection(Team.Team)}
                                                            style={{
                                                                objectFit: 'contain',
                                                                width: '10vw',
                                                                cursor: SelectedManager === '' ? 'not-allowed' : 'pointer'
                                                            }}
                                                        />
                                                    </>
                                                ))}
                                        </Col>
                                    </Row>
                                </>
                        }

                    </>
            }
        </Grid>
    )
};

export default HorseRace;