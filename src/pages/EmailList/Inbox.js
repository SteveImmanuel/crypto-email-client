import React from 'react';
import clsx from 'clsx';

import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import { formatToTimeZone } from 'date-fns-timezone';

const styles = makeStyles({
  rightAligned: {
    textAlign: 'right',
    verticalAlign: 'top'
  },
  unread: {
    color: fade('rgba(0, 0, 0)', 0.54)
  },

});

const dummyContent = `
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
`;

const dummyData = [
  {
    subject: "Email Subject",
    sender: "Sender",
    content: dummyContent,
    datetime: new Date(),
    isRead: false
  },
  {
    subject: "Email Subject 2",
    sender: "Sender 2",
    content: dummyContent,
    datetime: new Date(),
    isRead: false
  },
  {
    subject: "Email Subject 3",
    sender: "Sender 3",
    content: dummyContent,
    datetime: new Date(),
    isRead: true
  },
  {
    subject: "Email Subject 4",
    sender: "Sender 4",
    content: dummyContent,
    datetime: new Date(),
    isRead: true
  }
]

export default function Inbox(props) {
  const classes = styles();

  const styledTitle = (title) => {
    return (
      <Typography>
        <b>{title}</b>
      </Typography>
    );
  }

  const styledDesc = (sender, content) => {
    return (
      <Typography
        variant='body2'
        noWrap>
        <b>{sender}</b> - {content}
      </Typography>
    );
  }

  return (
    <List>
      {dummyData.map((email, index) => (
        <ListItem button divider className={clsx({ [classes.unread]: email.isRead })} key={index}>
          <ListItemText
            disableTypograhpy
            primary={styledTitle(email.subject)}
            secondary={styledDesc(email.sender, email.content)}
          />
          <ListItemText
            class={classes.rightAligned}
            secondary={formatToTimeZone(email.datetime, 'D MMM', { timeZone: 'Asia/Jakarta' })}
          />
        </ListItem>

      ))}
    </List>
  );
}
