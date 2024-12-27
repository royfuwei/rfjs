import { AppBar, Stack, Toolbar } from '@mui/material';
import { HEADER, NAV } from '../config-layout';
import { useTheme } from '@mui/material/styles';
import AccountPopover from '../common/account-popover';
import SettingsButton from '../common/settings-button';
import Searchbar from '../common/searchbar';
import { useResponsive } from '~rfjs/web/hooks/use-responsive';
import { useOffSetTop } from '~rfjs/web/hooks/use-off-set-top';
import { bgBlur } from '~rfjs/web/theme/css';

type Props = {
  onOpenNav?: () => void;
};

export default function MapHeader({ onOpenNav }: Readonly<Props>) {
  const theme = useTheme();
  const lgUp = useResponsive('up', ['lg']);
  const offset = useOffSetTop(HEADER.H_DESKTOP);
  const offsetTop = offset;

  const appBarBgBlur = bgBlur({
    color: theme.palette.background.default,
  });
  const onLgUpAppBarSx = lgUp && {
    width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
    height: HEADER.H_DESKTOP,
    ...(offsetTop && {
      height: HEADER.H_DESKTOP_OFFSET,
    }),
  };

  const renderContent = (
    <>
      <Searchbar />

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <SettingsButton />
        <AccountPopover />
      </Stack>
    </>
  );
  const navVerticalWidth = `calc(100% - ${NAV.W_VERTICAL + 1}px)`;

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...appBarBgBlur,
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        width: navVerticalWidth,
        ...onLgUpAppBarSx,
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
