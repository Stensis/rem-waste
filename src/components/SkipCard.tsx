import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Stack,
    Chip,
    Button,
    Divider,
    useTheme
} from '@mui/material';
import type { Skip } from '../services/skipService';
import { skipImageMap } from '../services/skipImages';

interface SkipCardProps {
    skip: Skip;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
    const theme = useTheme();
    const imageUrl = skipImageMap[skip.size] || '/assets/default-skip.jpg';

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: `0 6px 16px ${theme.palette.primary.main}66`,
                overflow: 'hidden',
                color: theme.palette.text.primary,
                height: '100%',
                '&:hover': {
                    transform: 'scale(1.01)',
                    transition: 'transform 0.3s ease-in-out',
                    border: "1px solid"
                },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: { xs: '100%', sm: '50%' },
                    height: { xs: 200, sm: '100%' },
                }}
            >
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={`${skip.size} Yard Skip`}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                    }}
                />
                {!skip.allowed_on_road && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            backgroundColor: theme.palette.error.main,
                            color: '#fff',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            fontWeight: 'bold',
                            fontSize: 12,
                        }}
                    >
                        ⚠️ Not Allowed On The Road
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    width: { xs: '100%', sm: '50%' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <CardContent sx={{ flex: '1 0 auto', p: 2 }}>
                    <Typography component="div" variant="h5" sx={{ color: theme.palette.primary.contrastText }} noWrap>
                        {skip.size} Yard Skip
                    </Typography>

                    <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main, fontWeight: 600 }} noWrap>
                        £{skip.price_before_vat} + VAT
                    </Typography>

                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }} noWrap>
                        Hire Period: {skip.hire_period_days} days
                    </Typography>

                    <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap rowGap={1} columnGap={1}>

                        <Chip
                            label={`🏗 Heavy Waste: ${skip.allows_heavy_waste ? 'Yes' : 'No'}`}
                            size="small"
                            sx={{ fontWeight: 'bold',  color: theme.palette.primary.contrastText }}
                        />
                        {skip.transport_cost && (
                            <Chip
                                label={`📦 Transport: £${skip.transport_cost}`}
                                size="small"
                                sx={{ fontWeight: 'bold', bgcolor: theme.palette.secondary.main, color: '#000' }}
                            />
                        )}
                        {skip.per_tonne_cost && (
                            <Chip
                                label={`⚖ Per Tonne: £${skip.per_tonne_cost}`}
                                size="small"
                                sx={{ fontWeight: 'bold', bgcolor: theme.palette.secondary.main, color: '#000' }}
                            />
                        )}
                    </Stack>
                </CardContent>

                <Box sx={{ px: 2, pb: 2 }}>
                    <Button
                        fullWidth
                        variant={isSelected ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => onSelect(String(skip.id))}
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: 14,
                            bgcolor: isSelected ? theme.palette.success.main : 'transparent',
                            borderColor: theme.palette.secondary.main,
                            color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
                            '&:hover': {
                                bgcolor: isSelected ? theme.palette.success.main : theme.palette.action.hover,
                                borderColor: theme.palette.secondary.main,
                            },
                        }}
                    >
                        {isSelected ? 'Selected' : 'Select this skip →'}
                    </Button>

                </Box>
            </Box>
        </Card>
    );
};

export default SkipCard;
