import { useEffect, useState } from 'react';
import axios from 'axios';
export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        'http://127.0.0.1:8080/api/category/get-all-category'
      );
      setCategories(data?.categories);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return categories;
}
