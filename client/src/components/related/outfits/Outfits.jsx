/* eslint-disable indent */
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmarkCircle,
  faSquarePlus,
} from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import sampleData from '../sampleData.js';
import { AppContext } from '../../app.jsx';
import '../related_products//RelatedProducts.css';
import HalfRating from '../../R&R/Stars.jsx';
import OutfitCard from './OutfitCard.jsx';

const Outfits = () => {
  const { currentItem, outfits, addOutfit, removeOutfit } =
    useContext(AppContext);
  const [firstShowIndex, setFirstShowIndex] = useState(0);

  const prevClick = () => {
    setFirstShowIndex(firstShowIndex - 2);
  };

  const nextClick = () => {
    setFirstShowIndex(firstShowIndex + 2);
  };

  return (
    <>
      <h2 className='riocTitle'>Outfits</h2>
      <div className='productsCardContainer'>
        {firstShowIndex !== 0 && (
          <span
            className='prevArrow'
            onClick={() => {
              prevClick();
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        )}
        <div className='gridContainer'>
          {firstShowIndex === 0 && (
            <div className='card card__body'>
              <div className='add_a_outfit'>Add a Outfit</div>
              <div
                className='add_outfit_Btn'
                onClick={() => {
                  addOutfit();
                }}
              >
                <FontAwesomeIcon icon={faSquarePlus} className='plusIcon' />
              </div>
            </div>
          )}
          {outfits.slice(firstShowIndex, firstShowIndex + 2).map((id) => (
            <div className='card' key={id}>
              <span
                className='icon-tag'
                onClick={() => {
                  removeOutfit(Number(id));
                }}
              >
                <FontAwesomeIcon icon={faXmarkCircle} className='xIcon' />
              </span>
              <OutfitCard productId={id} />
            </div>
          ))}
        </div>
        {firstShowIndex !== outfits.length - 2 &&
        outfits.length - firstShowIndex > 2 ? (
          <span
            className='nextArrow'
            onClick={() => {
              nextClick();
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Outfits;
