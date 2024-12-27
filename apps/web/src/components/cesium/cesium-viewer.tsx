'use client';
import { KmlDataSource, Viewer } from 'resium';
import * as Cesium from 'cesium';
import { Box, BoxProps } from '@mui/material';
import { CESIUM_DEFAULT_ACCESS_TOKEN } from '~rfjs/web/config-global';
import CsKmlDataViewer from './cs-kml-viewer';
// ----

Cesium.Ion.defaultAccessToken = CESIUM_DEFAULT_ACCESS_TOKEN;

type Props = {
  children: React.ReactNode;
};

const extendSplitScreen = (viewer: Cesium.Viewer) => {
  const layers = viewer.imageryLayers;
  /* const earthAtNight = Cesium.ImageryLayer.fromProviderAsync(
    Cesium.IonImageryProvider.fromAssetId(3812),
  ); */
  // const baseLayer = layers.get(0);
  // baseLayer.splitDirection = Cesium.SplitDirection.LEFT; // Only show to the left of the slider.
  // layers.add(baseLayer);
  /*  */
};

export default function CesiumViewer({
  children,
  sx,
  ...other
}: Readonly<BoxProps>) {
  return (
    <Box
      component={'main'}
      sx={{
        flexGrow: 1,
        minHeight: '90vh',
        flexDirection: 'column',
        overflow: 'hidden',
        ...sx,
      }}
      {...other}
    >
      <header>
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
      </header>
      <Viewer
        // full
        style={{
          position: 'inherit',
          padding: 0,
          top: 0,
          height: '100%',
        }}
        timeline={false}
        animation={false}
        fullscreenButton={false}
        homeButton={false}
        extend={(viewer) => {
          extendSplitScreen(viewer);
        }}
      >
        <CsKmlDataViewer />
      </Viewer>
    </Box>
  );
}
