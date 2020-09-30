import React, { useEffect, useState } from 'react';
import { FoodItem, NewItemFormProps } from '../../models/models';
import './NewItemForm.scss';

const NewItemForm = ({
    editItem,
    foodItem,
}: NewItemFormProps): React.ReactElement => {
    const [objItem, setObjItem] = useState<FoodItem>();

    useEffect(() => {
        if (foodItem) {
            setObjItem(foodItem);
        }
    }, [foodItem]);

    const handleItemName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const item = { ...objItem, name: event.target.value };
        setObjItem(item as FoodItem);
    };

    const handlePriority = (event: { target: { value: any } }) => {
        const item = { ...objItem, priority: event.target.value };
        setObjItem(item as FoodItem);
    };

    const handleNeedToBuy = (isNeedToBuy: boolean) => {
        const item = { ...objItem, isNeedToBuy };
        setObjItem(item as FoodItem);
    };

    const handleOnEdit = () => {
        editItem({ ...objItem });
    };

    return (
        <form className='form'>
            <input
                type='text'
                className='form__input'
                placeholder='Add an item...'
                value={objItem?.name}
                onChange={(event) => handleItemName(event)}
            />
            <select
                className='form__select'
                value={objItem?.priority}
                onChange={handlePriority}
            >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
            <div className='form__radio'>
                <input
                    type='radio'
                    id='have'
                    name='item'
                    className='form__radio_item'
                    checked={!objItem?.isNeedToBuy}
                    onClick={() => handleNeedToBuy(false)}
                />
                <label htmlFor='have'>Have</label>
                <input
                    type='radio'
                    id='runOut'
                    name='item'
                    checked={objItem?.isNeedToBuy}
                    className='form__radio_item'
                    onClick={() => handleNeedToBuy(true)}
                />
                <label htmlFor='contactChoice1'>Run Out</label>
            </div>
            <input
                type='button'
                value='Edit'
                onClick={handleOnEdit}
                className='form__btn'
            />
        </form>
    );
};

export default NewItemForm;
