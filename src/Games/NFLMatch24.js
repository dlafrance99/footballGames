import '../App.css';
import { useEffect, useState } from 'react';
import { Grid, Row, Col, Input, Button, ButtonToolbar } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import axios from 'axios'

import NFLPlayerList24 from '../NFLPlayerList24';

const NFLMatch24 = () => {
    const [GameOver, setGameOver] = useState(false)
    const [GameRound, setGameRound] = useState(0)
    const [GameData, setGameData] = useState([])
    const [Selected, setSelected] = useState([])
    const [Solved, setSolved] = useState([])
    const [StartTime, setStartTime] = useState()
    const [EndTime, setEndTime] = useState()

    const TEList = NFLPlayerList24.filter(player => player.Position === 'TE')
    const QBList = NFLPlayerList24.filter(player => player.Position === 'QB')
    const RBList = NFLPlayerList24.filter(player => player.Position === 'RB')
    const WRList = NFLPlayerList24.filter(player => player.Position === 'WR')

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleSelection = (index, url) => {
        if (Selected.length === 2) {
            return null
        }
        let newSelection = []
        for (let i = 0; i < Selected.length; i++) {
            newSelection.push(Selected[i])
        }
        newSelection.push({ index, url })
        setSelected(newSelection)

        if (newSelection.length === 2) {
            if (newSelection[0].url === newSelection[1].url) {
                let newSolved = []
                for (let j = 0; j < Solved.length; j++) {
                    newSolved.push(Solved[j])
                }
                newSolved.push(url)
                setSolved(newSolved)
                setSelected([])
                if (newSolved.length === GameData.length / 2) {
                    if (GameRound + 1 === 4) {
                        setEndTime(new Date())
                        setGameOver(true)
                    } else {
                        setGameRound(GameRound + 1)
                    }
                    setSelected([])
                    setSolved([])
                }
            } else {
                setTimeout(() => {
                    setSelected([])
                }, "1000");
            }
        }

    }

    useEffect(() => {
        setStartTime(new Date())        
    }, [])

    useEffect(() => {
        updateData()
    }, [GameRound])

    const updateData = () => {        
        let data = []
        switch (GameRound) {
            case 0:
                data = NFLPlayerList24.filter(player => player.Position === 'TE')
                break
            case 1:
                data = NFLPlayerList24.filter(player => player.Position === 'QB')
                break
            case 2:
                data = NFLPlayerList24.filter(player => player.Position === 'RB')
                break
            case 3:
                data = NFLPlayerList24.filter(player => player.Position === 'WR')
                break
        }
        data = shuffle(data)
        data = data.splice(0, 10)

        data = data.concat(data)
        data = shuffle(data)        
        setGameData(data)
    }

    const showGame = () => {
        let grid = []
        let CurrentSelected = Selected.map((choice) => choice.index)
        

        for (let i = 0; i < GameData.length; i += 5) {
            grid.push(
                <div key={i} style={{ width: '100%', flexDirection: 'row', display: 'flex' }}>
                    {
                        GameData[i]
                            ?
                            <>
                                {
                                    CurrentSelected.includes(i) || Solved.includes(GameData[i].imgUrl)
                                        ?
                                        <div key={i} style={{ flex: 1, height: '10vw', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={GameData[i].imgUrl}
                                                style={{ objectFit: 'contain' }}
                                                height='100%'
                                                width='100%'
                                            />
                                        </div>
                                        :
                                        GameData[i].imgUrl === ''
                                            ?

                                            <div key={i} onClick={() => handleSelection(i, GameData[i].imgUrl)} style={{ flex: 1, height: '10vw', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                                <h1 style={{ fontFamily: 'Luminari, fantasy', letterSpacing: '5px' }}>
                                                    {GameData[i].First} {GameData[i].Last}
                                                </h1>
                                            </div>
                                            :
                                            <div key={i} onClick={() => handleSelection(i, GameData[i].imgUrl)} style={{ flex: 1, height: '10vw', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                                <h1 style={{ fontFamily: 'Luminari, fantasy', letterSpacing: '5px' }}>
                                                    Fantasies
                                                </h1>
                                            </div>
                                }

                            </>
                            :
                            <div key={i + 3} style={{ flex: 1, height: '10vw', textAlign: 'center', verticalAlign: 'middle', margin: '15px', display: 'flex', alignItems: 'center' }}>

                            </div>
                    }

                    {
                        GameData[i + 1]
                            ?
                            <>
                                {
                                    CurrentSelected.includes(i + 1) || Solved.includes(GameData[i + 1].imgUrl)
                                        ?
                                        <div key={i + 1} style={{ flex: 1, height: '10vw', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={GameData[i + 1].imgUrl}
                                                style={{ objectFit: 'contain' }}
                                                height='100%'
                                                width='100%'
                                            />
                                        </div>
                                        :
                                        GameData[i + 1].imgUrl === ''
                                            ?
                                            <div key={i} onClick={() => handleSelection(i, GameData[i + 1].imgUrl)} style={{ flex: 1, height: '10vw', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                                <h1 style={{ fontFamily: 'Luminari, fantasy', letterSpacing: '5px' }}>
                                                    {GameData[i + 1].First} {GameData[i + 1].Last}
                                                </h1>
                                            </div>
                                            :
                                            <div key={i + 1} onClick={() => handleSelection(i + 1, GameData[i + 1].imgUrl)} style={{ flex: 1, height: '10vw', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                                <h1 style={{ fontFamily: 'Luminari, fantasy', letterSpacing: '5px' }}>
                                                    Fantasies
                                                </h1>
                                            </div>
                                }
                            </>
                            :
                            <div key={i + 3} style={{ flex: 1, height: '10vw', textAlign: 'center', verticalAlign: 'middle', margin: '15px', display: 'flex', alignItems: 'center' }}>

                            </div>
                    }

                    {
                        GameData[i + 2]
                            ?
                            <>
                                {
                                    CurrentSelected.includes(i + 2) || Solved.includes(GameData[i + 2].imgUrl)
                                        ?
                                        <div key={i + 2} style={{ flex: 1, height: '10vw', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={GameData[i + 2].imgUrl}
                                                style={{ objectFit: 'contain' }}
                                                height='100%'
                                                width='100%'
                                            />
                                        </div>
                                        :
                                        GameData[i + 2].imgUrl === ''
                                            ?
                                            <div key={i} onClick={() => handleSelection(i, GameData[i + 2].imgUrl)} style={{ flex: 1, height: '10vw', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                                <h1 style={{ fontFamily: 'Luminari, fantasy', letterSpacing: '5px' }}>
                                                    {GameData[i + 2].First} {GameData[i + 2].Last}
                                                </h1>
                                            </div>
                                            :
                                            <div key={i + 2} onClick={() => handleSelection(i + 2, GameData[i + 2].imgUrl)} style={{ flex: 1, height: '10vw', justifyContent: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                                <h1 style={{ fontFamily: 'Luminari, fantasy', letterSpacing: '5px' }}>
                                                    Fantasies
                                                </h1>
                                            </div>
                                }
                            </>
                            :
                            <div key={i + 2} style={{ flex: 1, height: '10vw', textAlign: 'center', verticalAlign: 'middle', margin: '15px', display: 'flex', alignItems: 'center' }}>

                            </div>
                    }

                    {
                        GameData[i + 3]
                            ?
                            <>
                                {
                                    CurrentSelected.includes(i + 3) || Solved.includes(GameData[i + 3].imgUrl)
                                        ?
                                        <div key={i + 3} style={{ flex: 1, height: '10vw', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={GameData[i + 3].imgUrl}
                                                style={{ objectFit: 'contain' }}
                                                height='100%'
                                                width='100%'
                                            />
                                        </div>
                                        :
                                        GameData[i + 3].imgUrl === ''
                                            ?
                                            <div key={i} onClick={() => handleSelection(i, GameData[i + 3].imgUrl)} style={{ flex: 1, height: '10vw', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                                <h1 style={{ fontFamily: 'Luminari, fantasy', letterSpacing: '5px' }}>
                                                    {GameData[i + 3].First} {GameData[i + 3].Last}
                                                </h1>
                                            </div>
                                            :
                                            <div key={i + 3} onClick={() => handleSelection(i + 3, GameData[i + 3].imgUrl)} style={{ flex: 1, height: '10vw', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                                <h1 style={{ fontFamily: 'Luminari, fantasy', letterSpacing: '5px' }}>
                                                    Fantasies
                                                </h1>
                                            </div>
                                }
                            </>
                            :
                            <div key={i + 3} style={{ flex: 1, height: '10vw', textAlign: 'center', verticalAlign: 'middle', margin: '15px', display: 'flex', alignItems: 'center' }}>

                            </div>
                    }

                    {
                        GameData[i + 4]
                            ?
                            <>
                                {
                                    CurrentSelected.includes(i + 4) || Solved.includes(GameData[i + 4].imgUrl)
                                        ?
                                        <div key={i + 4} style={{ flex: 1, height: '10vw', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={GameData[i + 4].imgUrl}
                                                style={{ objectFit: 'contain' }}
                                                height='100%'
                                                width='100%'
                                            />
                                        </div>
                                        :
                                        GameData[i + 4].imgUrl === ''
                                            ?
                                            <div key={i} onClick={() => handleSelection(i, GameData[i + 4].imgUrl)} style={{ flex: 1, height: '10vw', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                                <h1 style={{ fontFamily: 'Luminari, fantasy', letterSpacing: '5px' }}>
                                                    {GameData[i + 4].First} {GameData[i + 4].Last}
                                                </h1>
                                            </div>
                                            :
                                            <div key={i + 4} onClick={() => handleSelection(i + 4, GameData[i + 4].imgUrl)} style={{ flex: 1, height: '10vw', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', border: '1px solid white', margin: '15px', display: 'flex', alignItems: 'center' }}>
                                                <h1 style={{ fontFamily: 'Luminari, fantasy', letterSpacing: '5px' }}>
                                                    Fantasies
                                                </h1>
                                            </div>
                                }
                            </>
                            :
                            <div key={i + 4} style={{ flex: 1, height: '10vw', textAlign: 'center', verticalAlign: 'middle', margin: '15px', display: 'flex', alignItems: 'center' }}>

                            </div>
                    }
                </div>
            )
        }
        return grid
    }

    const showGameRound = () => {
        switch (GameRound) {
            case 0:
                return `TE (${GameData.length / 2})`
            case 1:
                return `QB (${GameData.length / 2})`
            case 2:
                return `RB (${GameData.length / 2})`
            case 3:
                return `WR (${GameData.length / 2})`
        }
    }

    const ShowGameOverTime = () => {
        let GameStartTime = StartTime
        let GameEndTime = EndTime
        let GameDuration = Math.abs(GameEndTime - GameStartTime)

        GameStartTime = `Start Time:  ${GameStartTime.getHours() > 12 ? GameStartTime.getHours() - 12 : GameStartTime.getHours()}:${(GameStartTime.getMinutes() < 10 ? '0' : '') + GameStartTime.getMinutes()}:${(GameStartTime.getSeconds() < 10 ? '0' : '') + GameStartTime.getSeconds()}.${GameStartTime.getMilliseconds()} ${GameStartTime.getHours() > 12 ? 'PM' : 'AM'}`
        GameEndTime = `Game Over: ${GameEndTime.getHours() > 12 ? GameEndTime.getHours() - 12 : GameEndTime.getHours()}:${(GameEndTime.getMinutes() < 10 ? '0' : '') + GameEndTime.getMinutes()}:${(GameEndTime.getSeconds() < 10 ? '0' : '') + GameEndTime.getSeconds()} ${GameEndTime.getHours() > 12 ? 'PM' : 'AM'}`
        GameDuration = new Date(GameDuration).toISOString().slice(11, 23)
        GameDuration = `Time: ${GameDuration} `
        return (
            <>                
                <h2 style={{ color: 'white' }}>
                    {GameDuration}
                </h2>
            </>
        )
    }

    return (
        <Grid className='Wrapper'>
            <Row className='GameTitle'>
                <Col sm={24}>
                    <h1>
                        Fantasy NFL Match 24
                    </h1>
                </Col>
            </Row>

            {
                GameOver
                    ?
                    <>
                        <Row className='GameTitle'>
                            <Col sm={24}>
                                <h1 style={{ color: 'white' }}>
                                    Game Over
                                </h1>
                            </Col>
                        </Row>

                        <Row className='GameTitle'>
                            <Col sm={24}>
                                {ShowGameOverTime()}
                            </Col>
                        </Row>


                    </>
                    :
                    <>
                        <Row className='GameRules'>
                            <Col sm={24}>
                                <div className='GameRulesFont'>
                                    Classic matching game. Go through all the positions until you're done with the game and get to the game over screen
                                </div>
                            </Col>
                        </Row>

                        <Row style={{ margin: '5px' }}>
                            <Col sm={24}>
                                <h1 style={{ fontFamily: 'Luminari, fantasy', letterSpacing: '5px' }}>
                                    {showGameRound()}
                                </h1>
                            </Col>
                        </Row>

                        {showGame()}

                    </>
            }
        </Grid>
    )
};

export default NFLMatch24;
