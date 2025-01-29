import { BoxProps } from '@mui/material';
import { KmlDataSource } from 'resium';
import { kmlData } from './kml';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
};
export default function CsKmlDataViewer({
  children,
  sx,
  ...other
}: Readonly<BoxProps>) {
  const [kmlList, setKmlDocumentSet] = useState<Document[]>([kmlData]);
  return (
    <>
      {kmlList.map((kml, index) => {
        return <KmlDataSource key={`${kml}-${index}`} data={kml} />;
      })}
    </>
  );
}
