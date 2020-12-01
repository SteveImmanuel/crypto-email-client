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
import config from '../../config';

const styles = (theme) => {
  return {
    rightAligned: {
      textAlign: 'right',
      verticalAlign: 'top',
    },
    read: {
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
    datetime: {
      marginLeft: theme.spacing(1),
    },
  };
};

class EmailList extends React.Component {
  state = {
    isFetching: true,
    currentPage: 0,
    emails: [],
    page: 1,
  };

  refresh = () => {
    localStorage.clear();
    this.setState({ emails: [], page: 1, isFetching: true }, () => {
      this.fetchEmails();
    });
  }

  loadCache = () => {
    // console.log('loadcache')
    // console.log(this.props.type);
      const cacheEmail = JSON.parse(localStorage.getItem(this.props.type));
      const cachePage = parseInt(localStorage.getItem(`${this.props.type}Page`));

      if (cacheEmail) {
        this.setState({ isFetching: false, emails: [...this.state.emails, ...cacheEmail], page: cachePage });
        return true;
      } else {
        return false;
      }
  }

  fetchEmails = async () => {
    const result = await fetch(`${config.API_URL}/api/${this.props.type}?page=${this.state.page}`,
      {
        method: 'GET',
        credentials: 'include'
      }
    );

    if (result.redirected) {
      console.log('fail');
    } else {

      const data = await result.json();

      this.setState({ isFetching: false, emails: [...this.state.emails, ...data.data], page: this.state.page + 1 },
        () => {
          localStorage.setItem(this.props.type, JSON.stringify(this.state.emails));
          localStorage.setItem(`${this.props.type}Page`, this.state.page);
        }
      );
    }
  };

  styledTitle = (title) => {
    return (
      <Typography noWrap>
        <b>{title}</b>
      </Typography>
    );
  };

  styledDesc = (subject) => {
    return (
      <Typography variant='body2' noWrap>
        <b>{subject}</b>
      </Typography>
    );
  };

  styledDate = (datetime) => {
    const formatted = formatToTimeZone(datetime, 'D MMM', { timeZone: 'Asia/Jakarta' });
    return (
      <Typography noWrap variant='caption' className={this.props.classes.datetime}>
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
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.state.isFetching) {
      this.setState({
        isFetching: true,
      });
      this.fetchEmails();
    }
  };

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
    if (!this.loadCache()) {
        this.fetchEmails();
    }
  }
    
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.setState({ emails: [], page: 1, isFetching: true }, () => {
        if (!this.loadCache()) {
          this.fetchEmails();
        }
      });
    }
  }

  render() {
    const { classes, type } = this.props;

    const title = type.charAt(0).toUpperCase() + type.slice(1);

    return (
      <React.Fragment>
        <AppBar position='sticky'>
          <Toolbar>
            <IconButton className={classes.menuButton} color='inherit' onClick={this.props.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Typography className={classes.grow} variant='h6'>
              {title}
            </Typography>

            <IconButton color='inherit' onClick={this.refresh}>
              <RefreshIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          {this.state.emails.map((email, index) => (
            <ListItem
              button
              divider
              className={clsx({ [classes.read]: email.read })}
              key={index}
              onClick={() => this.readEmail(email.id)}
            >
              <ListItemText
                style={{ paddingRight: 12 }}
                primary={this.styledTitle(email.sender)}
                secondary={this.styledDesc(email.subject)}
              />
              <ListItemSecondaryAction className={classes.rightAligned}>
                {this.styledDate(email.date)}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Fab variant='extended' color='secondary' className={classes.fab} onClick={this.composeEmail}>
          <MailIcon className={classes.extendedIcon} />
            Compose
          </Fab>
        {this.state.isFetching && <LinearProgress />}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EmailList);
