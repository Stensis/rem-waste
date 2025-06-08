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
        <Container maxWidth={false} sx={{
            width: '100%',
            px: { xs: 2, sm: 3, md: 4, lg: 6 }
        }}
        >
            <ProgressSteps />

            <Box>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress color="success" />
                    </Box>
                ) : (
                    <>
                        <Box sx={{ my: 2, textAlign: 'center' }}>
                            <Typography variant="h4" gutterBottom>
                                Choose Your Skip Size
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                Select the skip size that best suits your needs
                            </Typography>
                        </Box>


                        <Grid container spacing={3} my={2}>
                            {skips.map((skip) => (
                                <Grid
                                    item
                                    key={skip.id}
                                    xs={12}   // 1 card on phone
                                    sm={6}    // 2 cards on tablets
                                    md={4}    // 3 cards on laptops
                                    lg={4}    // 3 cards on large desktops instead of 4
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
            </Box>
        </Container>
    );
};

export default ChooseSkipPage;
