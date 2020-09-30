import React from 'react';
import RemoveImg from '../../assets/remove.svg';
import { GroceryItemProps } from '../../models/models';
import './GroceryItem.scss';

const GroceryItem = ({
    item,
    deleteNoteItem,
}: GroceryItemProps): React.ReactElement => {
    const handleRemoveNoteItem = (
        id: string,
        event: React.MouseEvent<HTMLImageElement, MouseEvent>
    ): void => {
        event.stopPropagation();
        deleteNoteItem(id);
    };

    return (
        <div className='grosery-item'>
            <div className='grosery-item__header'>
                <img
                    src={RemoveImg}
                    alt='remove icon'
                    className='grosery-item__header_img'
                    onClick={(event) => handleRemoveNoteItem(item.id, event)}
                />
            </div>
            <div>{item.name}</div>
            <div className='grosery-item__footer'>
                <div className=''>Priority: {item.priority}</div>
                <div className=''>
                    {item.isNeedToBuy
                        ? 'You must buy that item'
                        : "You don't need it"}
                </div>
            </div>
        </div>
    );
};

export default GroceryItem;
