import React, { useEffect, useState } from 'react';
import { getPurchases } from '../api';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';

const Purchase = ({ token }) => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            const response = await getPurchases(token);
            setPurchases(response.data.purchases);
        };
        fetchPurchases();
    }, [token]);

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>Purchases</Typography>
                {purchases.map(purchase => (
                    <Card key={purchase._id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h5">{purchase.courseId.title}</Typography>
                            <Typography variant="body2">{purchase.courseId.description}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default Purchase;