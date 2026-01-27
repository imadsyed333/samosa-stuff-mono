import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { Product } from "../lib/types";

type SelectProductContextType = {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const SelectProductContext = createContext<SelectProductContextType>({
  selectedProduct: null,
  open: false,
  setSelectedProduct: (product: Product | null) => {},
  setOpen: (value: boolean) => {},
});

export const SelectedProductProvider = ({ children }: PropsWithChildren) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const value = { selectedProduct, setSelectedProduct, open, setOpen };
  return (
    <SelectProductContext.Provider value={value}>
      {children}
    </SelectProductContext.Provider>
  );
};

export const useSelectedProduct = () => {
  return useContext(SelectProductContext);
};
