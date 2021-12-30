import React, { useState, createContext, useEffect } from 'react';
import { API_KEY } from '../../../config/config.js';
import apiCall from './apiCall.js';

import {
  AddToCart,
  ProductInfo,
  ImageGallery,
} from './ProductDetails/expandedInfo.js';

import { startSession } from 'mongoose';
import axios from 'axios';

export const AppContext = createContext(null);

const App = function () {
  const [currentItem, setCurrentItem] = useState({});
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/', {
        headers: {
          Authorization: API_KEY,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setAllProducts(response.data);
        console.log('allProducts updated');
        return response.data[0].id;
      })
      .then((id) => {
        axios
          .get(
            `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
            {
              headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => {
            setCurrentItem(response.data);
            console.log('currentItem updated');
          });
      });
  }, []);

  // useEffect(
  //   (productId) => {
  //     axios
  //       .get(
  //         'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/' +
  //           productId,
  //         {
  //           headers: {
  //             Authorization: API_KEY,
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       )
  //       .then((data) => {
  //         setCurrentItem(data);
  //         console.log('currentItem: ', currentItem);
  //       });
  //   },
  //   [allProducts]
  // );

  return (
    <AppContext.Provider
      value={(currentItem, setCurrentItem, allProducts, setAllProducts)}
    >
      <div>
        {console.log(currentItem)}
        <ImageGallery />
        <AddToCart />
      </div>
      <ProductInfo />
    </AppContext.Provider>
  );
};

export default App;
