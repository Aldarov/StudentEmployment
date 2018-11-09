import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys, lifecycle } from 'recompose';

import OrganizationList from './OrganizationList';
// import { openQuestionDialog, closeQuestionDialog } from '../dialogs';
import {
  initOrganizationList,
  deleteOrganization,
  getOrganizationSuggestions,
} from './organizationList.actions';

const formName = 'organizationList';
const DELETE_ORGANIZATION_DIALOG = 'DELETE_ORGANIZATION_DIALOG';

const mapStateToProps = (state, props) => {
  return {
    data: state.organization.list.data,
    // selectValue: { label: 'ГБУЗ "Бурятская республиканская станция переливания крови Министерства здравоохранения РБ"', value: 86}

    // deleteOrganizationDialogProps: {
    //   dialogName: DELETE_ORGANIZATION_DIALOG,
    //   contentText: 'Удалить данную запись?',
    //   onYes: (args) => {
    //     dispatch(deleteOrganization(args.row.id), formName);
    //     dispatch(closeQuestionDialog(DELETE_ORGANIZATION_DIALOG));
    //   },
    //   onNo: () => {
    //     dispatch(closeQuestionDialog(DELETE_ORGANIZATION_DIALOG));
    //   }
    // },

    // gridSetting: {
    //   columns: [
    //     { name: 'id', title: 'Код' },
    //     { name: 'name', title: 'Организация' },
    //     { name: 'address', title: 'Адрес' },
    //   ],
    //   defaultColumnWidths: [
    //     { columnName: 'id', width: 100 },
    //     { columnName: 'name', width: 500 },
    //     { columnName: 'address', width: 500 },
    //   ],

    //   allowAdding: true,
    //   allowEditing: true,
    //   allowDeleting: true,

    //   allowSorting: true,
    //   sorting: sorting,
    //   onSortingChange: newSorting => {
    //     dispatch(getOrganizationList({ limit, page, sorting: newSorting }, formName));
    //   },

    //   currentPage: page,
    //   pageSize: limit,
    //   totalCount: totalRecord,
    //   onChangeCurrentPage: (newPage) => {
    //     if (newPage != page ) {
    //       dispatch(getOrganizationList({ limit, page: newPage, sorting }, formName));
    //     }
    //   },

    //   onDoAction: (args) => {
    //     switch (args.type) {
    //       case 'adding': {
    //         ownProps.history.push('/organization/add');
    //         break;
    //       }
    //       case 'editing': {
    //         ownProps.history.push(`/organization/${args.row.id}`);
    //         break;
    //       }
    //       case 'deleting': {
    //         dispatch(openQuestionDialog(DELETE_ORGANIZATION_DIALOG, args));
    //         break;
    //       }
    //       default: break;
    //     }
    //   }
    // }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadData: () => dispatch(initOrganizationList()),

    onLoadOptions: (value, callback) => dispatch(getOrganizationSuggestions(value, callback)),
    onSelectChange: value => {
      console.log('onSelectChange', value);
      // dispatch(getOrganizationListSuggestion(value));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForKeys([]),
  lifecycle({
    componentDidMount() {
      this.props.onLoadData();
    }
  }),
)(OrganizationList);
