import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { addItem, removeItem } from '../app/shoppingListSlice';

const ShoppingList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [productsByCategory, setProductsByCategory] = useState<{
    [key: string]: string[];
  }>({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const shoppingList = useSelector(
    (state: RootState) => state.shoppingList.items
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories. Please try again.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchProducts = async () => {
        try {
          const categoryId = categories.indexOf(selectedCategory) + 1; // Assuming IDs start at 1
          const response = await fetch(
            `http://localhost:5000/api/products/${categoryId}`
          );
          if (!response.ok) throw new Error('Failed to fetch products');
          const data = await response.json();
          setProductsByCategory({
            ...productsByCategory,
            [selectedCategory]: data,
          });
        } catch (err) {
          setError('Failed to load products. Please try again.');
        }
      };

      fetchProducts();
    }
  }, [selectedCategory, categories]);

  const handleAddItem = () => {
    if (selectedCategory && selectedProduct && quantity > 0) {
      dispatch(
        addItem({
          category: selectedCategory,
          product: selectedProduct,
          quantity,
        })
      );
      setSelectedProduct('');
      setQuantity(1);
    }
  };

  const handleRemoveItem = (category: string, product: string) => {
    dispatch(removeItem({ category, product }));
  };

  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = shoppingList.filter((item) => item.category === category);
    return acc;
  }, {} as { [key: string]: typeof shoppingList });

  if (loading) return <div>Loading...</div>;
  if (error) return <div className='error'>{error}</div>;

  return (
    <div className='main-container'>
      <h1>רשימת קניות</h1>
      <div className='selectors'>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedProduct('');
          }}
        >
          <option value='' disabled hidden>
            בחר קטגוריה
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          disabled={!selectedCategory}
        >
          <option value='' disabled hidden>
            בחר מוצר
          </option>
          {selectedCategory &&
            productsByCategory[selectedCategory]?.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
        </select>
        <input
          type='number'
          min='1'
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          disabled={!selectedProduct}
        />
        <button
          onClick={handleAddItem}
          disabled={!selectedProduct || quantity < 1}
        >
          הוסף לרשימת קניות
        </button>
      </div>
      <div className='list'>
        {categories.map(
          (category) =>
            groupedItems[category].length > 0 && (
              <div className='category' key={category}>
                <h2>{category}</h2>
                <ul>
                  {groupedItems[category].map((item, index) => (
                    <li key={index} className='list-item'>
                      <span>
                        {item.product} - {item.quantity}
                      </span>
                      <div
                        className='remove-button'
                        onClick={() =>
                          handleRemoveItem(item.category, item.product)
                        }
                      >
                        <span className='tooltip'>הסר</span>x
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
      {shoppingList.length > 0 && (
        <button className='proceed' onClick={() => navigate('/order')}>
          המשך להזמנה
        </button>
      )}
    </div>
  );
};

export default ShoppingList;
