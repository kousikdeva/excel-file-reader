import { Box, CardActionArea, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useSelector } from 'react-redux'

import SortDropdown from './SortDropdown'
import { removeDuplicates } from './utils/helper'
import { availability } from './utils/availableDropdowns'


const ExcelTable = ({ heading = [], content = [], setContent, documentName = '' }) => {

    const reduxState = useSelector(state => state.Reducer)
    const [anchorEl, setAnchorEl] = useState(null)
    const [menus, setMenus] = useState([])
    const [MenuIndex, setMenuIndex] = useState(0)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleOpenMenu = (event, _heading, index) => {
        const selected = availability.find(item => item.title === _heading.toLowerCase().trim()) ?? ''

        if (selected.type === 'number') {
            setMenus(['Ascending', 'Descending'])
            setAnchorEl(event.currentTarget)
            setMenuIndex(index)
        } else if (selected.type === 'text') {
            let arr = []
            reduxState.content.map(item => {
                arr = [...arr, item[index]]
            })
            setMenus(removeDuplicates(arr))
            setAnchorEl(event.currentTarget)
            setMenuIndex(index)
        }
    }


    const handleMenuClick = (selectedMenu) => {

        if (selectedMenu === 'Ascending') {
            let newArr = content.sort((a, b) => a[MenuIndex] - b[MenuIndex])
            setContent(newArr)
            setAnchorEl(null)
        } else if (selectedMenu === 'Descending') {
            let newArr = content.sort((a, b) => b[MenuIndex] - a[MenuIndex])
            setContent(newArr)
            setAnchorEl(null)
        } else {
            let newArr = reduxState.content.filter(item => item[MenuIndex] === selectedMenu) ?? []
            setContent(newArr)
            setAnchorEl(null)
        }
    }

    return (
        <>
            {content.length > 0 && <Box>
                <TableContainer sx={{ maxHeight: '80vh' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {heading.map((item, index) => {
                                    const isDropdown = availability.find(data => data.title === item.toLowerCase())
                                    return (
                                        <TableCell
                                            key={index}
                                            sx={{ cursor: 'pointer' }}
                                            onClick={(e) => handleOpenMenu(e, item, index)}>
                                            <CardActionArea sx={{ display: 'flex', borderRadius: '5px', p: '5px 5px' }} disableRipple={!isDropdown}>
                                                <Typography>{item}</Typography>
                                                {isDropdown && <ArrowDropDownIcon sx={{ color: '#ABB2B9' }} />}
                                            </CardActionArea>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>

                            <SortDropdown
                                menus={menus}
                                anchorEl={anchorEl}
                                setAnchorEl={setAnchorEl}
                                onClick={handleMenuClick} />
                        </TableHead>

                        <TableBody>
                            {content?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((data, index) => (
                                <TableRow key={index}>
                                    {data.map((item, index) => <TableCell key={index}>{item}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ flexGrow: 1, textAlign: 'left', px: '20px' }}>Document Name :{documentName}</Typography>
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[10, 25, 50]}
                        count={content.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </Box>}
        </>
    )
}

export default ExcelTable