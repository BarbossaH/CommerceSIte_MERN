const ButtonLoadMore = ({ products, page, loading, setPage, totalCount }) => {
  return (
    <div className="m-2 p-3">
      {products && products.length < totalCount && (
        <button
          className="btn btn-warning"
          onClick={(e) => {
            e.preventDefault();
            setPage(page + 1);
          }}
        >
          {loading ? 'Loading' : 'Load More'}
        </button>
      )}
    </div>
  );
};
export default ButtonLoadMore;
