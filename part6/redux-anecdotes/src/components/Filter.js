import React from 'react';
import { connect } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  // const filter = useSelector((state) => state.filter);
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    // dispatch(setFilter(event.target.value));
    props.setFilter(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input value={props.filter} onChange={handleChange} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  setFilter,
};

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default ConnectedFilter;
