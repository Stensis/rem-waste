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
    Divider
} from '@mui/material';
import type { Skip } from '../services/skipService';
import { skipImageMap } from '../services/skipImages';

interface SkipCardProps {
    skip: Skip;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
    const imageUrl = skipImageMap[skip.size] || '/assets/default-skip.jpg';

    return (
       <Card
    sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        borderRadius: 2,
        background: 'linear-gradient(135deg, #2c2c34 0%, #1a1a22 100%)',
        boxShadow: '0 6px 16px rgba(34, 88, 192, 0.4)',
        overflow: 'hidden',
        color: '#eee',
        height: '100%',
        '&:hover': {
            transform: 'scale(1.01)',
            transition: 'transform 0.3s ease-in-out',
        },
    }}
>
    <CardMedia
        component="img"
        image={imageUrl}
        alt={`${skip.size} Yard Skip`}
        sx={{
            width: { xs: '100%', sm: '40%' },
            height: { xs: 200, sm: '100%' },
            objectFit: 'fill',
        }}
    />

    <Box
        sx={{
            width: { xs: '100%', sm: '60%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}
    >
        <CardContent sx={{ flex: '1 0 auto', p: 2 }}>
            <Typography component="div" variant="h5" sx={{ color: '#cfdcff' }} noWrap>
                {skip.size} Yard Skip
            </Typography>

            <Typography
                variant="subtitle1"
                sx={{ color: '#7ea3e0', fontWeight: 600 }}
                noWrap
            >
                £{skip.price_before_vat} + VAT
            </Typography>

            <Typography
                variant="body2"
                sx={{ color: '#aaa', mt: 1 }}
                noWrap
            >
                Hire Period: {skip.hire_period_days} days
            </Typography>

            <Divider sx={{ my: 2, borderColor: '#3a62c6' }} />

            <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                rowGap={1}
                columnGap={1}
            >
                <Chip
                    label={`🚛 On Road: ${skip.allowed_on_road ? 'Yes' : 'No'}`}
                    size="small"
                    sx={{ fontWeight: 'bold', bgcolor: '#364a7a', color: '#cfdcff' }}
                />
                <Chip
                    label={`🏗 Heavy Waste: ${skip.allows_heavy_waste ? 'Yes' : 'No'}`}
                    size="small"
                    sx={{ fontWeight: 'bold', bgcolor: '#364a7a', color: '#cfdcff' }}
                />
                {skip.transport_cost && (
                    <Chip
                        label={`📦 Transport: £${skip.transport_cost}`}
                        size="small"
                        sx={{ fontWeight: 'bold', bgcolor: '#2258c0', color: '#fff' }}
                    />
                )}
                {skip.per_tonne_cost && (
                    <Chip
                        label={`⚖ Per Tonne: £${skip.per_tonne_cost}`}
                        size="small"
                        sx={{ fontWeight: 'bold', bgcolor: '#3a62c6', color: '#fff' }}
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
                    fontSize: 16,
                    borderColor: isSelected ? '#2258c0' : '#7ea3e0',
                    bgcolor: isSelected ? '#2258c0' : 'transparent',
                    color: isSelected ? '#fff' : '#ddd',
                    '&:hover': {
                        bgcolor: isSelected ? '#1b458e' : '#224b9e',
                        borderColor: isSelected ? '#1b458e' : '#224b9e',
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
