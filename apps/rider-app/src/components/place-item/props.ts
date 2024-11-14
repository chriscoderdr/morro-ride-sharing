export interface IPlaceItemProps {
  item: {
    name: string;
    full_address: string;
  };
  onPress: (item: any) => void;
}
