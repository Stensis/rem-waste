import React, { useState } from 'react';
import {
    Box,
    Typography,
    Tooltip,
    useTheme,
    useMediaQuery,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from '@mui/material';
import {
    LocationOn,
    Delete,
    Inventory2,
    Gavel,
    CalendarToday,
    Payment,
} from '@mui/icons-material';

const steps = [
    { icon: <LocationOn />, label: 'Location', active: true },
    { icon: <Delete />, label: 'Waste Details', active: true },
    { icon: <Inventory2 />, label: 'Choose Skip', active: true },
    { icon: <Gavel />, label: 'Permit Info', active: false },
    { icon: <CalendarToday />, label: 'Delivery Date', active: false },
    { icon: <Payment />, label: 'Checkout', active: false },
];

const getLastActiveIndex = (
    steps: { icon: React.ReactElement; label: string; active: boolean }[]
): number => {
    for (let i = steps.length - 1; i >= 0; i--) {
        if (steps[i].active) return i;
    }
    return -1;
};

const ProgressSteps = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const activeStepIndex = getLastActiveIndex(steps);
    const totalSteps = steps.length;
    const progressPercent = ((activeStepIndex + 1) / totalSteps) * 100;

    const [selectedStepIndex, setSelectedStepIndex] = useState(activeStepIndex);

    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        setSelectedStepIndex(Number(event.target.value));
    };

    if (isSmallScreen) {
        return (
            <Box sx={{ py: 4, px: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="progress-steps-label">Step</InputLabel>
                    <Select
                        labelId="progress-steps-label"
                        id="progress-steps-select"
                        value={selectedStepIndex}
                        label="Step"
                        onChange={handleSelectChange}
                    >
                        {steps.map((step, index) => (
                            <MenuItem
                                key={index}
                                value={index}
                                disabled={!step.active}
                            >
                                {step.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 4, px: 4 }}>
            {/* Progress Bar */}
            <Box
                sx={{
                    position: 'relative',
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#202540', // darker shade of #364a7a
                    mb: 4,
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        borderRadius: 5,
                        width: `${progressPercent}%`,
                        backgroundImage: 'linear-gradient(45deg, #364a7a, #4a5e9c)',
                        backgroundSize: '200% 200%',
                        animation: 'moveGradient 3s linear infinite',
                        transition: 'width 0.4s ease-in-out',
                    }}
                />
            </Box>

            {/* Steps with Tooltips */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                {steps.map((step, index) => {
                    const tooltipTitle = step.active ? 'Completed ✅' : 'Coming soon 🚧';

                    return (
                        <Tooltip key={index} title={tooltipTitle} arrow>
                            <Box textAlign="center" sx={{ cursor: 'default' }}>
                                <Box
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        mb: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: step.active ? '#364a7a' : '#2c2f48',
                                        color: step.active ? '#cfdcff' : '#7c84a1',
                                        boxShadow: step.active
                                            ? '0 0 0 4px rgba(54, 74, 122, 0.3)'
                                            : 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {step.icon}
                                </Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: step.active ? 'bold' : 400,
                                        color: step.active ? '#cfdcff' : '#888ea3',
                                    }}
                                >
                                    {step.label}
                                </Typography>
                            </Box>
                        </Tooltip>
                    );
                })}
            </Box>

            {/* Keyframe animation for the gradient progress bar */}
            <style>
                {`
                @keyframes moveGradient {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 100% 50%; }
                }
                `}
            </style>
        </Box>
    );
};

export default ProgressSteps;
