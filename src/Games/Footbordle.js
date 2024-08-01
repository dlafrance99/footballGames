import '../App.css';
import { useEffect, useState } from 'react';
import { Grid, Row, Col, Input, Button, ButtonToolbar } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

import NFLPlayerList from '../NFLPlayerList';

const Footbordle = () => {
    const [GameOver, setGameOver] = useState(false)
    const [GameOverTime, setGameOverTime] = useState(false)

    const [ChosenPlayer, setChosenPlayer] = useState({ Rank: 0, First: ``, Last: ``, Position: ``, Team: `` })
    const [CurrentGuess, setCurrentGuess] = useState('')
    const [Results, setResults] = useState([])
    const [Guesses, setGuesses] = useState([
        {
            last: ''
        },
        {
            last: ''
        },
        {
            last: ''
        },
        {
            last: ''
        },
        {
            last: ''
        },
        {
            last: ''
        },

    ])

    const getPlayer = () => {
        let RandomNumber = Math.floor(Math.random() * NFLPlayerList.length)

        setChosenPlayer({ Rank: NFLPlayerList[RandomNumber].Rank, First: NFLPlayerList[RandomNumber].First.toUpperCase(), Last: NFLPlayerList[RandomNumber].Last.toUpperCase(), Position: NFLPlayerList[RandomNumber].Position.toUpperCase(), Team: NFLPlayerList[RandomNumber].Team.toUpperCase() })
    }

    useEffect(() => {
        handleReset()

        let TENum = NFLPlayerList.filter((player) => player.Position === 'TE')
        let RBNum = NFLPlayerList.filter((player) => player.Position === 'RB')
        let WRNum = NFLPlayerList.filter((player) => player.Position === 'WR')
        let QBNum = NFLPlayerList.filter((player) => player.Position === 'QB')        
    }, [])

    const handleGuess = () => {
        if (CurrentGuess.length !== ChosenPlayer.Last.length) {
            return null
        }
        let newGuesses = []

        for (let i = 0; i < Guesses.length; i++) {
            if (Guesses[i].last === '') {
                newGuesses.push({ last: CurrentGuess })
                while (i < Guesses.length - 1) {
                    newGuesses.push({ last: '' })
                    i++
                }
            } else {
                newGuesses.push(Guesses[i])
            }

        }

        setGuesses(newGuesses)

        if (CurrentGuess === ChosenPlayer.Last) {
            return handleWinner()
        }

        if (newGuesses[5].last !== '') {
            return handleLoser()
        }

        setCurrentGuess('')
    }

    const handleWinner = () => {
        let newResult = Results
        newResult.push({
            Result: 'Correct',
            Answer: ChosenPlayer.Last
        })
        setResults(newResult)

        let CorrectLength = newResult.filter(Result => Result.Result !== 'Wrong')
        if (CorrectLength.length === 3) {
            handleGameOver()
        } else {
            handleReset()
        }
        setCurrentGuess('')
    }

    const handleLoser = () => {
        let newResult = Results
        newResult.push({
            Result: 'Wrong',
            Answer: ChosenPlayer.Last
        })
        setResults(newResult)

        handleReset()
        setCurrentGuess('')
    }

    const handleGameOver = () => {
        let GameTime = new Date()
        GameTime = `${GameTime.getMonth()}/${GameTime.getDate()}/${GameTime.getFullYear()} ${GameTime.getHours() > 12 ? GameTime.getHours() - 12 : GameTime.getHours()}:${(GameTime.getMinutes() < 10 ? '0' : '') + GameTime.getMinutes()}:${(GameTime.getSeconds() < 10 ? '0' : '') + GameTime.getSeconds()}:${GameTime.getMilliseconds()} ${GameTime.getHours() > 12 ? 'PM' : 'AM'}`
        setGameOverTime(GameTime)
        setGameOver(true)
    }

    const handleReset = () => {
        getPlayer()
        setGuesses([
            {
                last: ''
            },
            {
                last: ''
            },
            {
                last: ''
            },
            {
                last: ''
            },
            {
                last: ''
            },
            {
                last: ''
            },

        ])
    }

    const determineStyle = (guess, index) => {
        let ChosenPlayerLastNameArray = ChosenPlayer.Last.split('')
        if (guess === ChosenPlayer.Last[index]) {
            return 'green'
        } else if (ChosenPlayerLastNameArray.includes(guess)) {
            return 'orange'
        }
        return null
    }

    const showGuesses = () => {
        let userGuesses = []
        for (let i = 0; i < Guesses.length; i++) {
            let blankPlayer = ChosenPlayer.Last.split('')
            blankPlayer = blankPlayer.map((letter) => ' ')
            let CurrentGuess = Guesses[i].last === '' ? blankPlayer : Guesses[i].last.split('')
            CurrentGuess = CurrentGuess.map((guess, index) => (
                <div className='EmptyBox' style={{ color: 'white', verticalAlign: 'middle', lineHeight: '50px', fontSize: 30, backgroundColor: determineStyle(guess, index) }}>
                    {guess}
                </div>
            ))
            userGuesses.push(
                <Row style={{ marginBottom: '10px' }}>
                    <Col sm={24} style={{ textAlign: 'center' }}>
                        {CurrentGuess}
                    </Col>
                </Row>
            )
        }
        return userGuesses
    }

    return (
        <Grid className='Wrapper'>
            <Row className='Header'>
                <Col sm={24}>
                    <h1>
                        Fantasy Football 4.0
                    </h1>
                </Col>
            </Row>

            <Row className='GameTitle'>
                <Col sm={24}>
                    <h1>
                        Fantasy Footbordle
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
                                    {GameOverTime}
                                </h2>
                            </Col>
                        </Row>

                        <Row>
                            {Results.map(Result => (
                                <>
                                    {Result.Result === 'Wrong'
                                        ?
                                        <div style={{ color: 'white', fontSize: '2em', textAlign: 'center' }}>
                                            <CloseIcon color='red' />
                                            {Result.Answer}
                                        </div>
                                        :
                                        <div style={{ color: 'white', fontSize: '2em', textAlign: 'center' }}>
                                            <CheckIcon color='green' style={{ marginRight: '10px' }} />
                                            {Result.Answer}
                                        </div>
                                    }
                                </>
                            ))}
                        </Row>
                    </>
                    :
                    <>
                        <Row className='GameRules'>
                            <Col sm={24}>
                                <div className='GameRulesFont'>
                                    Essentially it's wordle, You have to get three right. They are all NFL top 100 Fantasy Football Players
                                </div>
                            </Col>
                        </Row>

                        {showGuesses()}

                        <Row >
                            <Col sm={24} style={{ width: '50%', margin: 'auto', marginBottom: '5px', marginTop: '10px' }}>
                                <label style={{ color: 'white', textAlign: 'left' }}>
                                    Guess
                                </label>
                            </Col>
                            <Col sm={24} className='Guesses'>
                                <Input
                                    style={{ color: 'black', width: '50%', backgroundColor: 'white', border: '1px solid white', fontSize: '50px' }}
                                    maxLength={ChosenPlayer.Last.length}
                                    minLength={ChosenPlayer.Last.length}
                                    onPressEnter={() => handleGuess()}
                                    value={CurrentGuess}
                                    onChange={(value) => setCurrentGuess(value.toUpperCase())}
                                />

                                {
                                    Guesses[3].last !== ''
                                        ?
                                        <>
                                            <Row>
                                                <Col>
                                                    <h1 style={{ color: 'white' }}>
                                                        Hints:
                                                    </h1>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h1 style={{ color: 'white' }}>
                                                        Position: {ChosenPlayer.Position}
                                                    </h1>
                                                </Col>
                                            </Row>
                                        </>
                                        :
                                        null
                                }

                                {
                                    Guesses[4].last !== ''
                                        ?
                                        <>
                                            <Row>
                                                <Col>
                                                    <h1 style={{ color: 'white' }}>
                                                        Position: {ChosenPlayer.Team}
                                                    </h1>
                                                </Col>
                                            </Row>
                                        </>
                                        :
                                        null
                                }

                                <ButtonToolbar style={{ width: '50%', margin: 'auto', marginTop: '15px' }}>
                                    <Button
                                        style={{ fontSize: '25px', padding: '10px 15px 10px 15px', backgroundColor: 'transparent', border: '2px solid green', color: 'green', borderRadius: '5px' }}
                                        onClick={() => handleGuess()}
                                    >
                                        Enter
                                    </Button>
                                </ButtonToolbar>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={24} style={{ textAlign: 'center', fontSize: '5em' }}>
                                {Results.map(Result => (
                                    <>
                                        {Result.Result === 'Wrong' ? <CloseIcon color='red' /> : <CheckIcon color='green' />}
                                    </>
                                ))}
                            </Col>
                        </Row>
                    </>
            }
        </Grid>
    )
};

export default Footbordle;
