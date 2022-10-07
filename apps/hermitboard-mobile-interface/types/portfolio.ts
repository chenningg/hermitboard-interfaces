import { Connection } from "./connection";

export type Portfolio = {
  id: string;
  name: string;
  isPublic: boolean;
  isVisible: boolean;
  accountID: string;
  connections: Connection[];
};
