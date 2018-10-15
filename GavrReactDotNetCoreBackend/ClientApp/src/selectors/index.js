import {createSelector} from 'reselect';

const filtersGetter = state => state.filters;
const articlesGetter = state => state.articles;

export const filtrateArticleSelector = createSelector(articlesGetter, filtersGetter,
  (articles, filters) => {
    console.log('recomputing articleList');
    const filteredArticlesId = filters.selected.map(article => article.value);
    return articles.filter(article => filteredArticlesId.includes(article.id));
  });