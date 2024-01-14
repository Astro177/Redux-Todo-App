import { Button } from "../ui/button";

type TBtnText = {
  btnText: string;
};

export const GradientButton = ({ btnText }: TBtnText) => {
  return <Button className="bg-primary-gradient font-bold">{btnText}</Button>;
};
