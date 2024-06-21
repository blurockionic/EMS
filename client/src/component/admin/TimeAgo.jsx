import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [date]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
