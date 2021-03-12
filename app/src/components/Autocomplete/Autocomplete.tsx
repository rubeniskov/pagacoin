import React, { useState, useRef, useCallback, InputHTMLAttributes } from 'react';
import TextField, { TextFielProps } from '../Field/TextField';
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
  max-height: 10rem;
  overflow: scroll;
`

const AutocompletePopoverViewport = styled.div``

const AutocompleteItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${(({ theme }) => theme.color.primary.darken )};
    color: white;
  }
`

export type AutocompleteProps = TextFielProps & {
  suggestions?: Array<any>,
  formatValue?: (v: any) => string
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions = [],
  formatValue = (v) => `${v}`,
  onSelect,
  ...restProps
}) => {
  const inputRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSelect = useCallback((evt) => {
    if (typeof onSelect === 'function') {
      onSelect(evt, suggestions[evt.target.tabIndex]);
    }
  }, [suggestions, onSelect]);

  const handleFocus = () => {
    setShowSuggestions(true);
  }

  const handleBlur = (evt) => {
    setTimeout(() => setShowSuggestions(false), 200);
  }

  return (
    <AutocompleteContainer>
      <TextField ref={inputRef} {...restProps} onFocus={handleFocus} onBlur={handleBlur}/> 
      {showSuggestions && !!suggestions.length && 
      <AutocompletePopover>
        <AutocompletePopoverViewport>
          {suggestions.map((suggestion, idx) => (
            <AutocompleteItem 
              role="button" 
              key={idx} 
              tabIndex={idx} 
              onClick={handleSelect}>
                {formatValue(suggestion)}
            </AutocompleteItem>
          ))}
        </AutocompletePopoverViewport>
      </AutocompletePopover>}
    </AutocompleteContainer>
  )
}

export default Autocomplete;
