import { Paper, Typography } from '@material-ui/core';
import React from 'react';

export default function Job({job, onClick}) {
    return (
        <Paper onClick={onClick} className='job'>
            <div>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="h5">{job.company}</Typography>
                <Typography>{job.location}</Typography>
            </div>
            <div>
                <Typography>{job.created_at.split(' ').splice(0, 3).join(' ')}</Typography>
            </div>
        </Paper>
    )
}