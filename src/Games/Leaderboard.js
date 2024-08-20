import '../App.css';
import { useEffect, useState, useRef } from 'react';
import { Grid, Row, Col, Button, ButtonToolbar } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import NFLTeamList from '../NFLTeamList';

const Leaderboard = () => {
    const [Leaderboard, setLeaderboard] = useState([
        {
            Name: 'Devon LaFrance',
            Score: 0
        },
        {
            Name: 'Katie Schmidt',
            Score: 1
        },
        {
            Name: 'Räley Gonzalez',
            Score: 0
        },
        {
            Name: 'Jesse Ireland',
            Score: 0
        },
        {
            Name: 'Nick LaCombe',
            Score: -1
        },
        {
            Name: 'Kyle LaCombe',
            Score: 0
        },
        {
            Name: 'Tyler Smith',
            Score: 0
        },
        {
            Name: 'Sabrina LaCombe',
            Score: 0
        },
    ])

    return (
        <Grid>
            <Row className='GameTitle'>
                <Col sm={24}>
                    <h1>
                        Draft Order Leaderboard
                    </h1>
                </Col>
            </Row>

            <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>

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

        </Grid>
    )
};

export default Leaderboard;