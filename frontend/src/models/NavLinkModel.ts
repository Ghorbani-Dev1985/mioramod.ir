import { ReactNode } from "react";

export interface NavLinkModel {
    href: string;
    activeClassName?: string;
    disActiveClassName?: string;
    children?: ReactNode;
 };