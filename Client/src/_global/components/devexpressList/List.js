import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import {
  PagingState,
  CustomPaging,
  SortingState,
  SelectionState,
  EditingState,
  IntegratedSorting, IntegratedSelection
} from '@devexpress/dx-react-grid';
import {
  Grid, Table,
  TableHeaderRow, TableEditColumn, TableEditRow, TableColumnResizing,
  PagingPanel, TableSelection
} from '@devexpress/dx-react-grid-material-ui';
import { onlyUpdateForKeys } from 'recompose';
import { connect } from 'react-redux';

const tableMessages = { noData: 'Нет данных' };

const pagingPanelMessages = {
  showAll: 'Показать все',
  rowsPerPage: 'Кол-во записей на странице',
  info: '{from}-{to} из {count}',
};

const CellDefault = props =>
  <Table.Cell
    {...props}
    style={{
      ...props.style,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'normal',
    }}
  />;
CellDefault.propTypes = {
  style: PropTypes.object
};

const List = ({
  data,
  gridSetting: {
    columns,

    allowAdding, allowEditing, allowDeleting,
    currentPage, pageSize, totalCount,
    allowSorting, sorting,

    enableSelectionState,
    cellComponent,
  },
  defaultColumnWidths,

  onChangeCurrentPage,
  onSortingChange,
  onSelectionChange,

  handleEditingRowsChange,
  handleAddedRowsChange,
  handleCommitChanges,

  AddButton, EditButton, DeleteButton, CommitButton, CancelButton
}) => {
  // const Command = ({ id, onExecute }) => {
  //   const commandComponents = {
  //     add: AddButton,
  //     edit: EditButton,
  //     delete: DeleteButton,
  //     commit: CommitButton,
  //     cancel: CancelButton,
  //   };
  //   const CommandButton = commandComponents[id];

  //   return (<CommandButton onExecute={onExecute} />);
  // };
  // Command.propTypes = {
  //   id: PropTypes.string,
  //   onExecute: PropTypes.func
  // };

  console.log('List render', );

  return (
    <div>ddd</div>
  // <Grid
  //   rows={data}
  //   columns={columns}
  // >
  //   {/* <SelectionState onSelectionChange={onSelectionChange}/>
  //   <IntegratedSelection/> */}

  //   <Table
  //     columnExtensions={defaultColumnWidths}
  //     messages={tableMessages}
  //     cellComponent={cellComponent || CellDefault}
  //   />
  //   {/* <SortingState
  //     sorting={sorting}
  //     onSortingChange={onSortingChange}
  //   />
  //   <IntegratedSorting />

  //   <PagingState
  //     currentPage={currentPage}
  //     onCurrentPageChange={onChangeCurrentPage}
  //     pageSize={pageSize}
  //   />
  //   <CustomPaging totalCount={totalCount}/>
  //   {
  //     totalCount &&
  //     <PagingPanel
  //       messages={pagingPanelMessages}
  //     />
  //   }
  //   <TableColumnResizing defaultColumnWidths={defaultColumnWidths}/>
  //   <TableHeaderRow showSortingControls={allowSorting}/>
  //   {
  //     enableSelectionState &&
  //     <Fragment>
  //       <TableSelection
  //         showSelectAll
  //         selectByRowClick
  //         highlightRow
  //       />
  //     </Fragment>
  //   }
  //   <EditingState
  //     // editingRowIds={[]}
  //     // addedRows={[]}
  //     onEditingRowIdsChange={handleEditingRowsChange}
  //     onAddedRowsChange={handleAddedRowsChange}
  //     onCommitChanges={handleCommitChanges}
  //   />
  //   <TableEditRow />
  //   {
  //     (allowAdding || allowEditing || allowDeleting) &&
  //     <Fragment>
  //       <TableEditColumn
  //         showAddCommand={allowAdding}
  //         showEditCommand={allowEditing}
  //         showDeleteCommand={allowDeleting}
  //         commandComponent={Command}
  //       />
  //     </Fragment>
  //   } */}
  // </Grid>
  );
};

List.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  gridSetting: PropTypes.object.isRequired,
  defaultColumnWidths: PropTypes.array,
  onChangeCurrentPage: PropTypes.func,
  onSortingChange: PropTypes.func,
  onSelectionChange: PropTypes.func,

  AddButton: PropTypes.any,
  EditButton: PropTypes.any,
  DeleteButton: PropTypes.any,
  CommitButton: PropTypes.any,
  CancelButton: PropTypes.any,

  handleEditingRowsChange: PropTypes.func,
  handleAddedRowsChange: PropTypes.func,
  handleCommitChanges: PropTypes.func,
};

export default compose(
  connect((_, props) => {
    return {
      data: props.gridSetting.data || [],
      defaultColumnWidths: props.gridSetting.columns.map(item => ({ columnName: item.name, width: item.width }))
    };
  }),
  onlyUpdateForKeys([]),
  withHandlers({
    handleEditingRowsChange: props => editingRows => {
      const tableRow = editingRows[editingRows.length - 1];
      props.onDoAction({ type: 'editing', tableRow, row: props.data[tableRow] });
    },
    handleAddedRowsChange: props => () => {
      props.onDoAction({ type: 'adding' });
    },
    handleCommitChanges: props => ({deleted}) => {
      if (deleted) {
        const tableRow = deleted[deleted.length - 1];
        props.onDoAction({ type: 'deleting', tableRow, row: props.data[tableRow] });
      }
    },
  }),
)(List);
