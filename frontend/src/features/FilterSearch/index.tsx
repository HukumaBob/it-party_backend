import React, {useState} from 'react';
import SearchIcon from "../../app/assets/icons/search.svg?react";
import ResetIcon from "../../app/assets/icons/close.svg?react";
import {useAppDispatch, useAppSelector} from '../../app/services/hooks.ts';
import {setNameFilter} from '../../app/services/slices/eventListSlice';
import style from "./index.module.scss";

export const FilterSearch = () => {
  const dispatch = useAppDispatch()
  const {name: value} = useAppSelector(state => state.eventList.filters)
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
