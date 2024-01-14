import { ReactNode } from "react";

type TContainer = {
  children: ReactNode;
};

export const Container = ({ children }: TContainer) => {
  return <section className="container mx-auto">{children}</section>;
};
