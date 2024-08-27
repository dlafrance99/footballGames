import '../App.css';
import { useEffect, useState } from 'react';
import { Grid, Row, Col, Input, Button, ButtonToolbar } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

import NFLPlayerList24 from '../NFLPlayerList24';

const Footbordle24 = () => {
    const [GameOver, setGameOver] = useState(false)
    const [GameStarted, setGameStarted] = useState(false)

    const [GameStartTime, setGameStartTime] = useState(null)
    const [GameOverTime, setGameOverTime] = useState(null)

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
        let RandomNumber = Math.floor(Math.random() * NFLPlayerList24.length)

        setChosenPlayer({ Rank: NFLPlayerList24[RandomNumber].Rank, First: NFLPlayerList24[RandomNumber].First.toUpperCase(), Last: NFLPlayerList24[RandomNumber].Last.toUpperCase(), Position: NFLPlayerList24[RandomNumber].Position.toUpperCase(), Team: NFLPlayerList24[RandomNumber].Team.toUpperCase() })
    }

    useEffect(() => {
        handleReset()

        let TENum = NFLPlayerList24.filter((player) => player.Position === 'TE')
        let RBNum = NFLPlayerList24.filter((player) => player.Position === 'RB')
        let WRNum = NFLPlayerList24.filter((player) => player.Position === 'WR')
        let QBNum = NFLPlayerList24.filter((player) => player.Position === 'QB')
    }, [])

    const handleStartGame = () => {
        setGameStarted(true)
        setGameStartTime(new Date())
    }

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
        setGameOverTime(new Date())
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

    const convertMilliseconds = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
    };

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
            <Row className='GameTitle'>
                <Col sm={24}>
                    <h1>
                        Fantasy Footbordle 24
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
                                    {convertMilliseconds(GameOverTime - GameStartTime)}
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
                                    Essentially it's wordle, You have to get three right. They are all NFL top 100 Fantasy Football Players.
                                </div>
                                <div className='GameRulesFont'>
                                    You can only submit if you have the right number of letters.
                                </div>
                            </Col>
                        </Row>

                        {
                            GameStarted
                                ?
                                <>
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
                                :
                                <ButtonToolbar style={{ width: '100%', textAlign: 'center', margin: 'auto', marginTop: '15px', height: '100%', alignContent: 'center' }}>
                                    <Button
                                        style={{ fontSize: '25px', padding: '10px 15px 10px 15px', backgroundColor: 'transparent', border: '2px solid green', color: 'green', borderRadius: '5px', cursor: 'pointer' }}
                                        onClick={() => handleStartGame()}
                                    >
                                        Start
                                    </Button>
                                </ButtonToolbar>
                        }


                    </>
            }
        </Grid>
    )
};

export default Footbordle24;
