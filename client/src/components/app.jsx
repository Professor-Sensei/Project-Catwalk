import React, { useState, createContext, useEffect } from 'react';
import { API_KEY } from '../../../config/config.js';
<<<<<<< HEAD
=======
import QuestionsAnswers from './QA/QuestionsAnswers.jsx';
>>>>>>> bbfd314d9dc19bf452529dedf8d8ac566d1f35fb
import Reviews from './R&R/Reviews.jsx';
import RatingBreakdown from './R&R/RatingBreakdown.jsx';
import RelatedProducts from './related/related_products/RelatedProducts.jsx';
import Outfits from './related/outfits/Outfits.jsx';
<<<<<<< HEAD
import apiCall from './apiCall.js';

import {
  AddToCart,
  ProductInfo,
  ImageGallery,
} from './ProductDetails/expandedInfo.js';

=======
import ProductInfo from './ProductDetails/expandedInfo.jsx';
>>>>>>> bbfd314d9dc19bf452529dedf8d8ac566d1f35fb
import axios from 'axios';

export const AppContext = createContext(null);

const App = function () {
  const [currentItem, setCurrentItem] = useState({ id: 40346 });
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
        return response.data[3].id;
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

  return (
    <AppContext.Provider
      value={{ currentItem, setCurrentItem, allProducts, setAllProducts }}
    >
      <div>
        <ProductInfo />
        <RelatedProducts />
        <Outfits />
        <QuestionsAnswers />
        <Reviews />
      </div>
    </AppContext.Provider>
  );
};

export default App;
