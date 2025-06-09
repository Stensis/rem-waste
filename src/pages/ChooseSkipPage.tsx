import { useEffect, useState } from 'react';
import { getSkipsByLocation, type Skip } from '../services/skipService';
import SkipCard from '../components/SkipCard';
import ProgressSteps from '../components/ProgressSteps';

import {
    Box,
    CircularProgress,
    Container,
    Grid,
    Typography,
    Slide,
    Paper,
    Button,
    useTheme
} from '@mui/material';

const ChooseSkipPage = () => {
    const theme = useTheme();
    const [skips, setSkips] = useState<Skip[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSkipId, setSelectedSkipId] = useState<string | null>(null);

    useEffect(() => {
        getSkipsByLocation('NR32', 'Lowestoft')
            .then((data) => setSkips(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const fixedFooterHeight = 160; 

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: { xs: 4, sm: 5 },
                px: { xs: 2, sm: 4, md: 6 },
                overflow: 'visible',
                paddingBottom: `${fixedFooterHeight}px`,
                boxSizing: 'border-box',
            }}
        >
            <ProgressSteps />

            {loading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="300px"
                >
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <>
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Choose Your Skip Size
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Select the skip size that best suits your project or waste volume.
                        </Typography>
                    </Box>

                    <Grid container spacing={4} mb={{ xs: 6, sm: 4, md: 2 }}>
                        {skips.map((skip) => (
                            <Grid key={skip.id} item xs={12} sm={6} md={4}>
                                <SkipCard
                                    skip={skip}
                                    isSelected={selectedSkipId === String(skip.id)}
                                    onSelect={setSelectedSkipId}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Slide
                        direction="up"
                        in={!!selectedSkipId}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                // position: 'fixed',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                px: 3,
                                py: 4,
                                mb: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1300,
                                backgroundColor: (theme) => theme.palette.background.paper,
                                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                                color: (theme) => theme.palette.text.primary,
                                boxSizing: 'border-box',
                            }}
                        >
                            {/* Top paragraph */}
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontStyle: 'italic', mb: 2, textAlign: 'center', width: '100%' }}
                            >
                                Imagery and information shown throughout this website may not reflect the exact
                                shape or size specification, colours may vary, options and/or accessories may
                                be featured at additional cost.
                            </Typography>

                            {/* Bottom row with skip size + price left aligned, buttons right aligned */}
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {/* Left side: skip size + price grouped */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, minWidth: 240 }}>
                                    {selectedSkipId && (
                                        <Typography variant="h6" color="text.primary" fontWeight="medium">
                                            {skips.find((skip) => String(skip.id) === selectedSkipId)?.size} Yard Skip
                                        </Typography>
                                    )}

                                    <Typography variant="body1" color="text.primary">
                                        £
                                        {
                                            skips.find((skip) => String(skip.id) === selectedSkipId)
                                                ?.price_before_vat
                                        }{' '}
                                        {
                                            skips.find((skip) => String(skip.id) === selectedSkipId)
                                                ?.hire_period_days
                                        }{' '}
                                        day hire
                                    </Typography>
                                </Box>

                                {/* Right side: buttons close together */}
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="contained"

                                        onClick={() => setSelectedSkipId(null)}
                                        sx={{
                                            backgroundColor: theme.palette.success.main,
                                            '&:hover': {
                                                backgroundColor: theme.palette.success.dark,
                                            },
                                        }}>
                                        Back
                                    </Button>
                                    <Button variant="contained"
                                        sx={{
                                            backgroundColor: theme.palette.success.main,
                                            '&:hover': {
                                                backgroundColor: theme.palette.success.dark,
                                            },
                                        }}>
                                        Continue →
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Slide>
                </>
            )}
        </Container>
    );
};

export default ChooseSkipPage;
