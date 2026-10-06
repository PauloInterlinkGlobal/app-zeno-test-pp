'use client';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface LinearIndeterminateProps {
  className?: string;
}

export function LinearIndeterminate({
  className = '',
}: LinearIndeterminateProps) {
  return (
    <Box sx={{ width: '100%' }} className={className}>
      <LinearProgress
        aria-label="Loading…"
        sx={{
          height: 4,
          backgroundColor: 'rgba(37, 99, 235, 0.15)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#2563eb',
          },
        }}
      />
    </Box>
  );
}

export default LinearIndeterminate;
