import { connect } from 'react-redux';

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import meregeStyles from '../utils/meregeStyles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

//Icons
import People from '@material-ui/icons/People';
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';

//Styles
import { topMenu } from '../assets/jss/topMenu';
import { common } from '../assets/jss/common';

//Actions
import logOut from '../actions/logOut';

class TopMenu extends Component {
    render() {
        const { classes, children, userName, userEmail, logOut } = this.props;

        return (
            <div>
                <Paper className={classes.topMenu}>
                    <Paper className={classNames(classes.topMenuHead, classes.flex, classes.alignItemsCenter)}>
                        {/* Avatar component ↓↓↓ */}
                                          {children}
                        {/* Avatar component ↑↑↑ */}
                        <div className={classes.userInfo}>
                            <Typography variant="subheading" className={classes.userName}>
                                {userName}
                            </Typography>
                            <Typography className={classes.userEmail}>
                                {userEmail}
                            </Typography>
                        </div>
                    </Paper>
                    <MenuList>
                        <MenuItem className={classes.menuItem}>
                            <ListItemIcon className={classes.icon}>
                                <People />
                            </ListItemIcon>
                            <ListItemText inset primary="Друзья" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                            <ListItemIcon className={classes.icon}>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText inset primary="Настройки" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem} onClick={logOut}>
                            <ListItemIcon className={classes.icon}>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText inset primary="Выйти" />
                        </MenuItem>
                    </MenuList>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    appInterface: state.appInterface,
	auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    logOut: () => {
        dispatch(logOut());
    }
});

TopMenu = withStyles(meregeStyles([topMenu, common]))(TopMenu);
export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);