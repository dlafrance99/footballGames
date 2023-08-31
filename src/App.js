import './App.css';
import { useEffect, useState } from 'react';
import { Grid, Row, Col, Input, Button, ButtonToolbar } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

import Footbordle from './Games/Footbordle';
import NFLMatch from './Games/NFLMatch'

const App = () => {
  const [LoggedIn, setLoggedIn] = useState(false)
  const [Password, setPassword] = useState('')
  const [ErrorMessage, setErrorMessage] = useState('')

  const handlePassword = () => {
    if (Password.toLowerCase().trim() === 'respectthecommish') {
      setLoggedIn(true)
    } else {
      setErrorMessage('Wrong Password')
    }
  }

  return (
    <Grid className='Wrapper'>
      {
        LoggedIn
          ?
          <NFLMatch />
          :
          <>
            <Row style={{ marginTop: '30vh' }}>
              <h1 className='Guesses' style={{ color: 'white' }}>
                Password
              </h1>
              {
                ErrorMessage
                  ?
                  <h3 className='Guesses' style={{ color: 'red' }}>
                    {ErrorMessage}
                  </h3>
                  :
                  null
              }
              <Col sm={24} className='Guesses' >
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
      }
    </Grid>
  )
};

export default App;
