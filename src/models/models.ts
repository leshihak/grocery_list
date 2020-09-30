import { v4 as uuidv4 } from 'uuid';

export interface FoodItem {
    name: string;
    priority: string;
    isNeedToBuy: boolean;
    id: string;
}

export const getDefaultItem = (): FoodItem => ({
    name: 'This is your item...',
    id: uuidv4(),
    priority: '1',
    isNeedToBuy: false,
});

export interface NewItemFormProps {
    editItem: (objItem: any) => void;
    foodItem: FoodItem | null;
}

export interface GroceryItemsListProps {
    arrayOfItems: FoodItem[];
    removeNoteItem: (id: string) => void;
    selectItem: (item: FoodItem) => void;
    activeItemIdProp?: string;
}

export interface GroceryItemProps {
    item: FoodItem;
    deleteNoteItem: (id: string) => void;
    isActive: boolean;
}
