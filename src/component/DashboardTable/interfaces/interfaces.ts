export interface Organization {
  id: number;
  name: string;
  tagline: string;
  banner: string;
  organizationURL: string;
  borderRadius: string;
  buttonColors: string;
  authMethod: string;
}

export interface RowData {
  id: number;
  name: string;
  tagline: string;
  banner: string;
  organizationURL: string;
  borderRadius: string;
  buttonColors: string;
  authMethod: string;
  [key: string]: string | number;
}

