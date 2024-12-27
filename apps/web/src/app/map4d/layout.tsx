'use client';
import Map4DLayout from '~rfjs/web/layouts/map4d';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
  return <Map4DLayout>{children}</Map4DLayout>;
}
