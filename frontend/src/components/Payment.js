import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Container, 
    Paper, 
    Typography, 
    Button, 
    Box,
    CircularProgress,
    Alert 
} from '@mui/material';
import { createPaymentOrder, verifyPayment } from '../api';

const Payment = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePayment = async () => {
        try {
            setLoading(true);
            setError('');

            // Create order
            const { order } = await createPaymentOrder(courseId);

            // Initialize Razorpay
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Course Connect",
                description: "Course Purchase",
                order_id: order.id,
                handler: async (response) => {
                    try {
                        await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            courseId
                        });

                        navigate('/profile');
                    } catch (error) {
                        setError('Payment verification failed');
                    }
                },
                prefill: {
                    email: localStorage.getItem('userEmail')
                },
                theme: {
                    color: "#1976d2"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            setError(error.response?.data?.message || 'Payment initialization failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Complete Purchase
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={handlePayment}
                        disabled={loading}
                        sx={{ minWidth: 200 }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Proceed to Payment'
                        )}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Payment; 