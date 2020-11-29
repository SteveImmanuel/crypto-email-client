import React from 'react';
import clsx from 'clsx';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Typography, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
  }
});


export default function Read(props) {
  const classes = styles();

  return (
    <div className={classes.container}>
      <Typography gutterBottom variant='h5'>Email Subject 1</Typography>
      <Card>
        <CardContent>
          <table>
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

  );
}
