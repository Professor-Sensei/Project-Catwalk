import React, { useState } from 'react';

const HelpfulQA = () => {
  const [count, setCount] = useState(0);



  return (
    <div>
      Helpful?
      <span onClick={() => { setCount(count + 1); }}>
        <u>Yes</u> ({`${count}`})
      </span>
    </div>
  );
};

export default HelpfulQA;