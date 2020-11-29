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
      {props.emails.map((email, index) => (
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
