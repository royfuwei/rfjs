import { Collapse, ListSubheader, Stack } from '@mui/material';
import { NavGroupProps, NavProps } from '../type';
import { memo } from 'react';
import NavList from './nav-list';

function NavSectionVertical({ data, slotProps, ...other }: NavProps) {
  return (
    <Stack component={'nav'} id="nav-section-vertical" {...other}>
      {data.map((group, index) => (
        <Group
          key={group.subheader || index}
          subheader={group.subheader}
          items={group.items}
          slotProps={slotProps}
          onItemClick={group.onItemClick}
        />
      ))}
    </Stack>
  );
}

export default memo(NavSectionVertical);

function Group({
  subheader,
  items,
  slotProps,
  onItemClick,
}: Readonly<NavGroupProps>) {
  const renderContent = items.map((i) => (
    <NavList key={i.title} data={i} depth={1} slotProps={slotProps}></NavList>
  ));
  const renderSubheader = (_subheader: string) => (
    <>
      <ListSubheader
        disableGutters
        disableSticky
        // onClick={handleToggle}
        sx={{
          fontSize: 11,
          cursor: 'pointer',
          typography: 'overline',
          display: 'inline-flex',
          color: 'text.disabled',
          mb: `${slotProps?.gap ?? 4}px`,
          p: (theme) => theme.spacing(2, 1, 1, 1.5),
          transition: (theme) =>
            theme.transitions.create(['color'], {
              duration: theme.transitions.duration.shortest,
            }),
        }}
      >
        {subheader}
      </ListSubheader>
      <Collapse in={true} onClick={onItemClick}>
        {renderContent}
      </Collapse>
    </>
  );

  return (
    <Stack sx={{ px: 2 }}>
      {subheader ? renderSubheader(subheader) : renderContent}
    </Stack>
  );
}
