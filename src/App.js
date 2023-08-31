import './App.css';
import { useEffect, useState } from 'react';
import { Grid, Row, Col, Input, Button, ButtonToolbar } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

import Footbordle from './Games/Footbordle';
import NFLMatch from './Games/NFLMatch'

const App = () => {

  return (
    <Grid className='Wrapper'>
      <NFLMatch />
    </Grid>
  )
};

export default App;
