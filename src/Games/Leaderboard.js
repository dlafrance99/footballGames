import '../App.css';
import { useEffect, useState, useRef } from 'react';
import { Grid, Row, Col, Button, ButtonToolbar } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import NFLTeamList from '../NFLTeamList';

import GameCard from './Components/GameCard';

import ManagerScore from '../ManagerScores';

const Leaderboard = () => {
    const Leaderboard = ManagerScore

    const [SelectedGame, setSelectedGame] = useState('')

    const convertMilliseconds = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);

        return `${minutes !== 0 ? String(minutes).padStart(2, '0') + ':' : ''}${String(sec).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
    };

    return (
        <Grid>
            <Row className='GameTitle'>
                <Col sm={24}>
                    <h1>
                        Draft Order Leaderboard
                    </h1>
                </Col>
            </Row>

            <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>

                <div style={{ width: '25%' }}>
                    {
                        Leaderboard
                            .sort((a, b) => {
                                if (a.Score === b.Score) {
                                    return a.Name.localeCompare(b.Name);
                                }
                                return b.Score - a.Score;
                            })
                            .map((Leader, i, sortedArray) => {
                                // Determine the rank
                                let rank = 1;
                                if (i > 0 && sortedArray[i].Score === sortedArray[i - 1].Score) {
                                    rank = sortedArray[i - 1].rank;
                                } else if (i > 0) {
                                    rank = sortedArray[i - 1].rank + 1;
                                }
                                sortedArray[i].rank = rank;
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid white', paddingBottom: '5px', paddingTop: '5px' }}>
                                        <h3 style={{ flex: 1 }}>
                                            {rank}
                                        </h3>
                                        <h3 style={{ flex: 3 }}>
                                            {Leader.Name}
                                        </h3>
                                        <h3 style={{ flex: 1 }}>
                                            {Leader.Score}
                                        </h3>
                                    </div>
                                )
                            })
                    }


                </div>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <h2 style={{ textDecorationLine: 'underline' }}>
                    Scores
                </h2>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col
                    style={{ width: '10%', marginLeft: '5px', marginRight: '5px', cursor: 'pointer' }}
                    onClick={() => setSelectedGame('Money Money')}
                >
                    <GameCard
                        Title='Money Money'

                    />
                </Col>

                <Col
                    style={{ width: '10%', marginLeft: '5px', marginRight: '5px', cursor: 'pointer' }}
                    onClick={() => setSelectedGame('Miscellaneous')}
                >
                    <GameCard
                        Title='Miscellaneous'

                    />
                </Col>

                <Col
                    style={{ width: '10%', marginLeft: '5px', marginRight: '5px', cursor: 'pointer' }}
                    onClick={() => setSelectedGame('Wheres Thunder')}
                >
                    <GameCard
                        Title='Wheres Thunder'

                    />
                </Col>

                <Col
                    style={{ width: '10%', marginLeft: '5px', marginRight: '5px', cursor: 'pointer' }}
                    onClick={() => setSelectedGame('Footbordle24')}
                >
                    <GameCard
                        Title='Footbordle24'

                    />
                </Col>


                <Col
                    style={{ width: '10%', marginLeft: '5px', marginRight: '5px', cursor: 'pointer' }}
                    onClick={() => setSelectedGame('Up And Down The NFL')}
                >
                    <GameCard
                        Title='Up And Down The NFL'

                    />
                </Col>
                {/*
                <Col
                    style={{ width: '10%', marginLeft: '5px', marginRight: '5px', cursor: 'pointer' }}
                    onClick={() => console.log('hit this')}
                >
                    <GameCard
                        Title='NFLMatch24'

                    />
                </Col>

                <Col
                    style={{ width: '10%', marginLeft: '5px', marginRight: '5px', cursor: 'pointer' }}
                    onClick={() => console.log('hit this')}
                >
                    <GameCard
                        Title='Horse Race'
                    />
                </Col> */}
            </Row >

            {
                SelectedGame !== '' && (
                    <>
                        <h3>
                            {SelectedGame}
                        </h3>
                        <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10vh' }}>
                            <div style={{ width: '25%' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid white', paddingBottom: '5px', paddingTop: '5px' }}>
                                    <h3 style={{ flex: 1 }}>
                                        Rank
                                    </h3>
                                    <h3 style={{ flex: 3 }}>
                                        Name
                                    </h3>
                                    <h3 style={{ flex: 1 }}>
                                        Score
                                    </h3>
                                    <h3 style={{ flex: 1 }}>
                                        Points
                                    </h3>
                                </div>
                                {
                                    Leaderboard
                                        .sort((a, b) => {
                                            if (SelectedGame === 'Money Money') {
                                                if (a.MoneyMoney === b.MoneyMoney) {
                                                    return a.Name.localeCompare(b.Name);
                                                }
                                                return a.MoneyMoney - b.MoneyMoney;
                                            }
                                            else if (SelectedGame === 'Miscellaneous') {
                                                if (a.Miscellaneous === b.Miscellaneous) {
                                                    return a.Name.localeCompare(b.Name);
                                                }
                                                return b.Miscellaneous - a.Miscellaneous;
                                            }
                                            else if (SelectedGame === 'Wheres Thunder') {
                                                if (a.FindThunderTime === b.FindThunderTime) {
                                                    return a.Name.localeCompare(b.Name);
                                                }
                                                return a.FindThunderTime - b.FindThunderTime;
                                            }
                                            else if (SelectedGame === 'Footbordle24') {
                                                if (a.FootbordleTime === b.FootbordleTime) {
                                                    return a.Name.localeCompare(b.Name);
                                                }
                                                return a.FootbordleTime - b.FootbordleTime;
                                            }
                                            else if (SelectedGame === 'Up And Down The NFL') {
                                                if (a.UpAndDownTHeNFLTime === b.UpAndDownTHeNFLTime) {
                                                    return a.Name.localeCompare(b.Name);
                                                }
                                                return a.UpAndDownTHeNFLTime - b.UpAndDownTHeNFLTime;
                                            }

                                        })
                                        .map((Leader, i, sortedArray) => {
                                            let rank = 1;
                                            if (SelectedGame === 'Money Money') {
                                                if (i > 0 && sortedArray[i].MoneyMoney === sortedArray[i - 1].MoneyMoney) {
                                                    rank = sortedArray[i - 1].rank;
                                                } else if (i > 0) {
                                                    rank = sortedArray[i - 1].rank + 1;
                                                }
                                                sortedArray[i].rank = rank;
                                            }
                                            else if (SelectedGame === 'Miscellaneous') {
                                                if (i > 0 && sortedArray[i].Miscellaneous === sortedArray[i - 1].Miscellaneous) {
                                                    rank = sortedArray[i - 1].rank;
                                                } else if (i > 0) {
                                                    rank = sortedArray[i - 1].rank + 1;
                                                }
                                                sortedArray[i].rank = rank;
                                            }
                                            else if (SelectedGame === 'Wheres Thunder') {
                                                if (i > 0 && sortedArray[i].FindThunderTime === sortedArray[i - 1].FindThunderTime) {
                                                    rank = sortedArray[i - 1].rank;
                                                } else if (i > 0) {
                                                    rank = sortedArray[i - 1].rank + 1;
                                                }
                                                sortedArray[i].rank = rank;
                                            }
                                            else if (SelectedGame === 'Footbordle24') {
                                                if (i > 0 && sortedArray[i].FootbordleTime === sortedArray[i - 1].FootbordleTime) {
                                                    rank = sortedArray[i - 1].rank;
                                                } else if (i > 0) {
                                                    rank = sortedArray[i - 1].rank + 1;
                                                }
                                                sortedArray[i].rank = rank;
                                            }
                                            else if (SelectedGame === 'Up And Down The NFL') {
                                                if (i > 0 && sortedArray[i].UpAndDownTHeNFLTime === sortedArray[i - 1].UpAndDownTHeNFLTime) {
                                                    rank = sortedArray[i - 1].rank;
                                                } else if (i > 0) {
                                                    rank = sortedArray[i - 1].rank + 1;
                                                }
                                                sortedArray[i].rank = rank;
                                            }

                                            const showScore = () => {
                                                if (SelectedGame === 'Money Money') {
                                                    return Leader.MoneyMoney
                                                }
                                                else if (SelectedGame === 'Wheres Thunder') {
                                                    return Leader.FindThunderTime
                                                }
                                                else if (SelectedGame === 'Miscellaneous') {
                                                    return Leader.Miscellaneous
                                                }
                                                else if (SelectedGame === 'Footbordle24') {
                                                    return convertMilliseconds(Leader.FootbordleTime)
                                                }
                                                else if (SelectedGame === 'Up And Down The NFL') {
                                                    return convertMilliseconds(Leader.UpAndDownTHeNFLTime)
                                                }
                                            }

                                            const showPoints = () => {
                                                if (SelectedGame === 'Miscellaneous') {
                                                    return Leader.Miscellaneous
                                                }
                                                if (showScore() === 0) {
                                                    return 0
                                                }
                                                if (rank === 1) {
                                                    return 8
                                                } else if (rank === 2) {
                                                    return 7
                                                } else if (rank === 3) {
                                                    return 6
                                                } else if (rank === 4) {
                                                    return 5
                                                } else if (rank === 5) {
                                                    return 4
                                                } else if (rank === 6) {
                                                    return 3
                                                } else if (rank === 7) {
                                                    return 2
                                                } else if (rank === 8) {
                                                    return 1
                                                }
                                            }
                                            return (
                                                <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid white', paddingBottom: '5px', paddingTop: '5px' }}>
                                                    <h3 style={{ flex: 1 }}>
                                                        {rank}
                                                    </h3>
                                                    <h3 style={{ flex: 3 }}>
                                                        {Leader.Name}
                                                    </h3>
                                                    <h3 style={{ flex: 1 }}>
                                                        {showScore()}
                                                    </h3>
                                                    <h3 style={{ flex: 1 }}>
                                                        {showPoints()}
                                                    </h3>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        </Row>
                    </>
                )
            }
        </Grid >
    )
};

export default Leaderboard;