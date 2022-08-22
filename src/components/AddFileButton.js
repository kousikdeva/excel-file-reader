import { IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const AddFileButton = ({ onChange, isAdded, handleRemoveFile }) => {

    const containerStyle = { display: 'flex', justifyContent: 'center', margin: '20px' }

    const labelStyle = {
        display: 'flex',
        boxShadow: ' 0px 0px 5px 0px rgba(0,0,0,0.75)',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: '5px',
        padding: '0px 10px'
    }

    const paperStyle = {
        display: 'flex', alignItems: 'center'
    }
    return (
        <div style={containerStyle}>

            {isAdded ? <label style={labelStyle}>
                <Paper onClick={handleRemoveFile} sx={paperStyle} elevation={0}>
                    <IconButton component='span' size="medium" >
                        <RemoveIcon sx={{ color: '#F14141' }} />
                    </IconButton>
                    <Typography>Click here to remove file</Typography>

                </Paper>
            </label> :
                <label style={labelStyle}>
                    <input
                        type="file"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        hidden
                        onChange={onChange}
                    />
                    <IconButton component='span' size="medium" >
                        <AddIcon sx={{ color: '#549DE5' }} />
                    </IconButton>
                    <Typography>Click here to add file</Typography>
                </label>
            }

        </div>
    )
}

export default AddFileButton