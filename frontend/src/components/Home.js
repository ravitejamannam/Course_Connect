import React from 'react';
import { 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    Button, 
    Grid,
    Container 
} from '@mui/material';

const Home = () => {
    const courses = [
        {
            title: "Complete Web Development + Devops + Blockchain Cohort",
            price: "₹5989",
            originalPrice: "8499",
            discount: "29.53% off",
            image: "/cohort3.png"
        },
        {
            title: "Complete Web development + Devops Cohort",
            price: "₹4989",
            originalPrice: "5999",
            discount: "16.84% off",
            image: "/webdev.png"
        },
        {
            title: "Complete Web3/Blockchain Cohort",
            price: "₹4989",
            originalPrice: "5999",
            discount: "16.84% off",
            image: "/web3.png"
        }
    ];

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 600,
                        mb: 4,
                        textAlign: 'center'
                    }}
                >
                    Featured
                </Typography>

                <Grid container spacing={3}>
                    {courses.map((course, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card 
                                sx={{ 
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 2,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}
                            >
                                <Box 
                                    component="img"
                                    src={course.image}
                                    alt={course.title}
                                    sx={{ 
                                        width: '100%',
                                        height: 'auto',
                                        borderTopLeftRadius: 8,
                                        borderTopRightRadius: 8
                                    }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            fontWeight: 600,
                                            mb: 2,
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        {course.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                fontWeight: 600,
                                                mr: 1 
                                            }}
                                        >
                                            {course.price}
                                        </Typography>
                                        <Typography 
                                            sx={{ 
                                                textDecoration: 'line-through',
                                                color: 'text.secondary',
                                                mr: 1
                                            }}
                                        >
                                            {course.originalPrice}
                                        </Typography>
                                        <Typography 
                                            sx={{ 
                                                color: 'success.main',
                                                fontWeight: 500
                                            }}
                                        >
                                            {course.discount}
                                        </Typography>
                                    </Box>
                                    <Button 
                                        variant="contained" 
                                        fullWidth
                                        sx={{ 
                                            textTransform: 'none',
                                            borderRadius: 2,
                                            py: 1
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 600,
                        my: 6,
                        textAlign: 'center'
                    }}
                >
                    Why 100xdevs?
                </Typography>
            </Box>
        </Container>
    );
};

export default Home;