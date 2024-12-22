import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { getPurchases } from '../api';

const Purchases = ({ token }) => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await getPurchases(token);
                setPurchases(response.purchases);
            } catch (error) {
                console.error('Failed to fetch purchases:', error);
            }
        };
        fetchPurchases();
    }, [token]);

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>Purchases</Typography>
                <Grid container spacing={3}>
                    {purchases.map(purchase => (
                        <Grid item xs={12} sm={6} md={4} key={purchase._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{purchase.courseId.title}</Typography>
                                    <Typography variant="body2">{purchase.courseId.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Purchases;