import Downshift, { GetItemPropsOptions } from 'downshift'
import React from 'react'
import { search_symbols as SearchResult, MarketSegment } from '../../../__generated__/types'
import { fonts } from 'rt-theme/fonts'
import styled from 'styled-components/macro'
interface ISearchBarProps {
  items: SearchResult[]
  initialItem: SearchResult | null
  maxItems?: number
  onChange: (symbol: SearchResult | null) => void
  onTextChange: (text: string) => void
  placeholder: string
}

interface SearchResultWithIndex extends SearchResult {
  index: number
}

const getItemId = ({ id, marketSegment }: SearchResult) => {
  if (marketSegment && marketSegment.toUpperCase() === MarketSegment.FX) {
    return `${id.slice(0, 3)}/${id.slice(3)}`
  }
  return id
}

const searchResultToOptionString = (item: SearchResult | null): string => {
  return item ? `${getItemId(item)} - ${item.name}` : ''
}

const SearchInput: React.FC<ISearchBarProps> = ({
  initialItem,
  placeholder,
  items,
  maxItems,
  onChange,
  onTextChange,
}) => {
  const renderItems = (getItemProps: (options: GetItemPropsOptions<SearchResult>) => any) => {
    if (items.length === 0) {
      return <SearchResultNoItem>No results found...</SearchResultNoItem>
    }

    const marketSegments = items
      .filter(i => i.marketSegment)
      .reduce((acc, searchResult, index) => {
        if (acc[searchResult.marketSegment]) {
          acc[searchResult.marketSegment].push({ ...searchResult, index })
          return acc
        }
        acc[searchResult.marketSegment] = [{ ...searchResult, index }]
        return acc
      }, {})

    return Object.keys(marketSegments).map((segment, i) => {
      return (
        <div key={i}>
          <SegmentLabel>{segment === 'FX' ? segment : segment.toLowerCase()}</SegmentLabel>
          {marketSegments[segment].map((item: SearchResultWithIndex) => (
            <SearchResultItem key={item.id} {...getItemProps({ index: item.index, item })}>
              {getItemId(item)} - {item.name}
            </SearchResultItem>
          ))}
        </div>
      )
    })
  }

  return (
    <Downshift
      selectedItem={initialItem}
      onChange={onChange}
      itemToString={searchResultToOptionString}
      defaultHighlightedIndex={0}
    >
      {({ getInputProps, getItemProps, getMenuProps, getRootProps, isOpen, selectedItem, inputValue }) => {
        onTextChange(inputValue || '')
        return (
          <SearchWrapper {...getRootProps()}>
            <input
              {...getInputProps({ placeholder: placeholder })}
              style={{ width: '100%' }}
              autoFocus={true}
              spellCheck={false}
            />
            {isOpen ? <SearchResults {...getMenuProps()}>{renderItems(getItemProps)}</SearchResults> : null}
          </SearchWrapper>
        )
      }}
    </Downshift>
  )
}

const SearchWrapper = styled.div`
  align-items: center;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr auto;
  position: relative;
  font-family: ${fonts.primaryFontFamily};
  & svg {
    color: ${({ theme }) => theme.secondary.coreSecondary};
  }
  > input {
    font-family: ${fonts.secondaryFontFamily};
    color: ${({ theme }) => theme.textColorPrimary};
  }
`

const SearchResults = styled.menu`
  position: absolute;
  background: ${({ theme }) => theme.secondary.coreSecondary};
  z-index: 1000;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.accents.shadow};
  margin-top: 5px;
  top: 2.25rem;
  left: 0;
  right: 0;
  cursor: pointer;
  padding: 8px;
`

const SegmentLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #7f7f7f;
  border-bottom: #eaebeb;
  text-transform: capitalize;
  padding-left: 8px;
  border-bottom: 1px solid #eaebeb;
`

const SearchResultItemBase = styled.div`
  padding: 5px;
`

const SearchResultNoItem = styled(SearchResultItemBase)`
  opacity: 0.59;
`

const SearchResultItem = styled(SearchResultItemBase)`
  padding: 2px;
  padding-left: 12px;
  margin: 2px 0;
  font-size: 16px;
  line-height: 2.5;
  font-color: ${({ theme }) => theme.secondary.coreSecondary5};

  > small {
    display: inline-block;
    font-size: 0.5em;
    padding-right: 5px;
  }
  &[aria-selected='true'] {
    color: ${({ theme }) => theme.primary.corePrimary};
    background: ${({ theme }) => theme.secondary.coreSecondary2};
    border-radius: 12px;
  }
`

export default SearchInput
