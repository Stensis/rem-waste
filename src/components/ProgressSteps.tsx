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
  const progressPercent = ((activeStepIndex + 1) / steps.length) * 100;
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
              <MenuItem key={index} value={index} disabled={!step.active}>
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
          backgroundColor: theme.palette.divider,
          mb: 4,
        }}
      >
        <Box
          sx={{
            height: '100%',
            borderRadius: 5,
            width: `${progressPercent}%`,
            backgroundColor: theme.palette.secondary.main, // Yellow progress bar
            transition: 'width 0.4s ease-in-out',
          }}
        />
      </Box>

      {/* Step Icons */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {steps.map((step, index) => {
          const isActive = step.active;

          return (
            <Tooltip key={index} title={isActive ? 'Completed ✅' : 'Coming soon 🚧'} arrow>
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
                    backgroundColor: isActive
                      ? theme.palette.secondary.main // Yellow background if active
                      : theme.palette.background.paper,
                    color: isActive
                      ? theme.palette.getContrastText(theme.palette.secondary.main) // Contrast text on yellow
                      : theme.palette.text.secondary,
                    boxShadow: isActive
                      ? `0 0 0 4px ${theme.palette.secondary.main}44` // Yellow glow with opacity
                      : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {step.icon}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: isActive ? 'bold' : 400,
                    color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProgressSteps;
