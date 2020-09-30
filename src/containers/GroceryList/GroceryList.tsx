import React from 'react';
import GroceryItemsList from '../../components/GroceryItemsList/GroceryItemsList';
import NewItemForm from '../../components/NewItemForm/NewItemForm';
import { FoodItem, getDefaultItem } from '../../models/models';
import './GroceryList.scss';

export default class GroceryList extends React.Component<
    {},
    {
        list: FoodItem[];
        activeItem: FoodItem | null;
        filteredList: FoodItem[];
    }
> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            list: [],
            filteredList: [],
            activeItem: null,
        };
    }

    public componentDidMount(): void {
        const list = localStorage.getItem('list');
        if (list) {
            const sortedArray = JSON.parse(list).sort(
                (
                    a: { priority: number; name: number },
                    b: { priority: number; name: number }
                ) => {
                    if (a.priority === b.priority) {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    }
                    return a.priority > b.priority ? -1 : 1;
                }
            );
            this.setState({
                ...this.state,
                list: sortedArray,
                activeItem: sortedArray[0],
            });
        } else {
            const item = getDefaultItem();
            this.setState({ ...this.state, list: [item], activeItem: item });
        }
    }

    private setActiveItem(item: FoodItem): void {
        this.setState({
            ...this.state,
            activeItem: item,
        });
    }

    private editItem = (objItem: FoodItem) => {
        const list = this.state.list;
        const indexToEdit = list.findIndex((item) => item.id === objItem.id);
        list[indexToEdit] = objItem;
        const sortedArray = list.sort((a, b) => {
            if (a.priority === b.priority) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            }
            return a.priority > b.priority ? -1 : 1;
        });
        this.setState({ ...this.state, list }, () =>
            localStorage.setItem('list', JSON.stringify(sortedArray))
        );
    };

    private removeNoteItem(id: string): void {
        this.setState(
            {
                ...this.state,
                list: this.state.list.filter((item) => item.id !== id),
            },
            () => localStorage.setItem('list', JSON.stringify(this.state.list))
        );
    }

    private haveToBuyItems(): void {
        const haveToBuyArray = this.state.list.filter((el) => {
            if (el.isNeedToBuy) return el;
        });

        this.setState({
            ...this.state,
            filteredList: haveToBuyArray,
        });
    }

    private dontHaveToBuyItems(): void {
        const dontHaveToBuyArray = this.state.list.filter((el) => {
            if (!el.isNeedToBuy) return el;
        });

        this.setState({
            ...this.state,
            filteredList: dontHaveToBuyArray,
        });
    }

    private showAllList(): void {
        this.setState({
            ...this.state,
            filteredList: [],
        });
    }

    private addNewItem(): void {
        const item = getDefaultItem();
        this.setState(
            {
                ...this.state,
                list: [item, ...this.state.list],
                activeItem: item,
            },
            () => localStorage.setItem('list', JSON.stringify(this.state.list))
        );
    }
    render() {
        return (
            <div className='container'>
                <div className='grocery-items-list'>
                    <div className='filter-items'>
                        <span>Filter: </span>
                        <input
                            type='button'
                            value='Have'
                            className='filter-items__btn'
                            onClick={this.haveToBuyItems.bind(this)}
                        />
                        <input
                            type='button'
                            value='Run Out'
                            className='filter-items__btn'
                            onClick={this.dontHaveToBuyItems.bind(this)}
                        />
                        <input
                            type='button'
                            value='All'
                            className='filter-items__btn'
                            onClick={this.showAllList.bind(this)}
                        />
                    </div>
                    <button
                        className='container__btn'
                        onClick={this.addNewItem.bind(this)}
                    >
                        Add New Item
                    </button>
                    <GroceryItemsList
                        arrayOfItems={
                            this.state.filteredList.length !== 0
                                ? this.state.filteredList
                                : this.state.list
                        }
                        removeNoteItem={this.removeNoteItem.bind(this)}
                        selectItem={this.setActiveItem.bind(this)}
                        activeItemIdProp={this.state.activeItem?.id}
                    />
                </div>
                <div className='grocery-item'>
                    {
                        <NewItemForm
                            editItem={this.editItem}
                            foodItem={this.state.activeItem}
                        />
                    }
                </div>
            </div>
        );
    }
}
