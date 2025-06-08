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
} from '@mui/material';

const ChooseSkipPage = () => {
    const [skips, setSkips] = useState<Skip[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSkipId, setSelectedSkipId] = useState<string | null>(null);

    useEffect(() => {
        getSkipsByLocation('NR32', 'Lowestoft')
            .then((data) => setSkips(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: { xs: 4, sm: 5 },
                px: { xs: 2, sm: 4, md: 6 },
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

                    <Grid container spacing={4}>
                        {skips.map((skip) => (
                            <Grid
                                item
                                key={skip.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={4}
                            >
                                <SkipCard
                                    skip={skip}
                                    isSelected={selectedSkipId === String(skip.id)}
                                    onSelect={(id: string) => setSelectedSkipId(id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default ChooseSkipPage;
