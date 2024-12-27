import Header from '../dashboard/header';
import { Box } from '@mui/material';
import Main from './main';
import NaMapVertical from './nav-map-vertical';

type Props = {
  children: React.ReactNode;
};

export default function Map4DLayout({ children }: Readonly<Props>) {
  const renderMapNavVertical = <NaMapVertical openNav={true} />;
  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: 1,
          maxHeight: '100vh',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {renderMapNavVertical}
        <Main>{children}</Main>
      </Box>
    </>
  );
}
