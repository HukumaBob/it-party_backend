import React, {useState} from 'react';
import {ReactComponent as SearchIcon} from "../../app/assets/icons/search.svg";
import {ReactComponent as ResetIcon} from "../../app/assets/icons/close.svg";
import {useDispatch, useSelector} from '../../app/types/hooks';
import {setNameFilter} from '../../app/services/slices/eventListSlice';
import style from "./index.module.scss";

export const FilterSearch = () => {
  const dispatch = useDispatch()
  const {name: value} = useSelector(state => state.eventList.filters)
  const [inputValue, setInputValue] = useState(value || "")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue !== value) {
      dispatch(setNameFilter(inputValue))
    }
  }

  const handleReset = () => {
    setInputValue("")
    if (value) {
      dispatch(setNameFilter(""))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <form className={style.inputEvents} onSubmit={handleSubmit}>
      <input value={inputValue} onChange={handleChange}/>
      <div>
        <button type="button" onClick={handleReset} disabled={!inputValue}>
          <ResetIcon/>
        </button>
        <button type="submit" className={(inputValue && inputValue !== value && style.active) || ""}>
          <SearchIcon/>
        </button>
      </div>
    </form>
  )
}
