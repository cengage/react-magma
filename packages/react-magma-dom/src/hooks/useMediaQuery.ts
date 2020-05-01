import React from 'react';

export function useMediaQuery(queryInput) {
  const query = queryInput.replace(/^@media( ?)/m, '');

  const supportMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

  const matchMedia = supportMatchMedia ? window.matchMedia : null;

  const [match, setMatch] = React.useState(() => {
    if (supportMatchMedia) {
      return matchMedia(query).matches;
    }

    return false;
  });

  React.useEffect(() => {
    let active = true;

    if (!supportMatchMedia) {
      return undefined;
    }

    const queryList = matchMedia(query);

    const updateMatch = () => {
      if (active) {
        setMatch(queryList.matches);
      }
    };

    updateMatch();
    queryList.addEventListener('change', updateMatch);

    return () => {
      active = false;
      queryList.removeEventListener('change', updateMatch);
    };
  }, [query, matchMedia, supportMatchMedia]);

  return match;
}
