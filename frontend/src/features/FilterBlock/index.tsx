import style from "./index.module.scss";
import { SearchInput } from "../../shared/inputs/searchInput";
import { SelectDate } from "../../shared/selectDate";
import { SelectSpecialization } from '../../shared/inputs/selectSpecialization';
import { SelectEvents } from '../../shared/inputs/selectEvents';

export const FilterBlock = () => (
  <div className={style.container}>
    <SearchInput type="events" />
    <SelectSpecialization />
    <SelectDate type='events' />
    <SelectEvents type="city" />
    <SelectEvents type="online" />
  </div>
);