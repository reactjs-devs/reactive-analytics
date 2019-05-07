import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Downshift from 'downshift'
import React from 'react'
import styled from 'styled-components'
import { search_search } from '../../../__generated__/types'

export interface ISearchBarProps {
  items: search_search[]
  initialItem: search_search | null
  onChange: (symbol: search_search | null) => void
  onTextChange: (text: string) => void
}

const ClearSearch: React.FunctionComponent<{ clearFunction: () => void; style: any }> = props => {
  const clearClick = (e: any) => {
    props.clearFunction()
  }
  return (
    <div style={{ ...props.style, cursor: 'pointer' }} onClick={clearClick}>
      <FontAwesomeIcon icon={faTimes} />
    </div>
  )
}

class SearchInput extends React.Component<ISearchBarProps, {}> {
  constructor(props: ISearchBarProps) {
    super(props)
    this.inputFocus = this.inputFocus.bind(this)
  }
  public searchResultToOptionString = (item: search_search): string => (item ? `${item.id} ${item.name}` : '')

  public inputFocus = (e: any) => {
    e.target.select()
  }

  public render() {
    return (
      <Downshift
        selectedItem={this.props.initialItem}
        onChange={this.props.onChange}
        itemToString={this.searchResultToOptionString}
        defaultHighlightedIndex={0}
      >
        {({ getInputProps, getItemProps, getMenuProps, isOpen, inputValue, clearSelection }) => {
          this.props.onTextChange(inputValue || '')
          return (
            <div
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gridGap: '0.5rem',
              }}
            >
              <ClearSearch
                clearFunction={clearSelection}
                style={{ visibility: inputValue === '' ? 'hidden' : 'visible' }}
              />
              <input
                {...getInputProps({ placeholder: 'Enter a stock or symbol...' })}
                onClick={this.inputFocus}
                onFocus={this.inputFocus}
                style={{ fontSize: '2rem', width: '100%' }}
              />
              {isOpen ? (
                <SearchResults {...getMenuProps()}>
                  {this.renderItems(this.props.items, inputValue, getItemProps)}
                </SearchResults>
              ) : null}
            </div>
          )
        }}
      </Downshift>
    )
  }

  private renderItems(itemsList: search_search[], inputValue: string | null, getItemProps: any) {
    const filteredList = itemsList.filter(
      item => !inputValue || item.id.includes(inputValue) || item.name.includes(inputValue),
    )
    if (filteredList.length === 0) {
      return <SearchResultNoItem>No results found...</SearchResultNoItem>
    }
    return itemsList.map((item, index) => (
      <SearchResultItem key={item.id} {...getItemProps({ index, item })}>
        {item.id.toUpperCase()} - {item.name}
      </SearchResultItem>
    ))
  }
}

const SearchResults = styled.menu`
  position: absolute;
  background: ${props => props.theme.core.darkBackground}E0;
  z-index: 1000;
  border: solid 1px ${({ theme }) => theme.secondary.base};
  border-radius: 5px;
  margin-top: 5px;
  top: 2.25rem;
  left: 0;
  right: 0;
  cursor: pointer;
`
const SearchResultItemBase = styled.div`
  padding: 5px;
`

const SearchResultNoItem = styled(SearchResultItemBase)`
  opacity: 0.59;
`

const SearchResultItem = styled(SearchResultItemBase)`
  padding: 5px;
  &[aria-selected='true'] {
    color: ${({ theme }) => theme.primary.base};
    background: ${({ theme }) => theme.secondary.base};
  }
`

export default SearchInput
