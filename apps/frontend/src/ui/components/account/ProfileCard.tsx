import { AccountCircle } from '@mui/icons-material'
import { Box, Card, Typography } from '@mui/material'
import React from 'react'

export const ProfileCard = ({ name, email }: { name: string, email: string }) => {
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
            height: '100%',
            width: '100%',
            mx: 2,
            px: 2
        }}>
            <Typography variant='h2'>My Profile</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                border: 1,
                borderColor: 'lightgrey',
                borderRadius: 2,
                width: '100%'

            }}>
                <AccountCircle sx={{
                    fontSize: 100
                }} />
                <Box>
                    <Typography variant='h3'>{name}</Typography>
                    <Typography>{email}</Typography>
                </Box>
            </Box>
        </Card>
    )
}
