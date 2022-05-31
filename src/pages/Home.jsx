import React, { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import { getNews, addNews, clearNews } from "../state/actions/news";
import { useSelector, useDispatch } from "react-redux";
import NewsList from "../components/NewsList";
import TopNav from "../layout/TopNav";

const Home = () => {
  const state = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleSearch = (search) => {
    setPage(1);
    setQuery(search);
    dispatch(clearNews());
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    dispatch(getNews({ q: query, page: page })).then((data) =>
      dispatch(addNews(data))
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  return (
    <>
      <TopNav />
      <SearchForm
        onSearch={(search) => {
          handleSearch(search);
        }}
      />
      <NewsList
        newsItemsTotal={state.newsItemsTotal}
        loading={state.newsLoading}
        newsItems={state.newsItems}
        loadMore={() => handleLoadMore()}
      />
    </>
  );
};

export default Home;
