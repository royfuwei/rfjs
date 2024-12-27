export type KmlDataSet = {
  name: string;
  data: Document;
  url?: string;
};

export type KmlDataSetState = {
  kmlList: KmlDataSet[];

  setKmlList: (kmlList: KmlDataSet[]) => void;
};
