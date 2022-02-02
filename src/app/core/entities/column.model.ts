import { eColumnType } from "../enums/column-type.enum";

export interface iColumn {
    Name: string;
    Label: string;
    Type: eColumnType;
}