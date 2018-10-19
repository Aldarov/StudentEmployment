import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Layout } from '../../_global/modules/layout';

const Main = ({ classes }) => {
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
      </div>
    </Layout>
  );
};

Main.propTypes = {
  classes: PropTypes.object,
  onHeaderLeftButtonClick: PropTypes.func,
};

export default withStyles(() => ({
  main: {
    fontSize: 30,
    color: 'red'
  },
}))(Main);
