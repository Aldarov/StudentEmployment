import { createSelector } from 'reselect';

const dialogSelector = createSelector(
  [
    state => state.dialogs,
    (_, props) => props.dialogName
  ],
  (dialogs, dialogName) => dialogs.filter(item => item.dialogName === dialogName)[0]
);

export const openDialogSelector = createSelector(
  [
    dialogSelector
  ],
  dialog => (dialog && dialog.open) || false
);

export const argsDialogSelector = createSelector(
  [
    dialogSelector
  ],
  dialog => (dialog && dialog.args) || null
);
