import { createSelector } from 'reselect';

export const fetchingSelector = createSelector(
  [
    state => state.fetching
  ],
  fetching => ((fetching && fetching.some(item => item.value == true)) || false)
);
