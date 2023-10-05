import GridDataStore from '../../palmyra/store/GridDataStore';
import Gridx from '../datagrid/Gridx';
import React from 'react';

function PalmyraGridX(props){
  const {target} = props;
  const store = new GridDataStore({target});

  return (
    <Gridx {...props} store={store} />
  )
}

export default PalmyraGridX;