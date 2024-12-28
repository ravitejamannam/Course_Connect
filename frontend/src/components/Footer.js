import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: 'primary.main', color: 'white', p: 2, mt: 'auto', textAlign: 'center' }}>
            <Typography variant="body1">© 2024 Course Connect. All rights reserved.</Typography>
        </Box>
    );
};

export default Footer;