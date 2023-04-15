import React from 'react';
import {
  useContacts,
  filterFeed,
  clearFilter
} from '../../context/feed/FeedState';
import { useFeed } from '../../context/feed/FeedState';

const FeedFilter = () => {
  // we just need the contact dispatch without state.
  const feedDispatch = useFeed()[1];

  const onChange = (e) => {
    if (e.target.value !== '') {
      filterFeed(feedDispatch, e.target.value);
    } else {
      clearFilter(feedDispatch);
    }
  };

  return (
    <form className='filter-form' onSubmit={(e) => e.preventDefault()}>
      <input type='text' placeholder='Filter Posts...' onChange={onChange} />
    </form>
  );
};

export default FeedFilter;
