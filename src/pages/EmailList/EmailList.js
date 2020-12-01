import React from 'react';
import clsx from 'clsx';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  LinearProgress,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { formatToTimeZone } from 'date-fns-timezone';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import RefreshIcon from '@material-ui/icons/Refresh';
import { NotFound } from '../NotFound';

const styles = (theme) => {
  return {
    rightAligned: {
      textAlign: 'right',
      verticalAlign: 'top',
    },
    unread: {
      color: fade('rgba(0, 0, 0)', 0.54),
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 5,
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    title: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    datetime: {
      marginLeft: theme.spacing(1),
    },
  };
};

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
    subject: 'Email Subject',
    sender: 'Sender',
    content: dummyContent,
    datetime: new Date(),
    isRead: false,
  },
  {
    subject: 'Email Subject 2',
    sender: 'Sender 2',
    content: dummyContent,
    datetime: new Date(),
    isRead: false,
  },
  {
    subject: 'Email Subject 3',
    sender: 'Sender 3',
    content: dummyContent,
    datetime: new Date(),
    isRead: true,
  },
  {
    subject: 'Email Subject 4',
    sender: 'Sender 4',
    content: dummyContent,
    datetime: new Date(),
    isRead: true,
  },
  {
    subject: 'Email Subject',
    sender: 'Sender',
    content: dummyContent,
    datetime: new Date(),
    isRead: false,
  },
  {
    subject: 'Email Subject 2',
    sender: 'Sender 2',
    content: dummyContent,
    datetime: new Date(),
    isRead: false,
  },
  {
    subject: 'Email Subject 3',
    sender: 'Sender 3',
    content: dummyContent,
    datetime: new Date(),
    isRead: true,
  },
  {
    subject: 'Email Subject',
    sender: 'Sender',
    content: dummyContent,
    datetime: new Date(),
    isRead: false,
  },
  {
    subject: 'Email Subject 2',
    sender: 'Sender 2',
    content: dummyContent,
    datetime: new Date(),
    isRead: false,
  },
  {
    subject: 'Email Subject 3',
    sender: 'Sender 3',
    content: dummyContent,
    datetime: new Date(),
    isRead: true,
  },
  {
    subject: 'Email Subject',
    sender: 'Sender',
    content: dummyContent,
    datetime: new Date(),
    isRead: false,
  },
  {
    subject: 'Email Subject 2',
    sender: 'Sender 2',
    content: dummyContent,
    datetime: new Date(),
    isRead: false,
  },
  {
    subject: 'Email Subject 3',
    sender: 'Sender 3',
    content: dummyContent,
    datetime: new Date(),
    isRead: true,
  },
  {
    subject: 'Email Subject 4',
    sender: 'Sender 4',
    content: dummyContent,
    datetime: new Date(),
    isRead: true,
  },
  {
    subject: 'Email Subject',
    sender: 'Sender',
    content: dummyContent,
    datetime: new Date(),
    isRead: false,
  },
  {
    subject: 'Email Subject 2',
    sender: 'Sender 2',
    content: dummyContent,
    datetime: new Date(),
    isRead: false,
  },
  {
    subject: 'Email Subject 3',
    sender: 'Sender 3',
    content: dummyContent,
    datetime: new Date(),
    isRead: true,
  },
  {
    subject: 'Email Subject',
    sender: 'Sender',
    content: dummyContent,
    datetime: new Date(),
    isRead: false,
  },
  {
    subject: 'Email Subject 2',
    sender: 'Sender 2',
    content: dummyContent,
    datetime: new Date(),
    isRead: false,
  },
  {
    subject: 'Email Subject 3',
    sender: 'Sender 3',
    content: dummyContent,
    datetime: new Date(),
    isRead: true,
  },
];

const validType = ['inbox', 'sent'];

class EmailList extends React.Component {
  state = {
    isFetching: true,
    currentPage: 0,
    emails: [],
    page: 1,
  };

  // fetchEmails = async () => {
  //   setTimeout(async () => {
  //     const result = await fetch(`https://api.cryptmail.ml/api/mail?page=${this.state.page}`);
  //     const data = await result.json();
  //     this.setState({ isFetching: false, emails: [...this.state.emails, ...data], page: this.state.page + 1 });
  //   }, 5000);
  // };

  fetchEmails = () => {
    setTimeout(() => {
      this.setState({ isFetching: false, emails: [...this.state.emails, ...dummyData], page: this.state.page + 1 });
    }, 1000);
  };

  toggleDrawer = (open) => (event) => {
    this.setState({ isDrawerOpen: open });
  };

  styledTitle = (title) => {
    return (
      <Typography className={this.props.classes.title}>
        <b>{title}</b>
      </Typography>
    );
  };

  styledDesc = (sender, content) => {
    return (
      <Typography variant="body2" noWrap>
        <b>{sender}</b> - {content}
      </Typography>
    );
  };

  styledDate = (datetime) => {
    const formatted = formatToTimeZone(datetime, 'D MMM', { timeZone: 'Asia/Jakarta' });
    return (
      <Typography noWrap variant="caption" className={this.props.classes.datetime}>
        {formatted}
      </Typography>
    );
  };

  readEmail = (id) => {
    this.props.history.push(`/app/read/${id}`);
  };

  composeEmail = () => {
    this.props.history.push('/app/compose');
  };

  handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (Math.ceil(windowBottom) >= docHeight && !this.state.isFetching) {
      this.setState({
        isFetching: true,
      });
      this.fetchEmails();
    }
  };

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
    this.fetchEmails();
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { classes } = this.props;
    const { type } = this.props.match.params;

    const title = type.charAt(0).toUpperCase() + type.slice(1);

    if (validType.includes(type)) {
      return (
        <React.Fragment>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" onClick={this.props.toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>

              <Typography className={classes.grow} variant="h6">
                {title}
              </Typography>

              <IconButton color="inherit">
                <RefreshIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List>
            {this.state.emails.map((email, index) => (
              <ListItem
                button
                divider
                className={clsx({ [classes.unread]: email.isRead })}
                key={index}
                onClick={() => this.readEmail(1)}
              >
                <ListItemText
                  // primary={this.styledTitle(email.subject, email.datetime)}
                  primary={this.styledTitle(email.subject, new Date())}
                  // secondary={this.styledDesc(email.sender, email.message)}
                  secondary={this.styledDesc(email.sender, email.content)}
                />
                <ListItemSecondaryAction className={classes.rightAligned}>
                  {this.styledDate(email.datetime)}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Fab variant="extended" color="secondary" className={classes.fab} onClick={this.composeEmail}>
            <MailIcon className={classes.extendedIcon} />
            Compose
          </Fab>
          {this.state.isFetching && <LinearProgress />}
        </React.Fragment>
      );
    } else {
      return <NotFound />;
    }
  }
}

export default withStyles(styles)(EmailList);
