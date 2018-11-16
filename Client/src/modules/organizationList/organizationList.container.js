import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys, lifecycle } from 'recompose';

import OrganizationList from './OrganizationList';
// import { openQuestionDialog, closeQuestionDialog } from '../dialogs';
import {
  initOrganizationList,
  getOrganizationSuggestions,
  sortOrganizationList,
  changeOrganizationListPage,
  deleteOrganization,
} from './organizationList.actions';

const formName = 'organizationList';
// const DELETE_ORGANIZATION_DIALOG = 'DELETE_ORGANIZATION_DIALOG';

const mapStateToProps = (state) => {
  const { limit, page, totalRecord, sorting } = state.organization.list.info;
  console.log('mapStateToProps', );
  return {
    data: state.organization.list.data,

    // gridSetting: {
    //   columns: [
    //     { name: 'id', title: 'Код', width: 100 },
    //     { name: 'name', title: 'Организация', width: 500 },
    //     { name: 'address', title: 'Адрес', width: 500 },
    //   ],

    //   allowAdding: true,
    //   allowEditing: true,
    //   allowDeleting: true,
    //   allowSorting: true,

    //   sorting,

    //   currentPage: page,
    //   pageSize: limit,
    //   totalCount: totalRecord,
    // },

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
  };
};

const mapDispatchToProps = (dispatch, props) => {
  console.log('mapDispatchToProps', );
  return {
    onLoadData: () => dispatch(initOrganizationList()),

    onOrganizationLoadOptions: (value, callback) => dispatch(getOrganizationSuggestions(value, callback)),

    onSortingChange: newSorting => dispatch(sortOrganizationList(newSorting)),
    onChangeCurrentPage: newPage => dispatch(changeOrganizationListPage(newPage)),

    onDoAction: (args) => {
      switch (args.type) {
        case 'adding': {
          props.history.push('/organization/add');
          break;
        }
        case 'editing': {
          props.history.push(`/organization/${args.row.id}`);
          break;
        }
        case 'deleting': {
          // dispatch(openQuestionDialog(DELETE_ORGANIZATION_DIALOG, args));
          break;
        }
        default: break;
      }
    }
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForKeys(['data']),
  lifecycle({
    componentDidMount() {
      this.props.onLoadData();
    }
  }),
)(OrganizationList);
