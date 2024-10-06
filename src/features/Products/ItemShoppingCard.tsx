interface ItemShoppingCardProps {
  productName: string;
  productPrice: number;
}

export const ItemShoppingCard: React.FC<ItemShoppingCardProps> = ({
  productName,
  productPrice,
}) => {
  return <div className="flex flex-row justify-between my-3">
    <p className="text-base text-slate-900 font-semibold truncate max-w-[180px]">{productName}</p>
    <p className="text-base text-slate-900 font-semibold">${productPrice}</p>
    </div>;
};
