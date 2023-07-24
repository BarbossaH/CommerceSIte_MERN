import axios from 'axios';
import { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [keywords, setKeywords] = useState('');
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (keywords) {
        const { data } = await axios.get(
          `http://127.0.0.1:8080/api/product/search/${keywords}`
        );
        setSearch({ ...search, keywords, results: data });
        navigate('/search');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-1">
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
};
export default SearchInput;
