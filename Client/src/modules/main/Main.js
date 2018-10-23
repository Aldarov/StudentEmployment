import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Layout } from '../../_global/modules/layout';
import DeleteDialog from './dialogs/DeleteDialog';
import { ModalDialog } from '../../_global/modules/dialogs';

const Main = ({ classes,
  onDialogOpen,
  // modalDialogOpened, modalDialogOnClose, modalDialogTitle
}) => {
  return (
    <Layout
      // headerLeftPart={<IconBtn iconName='Menu' onClick={onHeaderLeftButtonClick}/>}
      // headerCenterPart={<Title title='Main!!!'/>}
      // headerRightPart={
      //   <Button
      //     className={classNames(classes.menuButton, !rightButtonDisabled && classes.buttonColor)}
      //     onClick={onHeaderRightButtonClick}
      //     disabled={rightButtonDisabled}
      //   >
      //     Сохранить
      //   </Button>
      // }
    >
      <div className={classes.main}>
        Main
        <Button onClick={onDialogOpen(111)} color="secondary">
          Open
        </Button>
        <DeleteDialog/>
        {/* <ModalDialog
          opened={modalDialogOpened}
          onClose={modalDialogOnClose('data!')}
          title={modalDialogTitle}
        >
          Hello!!!!
        </ModalDialog> */}
      </div>
    </Layout>
  );
};

Main.propTypes = {
  classes: PropTypes.object,
  onHeaderLeftButtonClick: PropTypes.func,
  onDialogOpen: PropTypes.func,
  modalDialogOpened: PropTypes.bool,
  modalDialogOnClose: PropTypes.func,
  modalDialogTitle: PropTypes.string,
};

export default withStyles(() => ({
  main: {
    fontSize: 30,
    color: 'red'
  },
}))(Main);
