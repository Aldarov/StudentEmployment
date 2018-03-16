import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { Layout } from '../layout';
import { QuestionDialog } from '../dialogs';
import { employmentListStyles } from './styles';
import List from '../_global/components/List';
import Autocomplete from '../_global/components/Autocomplete';
import { AddButton, EditButton, DeleteButton } from './components/Buttons';

@withStyles(employmentListStyles)
class EmploymentList extends Component {
  componentWillMount() {
    this.props.onLoadData();
  }

  render() {
    const {
      classes,
      formName,
      headerProps,
      deleteEmploymentDialogProps,
      data, gridSetting,
      searchSuggestions,
      onSuggestionsFetchRequested, onSuggestionsClearRequested,
      onSuggestionSelected, onClearSuggestionSelected,
    } = this.props;

    return (
      <Layout
        formName={formName}
        headerProps={headerProps}
      >
        <Autocomplete
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
        />
        <List
          data={data}
          gridSetting={gridSetting}
          AddButton={AddButton}
          EditButton={EditButton}
          DeleteButton={DeleteButton}
        />
        <QuestionDialog dialogProps={deleteEmploymentDialogProps} />
      </Layout>
    );
  }
}

EmploymentList.propTypes = {
  classes: PropTypes.object,
  formName: PropTypes.string,
  headerProps: PropTypes.object,
  deleteEmploymentDialogProps: PropTypes.object,
  onLoadData: PropTypes.func,
  data: PropTypes.array,
  gridSetting: PropTypes.object,

  //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
  searchSuggestions: PropTypes.array,
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  onClearSuggestionSelected: PropTypes.func,
};

export default EmploymentList;
