import { useState } from 'react'
import { ReactComponent as SearchIcon } from "../../../app/assets/icons/search_blue.svg";
import { ReactComponent as ResetIcon } from "../../../app/assets/icons/close.svg";
import { useDispatch, useSelector } from '../../../app/types/hooks';
import { getEventsList } from '../../../app/api/api';
import { searchName } from '../../../app/services/slices/eventsSlice';
import style from "./index.module.scss";

const SearchHeader = () => (
  <div className={style.inputHeader}>
    <input />
    <SearchIcon />
  </div>
);

const SearchEvent = () => {
  const dispatch = useDispatch()
  const { name: value } = useSelector(state => state.events.filters)
  const [inputValue, setInputValue] = useState(value || "")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue !== value) {
      dispatch(searchName(inputValue))
      dispatch(getEventsList())
    }
  }

  const handleReset = () => {
    setInputValue("")
    if (value) {
      dispatch(searchName(""))
      dispatch(getEventsList())
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <form className={style.inputEvents} onSubmit={handleSubmit}>
      <input value={inputValue} onChange={handleChange} />
      <div>
        <button type="button" onClick={handleReset} disabled={!inputValue}>
          <ResetIcon />
        </button>
        <button type="submit" className={(inputValue && inputValue !== value && style.active) || ""}>
          <SearchIcon />
        </button>
      </div>
    </form >
  )
}

export const SearchInput: React.FC<{ type: "events" | "header" }> = ({ type }) => {
  switch (type) {
    case 'events': return <SearchEvent />
    case 'header': return <SearchHeader />
    default: throw Error('SearchInput получил неизветсный type')
  }
}
