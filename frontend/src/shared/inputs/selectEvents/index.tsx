import React from 'react';
import { Select as BaseSelect, SelectProps, SelectRootSlotProps, } from '@mui/base/Select';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { styled } from '@mui/system';
import { ReactComponent as ArrowIcon } from "../../../app/assets/icons/arrow_down.svg";
import { useDispatch, useSelector } from '../../../app/types/hooks';
import { getEventsList } from "../../../app/api/api"
import { searchCity, searchOnline } from '../../../app/services/slices/eventsSlice';


export const SelectEvents: React.FC<{ type: 'online' | 'city' }> = ({ type }) => {
    switch (type) {
        case 'online': return <SelectOnline />;
        case 'city': return <SelectCity />;
        default: throw Error('В SelectEvents передан неизветсный type');
    };
};

export const SelectOnline = () => {
    const dispatch = useDispatch();
    const { filters: { online }, loading } = useSelector(state => state.events);

    const getValue = () => {
        switch (online) {
            case true: return 'online';
            case false: return 'offline';
            default: return 'all';
        };
    };

    const handleOnChange = (_: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null, newValue: string | null) => {
        dispatch(searchOnline(newValue));
        dispatch(getEventsList());
    }

    return (
        <div>
            <Select
                value={getValue()}
                size="110px"
                kind="online"
                // @ts-ignore
                onChange={handleOnChange}
                disabled={loading}
            >
                <Option value={"online"}>Online</Option>
                <Option value={"offline"}>Offline</Option>
                <Option value={"all"}>Все</Option>
            </Select>
        </div >
    );
};

export const SelectCity = () => {
    const dispatch = useDispatch()
    const { cities, loading, filters: { city = 0 } } = useSelector(state => state.events)


    const handleOnChange = (_: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null, newValue: number | null) => {
        if (newValue !== null) {
            dispatch(searchCity(newValue));
            dispatch(getEventsList());
        }
    };

    return (
        <div>
            <Select
                value={city}
                size="200px"
                kind="city"
                // @ts-ignore
                onChange={handleOnChange}
                disabled={loading}
            >
                <Option value={0}>Город</Option>
                {cities.map(({ id, name }) => <Option value={id}>{name}</Option>)}
            </Select>
        </div>
    );
};

function Select(props: SelectProps<number | string, false>) {
    const slots: SelectProps<number | string, false>['slots'] = {
        root: Button,
        // @ts-ignore
        listbox: props.kind === "online" ? ListboxOnline : ListboxCity,
        popup: Popup,
        ...props.slots,
    };

    console.log(props)

    return <BaseSelect {...props} slots={slots} />;
}

const Button = React.forwardRef(function Button<TValue extends {}, Multiple extends boolean>(
    props: SelectRootSlotProps<TValue, Multiple> & { size?: string, kind?: string },
    ref: React.ForwardedRef<HTMLButtonElement>,
) {
    const { ownerState, ...other } = props;
    return (
        <StyledButton type="button" {...other} ref={ref}>
            <ArrowIcon />
            {other.children}
        </StyledButton>
    );
});

const StyledButton = styled('button', { shouldForwardProp: () => true })(
    // @ts-ignore
    ({ size }) => `
    width: ${size};
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 9.5px 12px;
    border-radius: 8px;
    background: #fff;
    border: 1px solid #8dbffb;
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    color: black;
    `);

const ListboxOnline = styled('ul')`
    margin-top: 3px;
    padding: 6px;
    width: 110px;
    max-height: 500px;
    overflow-y: auto;
    border-radius: 8px;
    background: #fff;
    outline: 1px solid #8dbffb;
    box-shadow: 0px 2px 6px rgba(0,0,0, 0.1);
`;

const ListboxCity = styled('ul')`
    margin-top: 3px;
    padding: 6px;
    width: 200px;
    max-height: 500px;
    overflow-y: scroll;
    border-radius: 8px;
    background: #fff;
    outline: 1px solid #8dbffb;
    box-shadow: 0px 2px 6px rgba(0,0,0, 0.1);
`;

const Option = styled(BaseOption)`
    list-style: none;
    padding: 8px;
    border-radius: 6px;
    cursor: default;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &.${optionClasses.selected} {
    background-color: #DAECFF;
    }

    &.${optionClasses.disabled} {
    color: #B0B8C4;
    }

    &:hover:not(.${optionClasses.disabled}) {
    background-color: #E5EAF2;
    }
`;

const Popup = styled('div')`z-index: 10`;
