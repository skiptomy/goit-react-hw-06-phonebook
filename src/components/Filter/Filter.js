import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ filter, filterInput }) => (
  <div className={styles.filterInput}>
    <label>
      Find contacts by name
      <input
        className={styles.filterInput}
        type="text"
        placeholder="Add your search..."
        value={filter}
        name="filter"
        onChange={e => filterInput(e.target.value)}
      />
    </label>
  </div>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  filterInput: PropTypes.elementType.isRequired,
};

export default Filter;
