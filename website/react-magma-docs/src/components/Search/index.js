import React from 'react';

export const Search = () => {
  const timer = React.useRef({})
  const [isFocused, setIsFocused] = React.useState()

  React.useEffect(() => {
    window.docsearch({
      apiKey: "d7c2a125c1c3dde0b7a885c1382f3f65",
      indexName: "react-magma-cengage",
      inputSelector: "#algolia-doc-search",
      appId:"N1NELVWDHC",
    })
    setIsFocused(false)

    return () => {
      clearTimeout(timer.current)
      setIsFocused(false)
    }
  }, [])

  return (
    <>
      <form className='searchForm'>
        <input
          className='searchBar'
          spellCheck="false"
          type="search"
          aria-label="search input"
          id="algolia-doc-search"
          onFocus={() =>
            setIsFocused(true)
          }
          onBlur={() => {
            timer.current && clearTimeout(timer.current)
            timer.current = setTimeout(
              () =>
                setIsFocused(false),
              310
            )
          }}
        />
        {!isFocused && (
          <span className='search icon' />
        )}
      </form>
      <input type="hidden" id="fakeSearch" />
    </>
  )
}
