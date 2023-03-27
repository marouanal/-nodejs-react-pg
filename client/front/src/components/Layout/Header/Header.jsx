import React from 'react'
import { AppBar, IconButton, Typography, Button, Toolbar } from '@material-ui/core'
import { useHistory } from 'react-router'
import { Menu as MenuIcon } from '@material-ui/icons'

const Header = ({ setOpen }) => {
    const history = useHistory()
    
    return (
        <AppBar >
            <Toolbar>
                <IconButton edge='start' color='#00DECE' onClick={() => setOpen(true)}>
                    <MenuIcon />
                </IconButton>
                <Typography style={{ flexGrow: 1 }}>Marouan app</Typography>
                <Button variant='text'  onClick={() => {
                    localStorage.clear()
                    history.push('/login')
                }}>Log out</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header
