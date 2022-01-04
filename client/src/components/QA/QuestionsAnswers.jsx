import React, { useContext, useEffect, useState } from 'react';
import SearchBarQA from './SearchBarQA.jsx';
import LoadMoreQA from './LoadMoreQA.jsx';
import MoreAnsweredQuestionsQA from './MoreAnsweredQuestionsQA.jsx';
import ListQA from './ListQA.jsx';
import { AppContext } from '../app.jsx';
import './QA.css';


const QuestionsAnswers = () => {
  const { currentItem } = useContext(AppContext);

  return (
    <div>
      <h3>Questions & Answers</h3>
      <div>
        <SearchBarQA />
        <ListQA className='align_left' />
      </div>
      <div>
        <LoadMoreQA />
      </div>
      <div>
        <MoreAnsweredQuestionsQA />
      </div>
    </div>
  );
};

export default QuestionsAnswers;
