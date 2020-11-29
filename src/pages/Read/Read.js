import React from 'react';
import clsx from 'clsx';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Typography, Card, CardContent, AppBar, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = makeStyles({
  list: {
    minWidth: 250,
    width: '100%',
  },
  container: {
    margin: 15
  },
  subject: {
    marginBottom: 10
  },
  detailKey: {
    color: fade('rgba(0, 0, 0)', 0.54),
    paddingRight: 10
  },
  content: {
    marginTop: 10
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 5,
  },
});


export default function Read(props) {
  const classes = styles();
  
  const back = () => {
    props.history.goBack();
  }

  return (
    <React.Fragment>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color='inherit'
            onClick={back}
          >
            <KeyboardBackspaceIcon />
          </IconButton>

          <Typography className={classes.grow} variant='h6'>View</Typography>

          <IconButton color='inherit'>
            <DeleteIcon />
          </IconButton>
          <IconButton color='inherit'>
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Typography gutterBottom variant='h5'>Email Subject 1</Typography>
        <Card>
          <CardContent>
            <table>
              <tbody>
                <tr>
                  <td className={classes.detailKey}>From</td>
                  <td >sender@mail.co</td>
                </tr>
                <tr>
                  <td className={classes.detailKey}>To</td>
                  <td >john.doe@gmail.com</td>
                </tr>
                <tr>
                  <td className={classes.detailKey}>Date</td>
                  <td >29 Nov 2020, 20:10</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Typography variant='body1' className={classes.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
      </Typography>
      </div>
    </React.Fragment>
  );
}
