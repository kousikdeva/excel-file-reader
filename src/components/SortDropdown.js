import { Menu, MenuItem } from '@mui/material'
import React from 'react'

const SortDropdown = ({ menus = [], anchorEl, setAnchorEl, onClick }) => {
    const open = Boolean(anchorEl)

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                {menus?.map((menu, index) => <MenuItem key={index} onClick={() => onClick(menu)}>{menu}</MenuItem>)}
            </Menu>
        </>
    )
}

export default SortDropdown