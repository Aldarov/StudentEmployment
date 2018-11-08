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
// import Autocomplete from '../../_global/components/Autocomplete';
import Autocomplete from '../../_global/components/selectNew';
// import Select from '../../_global/components/Select';
// import { QuestionDialog } from '../dialogs';

const OrganizationList = ({
  classes,
  data,
  gridSetting,
  searchSuggestions,
  onSuggestionsFetchRequested, onSuggestionsClearRequested,
  onSuggestionSelected, onClearSuggestionSelected,
  onLoadOptions, selectValue, onSelectChange
}) => {
  return (
    <Layout
      headerCenterPart={<Title title='Организации'/>}
    >
      {/* <Autocomplete
        inputProps={{
          autoFocus: false,
          className: classes.autocomplete,
          label: 'Поиск',
          placeholder: 'Введите значения через пробел',
        }}
        suggestions={searchSuggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        onClearSelectedSuggestion={onClearSuggestionSelected}
      /> */}
      <Autocomplete
        label='Организация'
        placeholder='Введите значения через пробел'
        onLoadOptions={onLoadOptions}
        value={selectValue}
        onChange={onSelectChange}
        className={classes.autocomplete}
      />
    </Layout>
  );
};

OrganizationList.propTypes = {
  classes: PropTypes.object,
  // headerProps: PropTypes.object,
  deleteOrganizationDialogProps: PropTypes.object,

  onLoadData: PropTypes.func,
  data: PropTypes.array,
  gridSetting: PropTypes.object,

  searchSuggestions: PropTypes.array, //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  onClearSuggestionSelected: PropTypes.func,

  onLoadOptions: PropTypes.func,
  selectValue: PropTypes.object,
  onSelectChange: PropTypes.func,
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
