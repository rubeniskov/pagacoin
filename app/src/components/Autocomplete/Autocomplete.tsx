import React, { useState, useRef, useCallback } from 'react';
import TextField from '../Field/TextField';
import styled from 'styled-components';


const AutocompleteContainer = styled.div`
  position: relative;
`

const AutocompletePopover = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
  border: solid 1px #efefef;
  border-radius: 5px;
  margin-top: 0.5rem;
  z-index: 99;
`

const AutocompleteItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${(({ theme }) => theme.color.primary.darken )};
    color: white;
  }
`

const Autocomplete = ({
  suggestions,
  formatSuggestion = (v) => `${v}`,
  onSelect,
  ...restProps
}) => {
  const inputRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const handleSelect = useCallback((evt, suggestion) => {
    if (typeof onSelect === 'function') {
      onSelect(evt, suggestions[evt.target.tabIndex]);
    }
  }, [suggestions, onSelect]);

  const handleFocus = () => {
    setShowSuggestions(true);
  }

  const handleBlur = () => {
    setShowSuggestions(false);
  }

  return (
    <AutocompleteContainer>
      <TextField ref={inputRef} {...restProps} onFocus={handleFocus} onBlur={handleBlur}/> 
      {showSuggestions && !!suggestions.length && 
      <AutocompletePopover>
        {suggestions.map((suggestion, idx) => {
          return <AutocompleteItem tabIndex={idx} onClick={handleSelect}>{formatSuggestion(suggestion)}</AutocompleteItem>
        })}
      </AutocompletePopover>}
    </AutocompleteContainer>
  )
}

export default Autocomplete;
