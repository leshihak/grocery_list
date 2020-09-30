import React, { useEffect, useState } from 'react';
import { FoodItem, GroceryItemsListProps } from '../../models/models';
import GroceryItem from '../GroceryItem/GroceryItem';

const GroceryItemsList = ({
    arrayOfItems,
    removeNoteItem,
    selectItem,
    activeItemIdProp,
}: GroceryItemsListProps): React.ReactElement => {
    const [, setActiveNoteId] = useState(
        arrayOfItems.length > 0 ? arrayOfItems[0].id : ''
    );

    useEffect(() => {
        if (activeItemIdProp) {
            setActiveNoteId(activeItemIdProp);
        }
    }, [activeItemIdProp]);

    const deleteNoteItem = (id: string): void => {
        removeNoteItem(id);
    };

    const setActiveNote = (item: FoodItem): void => {
        selectItem(item);
        setActiveNoteId(item.id);
    };

    const renderItems = (): JSX.Element[] => {
        return arrayOfItems.map((item) => {
            return (
                <div key={item.id} onClick={(): void => setActiveNote(item)}>
                    <GroceryItem item={item} deleteNoteItem={deleteNoteItem} />
                </div>
            );
        });
    };

    return <>{renderItems()}</>;
};

export default GroceryItemsList;
