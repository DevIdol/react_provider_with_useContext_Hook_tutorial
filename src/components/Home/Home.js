import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {
  const context = useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick = {context.onLogout}>Check Out</Button>
    </Card>
  );
};

export default Home;
