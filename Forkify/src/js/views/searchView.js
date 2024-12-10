import View from './View.js';

class SearchRecipe extends View {
  _query;
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearSearch();
    return query;
  }

  _clearSearch() {
    this._parentEl.querySelector('.search__field').text = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchRecipe();
