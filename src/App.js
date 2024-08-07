import './App.css';
import { useEffect, useState } from 'react';
import { Grid, Row, Col, Input, Button, ButtonToolbar } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

import GameSelectionScreen from './Games/GameSelectionScreen';
import Footbordle23 from './Games/Footbordle23';
import Footbordle24 from './Games/Footbordle24';
import UpAndDownTheNFL from './Games/UpAndDownTheNFL';
import NFLMatch23 from './Games/NFLMatch23'
import FindThunder from './Games/FindThunder'
import Leaderboard from './Games/Leaderboard'

const App = () => {
  const [LoggedIn, setLoggedIn] = useState(false)
  const [Password, setPassword] = useState('')
  const [ErrorMessage, setErrorMessage] = useState('')

  const [GameSelection, setGameSelection] = useState('Game Selection')
  const [NavHover, setNavHover] = useState('')

  const handlePassword = () => {
    if (Password.toLowerCase().trim() === 'bestcommish3v3r') {
      setLoggedIn(true)
    } else {
      setErrorMessage('Wrong Password')
    }
  }

  return (
    <Grid className='Wrapper'>
      <Row className='Header'>
        <Col sm={24}>
          <h1>
            Fantasy Football 5.0
          </h1>
        </Col>
      </Row>
      <Row>
        <Col sm={24} className='Navigation' style={{ display: 'flex', justifyContent: 'end' }}>
          <div
            onClick={() => setGameSelection('Game Selection')}
            onMouseEnter={() => setNavHover('Game Selection')}
            onMouseLeave={() => setNavHover('')}
            style={{ height: '40px', cursor: 'pointer', paddingRight: '5px', paddingLeft: '5px', alignContent: 'center', backgroundColor: NavHover === 'Game Selection' ? 'black' : 'gray' }}
          >
            <h4 style={{ color: 'white', marginTop: 0, marginBottom: 0 }}>
              Game Selection
            </h4>
          </div>

          <div
            onClick={() => setGameSelection('Leaderboard')}
            onMouseEnter={() => setNavHover('Leaderboard')}
            onMouseLeave={() => setNavHover('')}
            style={{ height: '40px', cursor: 'pointer', paddingRight: '5px', paddingLeft: '5px', alignContent: 'center', backgroundColor: NavHover === 'Leaderboard' ? 'black' : 'gray' }}
          >
            <h4 style={{ color: 'white', marginTop: 0, marginBottom: 0 }}>
              Leaderboard
            </h4>
          </div>
        </Col>
      </Row>

      {
        GameSelection === 'Game Selection' && (
          <GameSelectionScreen
            handleGameSelection={(value) => setGameSelection(value)}
          />
        )
      }

      {
        GameSelection === 'Leaderboard' && (
          <Leaderboard />
        )
      }

      {
        GameSelection === 'Wheres Thunder' && (
          <FindThunder />
        )
      }

      {
        GameSelection === 'Footbordle24' && (
          <Footbordle24 />
        )
      }

      {
        GameSelection === 'Up And Down The NFL' && (
          <UpAndDownTheNFL />
        )
      }

      {
        GameSelection === 'NFLMatch23' && (
          <NFLMatch23 />
        )
      }

      {
        GameSelection === 'Footbordle23' && (
          <Footbordle23 />
        )
      }
      {/* {
        LoggedIn
          ?
          :
          <>
            <Row style={{ marginTop: '30vh' }}>
              <h1 className='GameGuesses' style={{ color: 'white' }}>
                Password
              </h1>
              {
                ErrorMessage
                  ?
                  <h3 className='GameGuesses' style={{ color: 'red' }}>
                    {ErrorMessage}
                  </h3>
                  :
                  null
              }
              <Col sm={24} className='GameGuesses' >
                <Input
                  style={{ color: 'black', width: '50%', backgroundColor: 'white', border: '1px solid white', fontSize: '50px' }}
                  onPressEnter={() => handlePassword()}
                  value={Password}
                  onChange={(value) => setPassword(value.toUpperCase())}
                />

                <ButtonToolbar style={{ width: '50%', margin: 'auto', marginTop: '15px' }}>
                  <Button
                    style={{ fontSize: '25px', padding: '10px 15px 10px 15px', backgroundColor: 'transparent', border: '2px solid green', color: 'green', borderRadius: '5px' }}
                    onClick={() => handlePassword()}
                  >
                    Enter
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </>
      } */}
    </Grid>
  )
};

export default App;
