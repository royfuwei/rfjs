'use client';
import { Viewer } from 'resium';
import * as Cesium from 'cesium';
import { Box, BoxProps } from '@mui/material';
import { HEADER } from '../../layouts/config-layout';
import { CESIUM_DEFAULT_ACCESS_TOKEN } from '~rfjs/web/config-global';
// ----

const SPACING = 8;
Cesium.Ion.defaultAccessToken = CESIUM_DEFAULT_ACCESS_TOKEN;

export default function CsViewer({
  children,
  sx,
  ...other
}: Readonly<BoxProps>) {
  return (
    <Box
      component={'main'}
      sx={{
        flexGrow: 1,
        minHeight: 1,
        maxHeight: '100vh',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...sx,
      }}
      {...other}
    >
      <header>
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
      </header>
      <Viewer
        timeline={false}
        animation={false}
        fullscreenButton={false}
        homeButton={false}
      />
    </Box>
  );
}
