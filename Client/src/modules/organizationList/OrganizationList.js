// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';

// import { Layout } from '../layout';
// import { QuestionDialog } from '../dialogs';
// import { organizationListStyles } from './styles';
// import List from '../_global/components/List';
// import Autocomplete from '../_global/components/Autocomplete';
// import { AddButton, EditButton, DeleteButton } from './components/Buttons';

// @withStyles(organizationListStyles)
// class OrganizationList extends Component {
//   componentWillMount() {
//     this.props.onLoadData();
//   }

//   render() {
//     const {
//       classes,
//       formName,
//       headerProps,
//       deleteOrganizationDialogProps,
//       data,
//       gridSetting,
//       searchSuggestions,
//       onSuggestionsFetchRequested, onSuggestionsClearRequested,
//       onSuggestionSelected, onClearSuggestionSelected,
//     } = this.props;

//     return (
//       <Layout
//         formName={formName}
//         headerProps={headerProps}
//       >
//         <Autocomplete
//           inputProps={{
//             autoFocus: false,
//             className: classes.autocomplete,
//             label: 'Поиск',
//             placeholder: 'Введите значения через пробел',
//           }}
//           suggestions={searchSuggestions}
//           onSuggestionsFetchRequested={onSuggestionsFetchRequested}
//           onSuggestionsClearRequested={onSuggestionsClearRequested}
//           onSuggestionSelected={onSuggestionSelected}
//           onClearSelectedSuggestion={onClearSuggestionSelected}
//         />
//         <List
//           data={data}
//           gridSetting={gridSetting}
//           AddButton={AddButton}
//           EditButton={EditButton}
//           DeleteButton={DeleteButton}
//         />
//         <QuestionDialog dialogProps={deleteOrganizationDialogProps} />
//       </Layout>
//     );
//   }
// }

// OrganizationList.propTypes = {
//   classes: PropTypes.object,
//   formName: PropTypes.string,
//   headerProps: PropTypes.object,
//   deleteOrganizationDialogProps: PropTypes.object,

//   onLoadData: PropTypes.func,
//   data: PropTypes.array,
//   gridSetting: PropTypes.object,

//   //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
//   searchSuggestions: PropTypes.array,
//   onSuggestionsFetchRequested: PropTypes.func,
//   onSuggestionsClearRequested: PropTypes.func,
//   onSuggestionSelected: PropTypes.func,
//   onClearSuggestionSelected: PropTypes.func
// };

// export default OrganizationList;

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Layout } from '../../_global/modules/layout';
import Title from '../../_global/components/Title';
import Autocomplete from '../../_global/components/autocomplete';
import { AddButton, EditButton, DeleteButton } from './Buttons';
import List from '../../_global/components/devexpressList';

// import { QuestionDialog } from '../dialogs';

// const HeaderCenterPart = () => ;

const OrganizationList = ({
  classes,
  gridSetting, onChangeCurrentPage, onSortingChange, onSelectionChange, onDoAction,
  onOrganizationLoadOptions, onOrganizationSelectChange
}) => {
  console.log('OrganizationList render', gridSetting);
  return (
    <Layout
      headerCenterPart={<Title title='Организации'/>}
    >
      <Autocomplete
        className={classes.autocomplete}
        label='Организация'
        placeholder='Введите значения через пробел'
        onLoadOptions={onOrganizationLoadOptions}
        onChange={onOrganizationSelectChange}
      />
      <List
        gridSetting={gridSetting}
        AddButton={AddButton}
        EditButton={EditButton}
        DeleteButton={DeleteButton}
        onChangeCurrentPage={onChangeCurrentPage}
        onSortingChange={onSortingChange}
        onSelectionChange={onSelectionChange}
        onDoAction={onDoAction}
      />
    </Layout>
  );
};

OrganizationList.propTypes = {
  classes: PropTypes.object,
  deleteOrganizationDialogProps: PropTypes.object,

  gridSetting: PropTypes.object,
  onChangeCurrentPage: PropTypes.func,
  onSortingChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onDoAction: PropTypes.func,

  onOrganizationLoadOptions: PropTypes.func,
  onOrganizationSelectChange: PropTypes.func,
};

export default withStyles(theme => ({
  autocomplete: {
    width: 600,
    [theme.breakpoints.down('sm')]: {
      width: 350,
    },
    marginBottom: theme.spacing.unit,
  },
}))(OrganizationList);
