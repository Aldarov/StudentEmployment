import { createSelector } from 'reselect';

export const leftPartHeaderSelector = createSelector(
  [
    (_, props) => props.leftPart
  ],
  leftPart => leftPart
);

export const centerPartHeaderSelector = createSelector(
  [
    (_, props) => props.centerPart
  ],
  centerPart => centerPart
);

export const rightPartHeaderSelector = createSelector(
  [
    (_, props) => props.rightPart
  ],
  rightPart => rightPart
);
