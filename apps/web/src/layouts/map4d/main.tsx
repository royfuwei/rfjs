import { Box, BoxProps } from '@mui/material';
import { HEADER } from '../config-layout';
import { CesiumViewer } from '~rfjs/web/components/cesium';
import NavVertical from '../dashboard/nav-vertical';

const SPACING = 8;

export default function Main({ children, sx, ...other }: Readonly<BoxProps>) {
  const renderNavVertical = <NavVertical openNav={true} />;
  return (
    <Box
      component={'main'}
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...sx,
      }}
      {...other}
    >
      <CesiumViewer>{children}</CesiumViewer>
    </Box>
  );
}
