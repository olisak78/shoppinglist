import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { API_LIST_URL, API_URL } from '../app/data';

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
  });
  const [submissionError, setSubmissionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const shoppingList = useSelector(
    (state: RootState) => state.shoppingList.items
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_LIST_URL}api/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setFetchError('Failed to load categories. Please try again.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSubmissionError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, shoppingList }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit order');
      }
      const result = await response.json();
      setSuccessMessage(result.message || 'Order submitted successfully!');
      setFormData({ fullName: '', address: '', email: '' });
      dispatch({ type: 'shoppingList/clearItems' });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setSubmissionError('Failed to submit order. Please try again.');
    }
  };

  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = shoppingList.filter((item) => item.category === category);
    return acc;
  }, {} as { [key: string]: typeof shoppingList });

  if (loading) return <div>Loading...</div>;
  if (fetchError) return <div className='error'>{fetchError}</div>;

  return (
    <div className='order-container'>
      <h1>סיכום הזמנה</h1>
      {(submissionError || successMessage) && (
        <div className={submissionError ? 'alert error' : 'alert success'}>
          {submissionError || successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='fullName'>שם מלא</label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>כתובת</label>
          <input
            type='text'
            id='address'
            name='address'
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>דואר אלקטרוני</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        {submissionError && (
          <span className='error submission-error'>{submissionError}</span>
        )}
        <div className='order-list'>
          <h2>רשימת קניות </h2>
          <div className='order-list-container'>
            {categories.map(
              (category) =>
                groupedItems[category].length > 0 && (
                  <div className='category' key={category}>
                    <h3>{category}</h3>
                    <ul>
                      {groupedItems[category].map((item, index) => (
                        <li key={index} className='list-item'>
                          <span>
                            {item.product} - {item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        </div>
        <button className='order-submit-button' type='submit'>
          אשר הזמנה
        </button>
      </form>
      <button className='back' onClick={() => navigate('/')}>
        בחזרה לרשימת הקניות
      </button>
    </div>
  );
};

export default OrderForm;
