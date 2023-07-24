import Layout from '../components/layout/Layout';
import ProductCard from '../components/utils/ProductCard';
import { useSearch } from '../context/SearchContext';

export const SearchPage = () => {
  const [search, setSearch] = useSearch();
  return (
    <Layout title={'Search-Results'}>
      <div className="container">
        <div className="text-center">
          <h4>Search Results</h4>
          <h6>
            {search?.results.length < 1
              ? 'No products found'
              : `${search?.results.length} products found`}
          </h6>
          <div className="d-flex flex-wrap">
            {search?.results?.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                needBtn={true}
                btnAdd={true}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
