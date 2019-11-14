import React from 'react';
import './Autocomplete.css';
import { connect } from 'react-redux';
import {
  setSearchText, showSuggestions,
  hideSuggestions, getSuggestionsInjector,
  setActiveSuggestion, clearActiveSuggestion
} from '../../store/autocomplete/actions';
import { getDataInjector } from '../../store/actions';


class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.onTextChanged = this.onTextChanged.bind(this);
    this.arrowPressed = this.arrowPressed.bind(this);
  }

  async onTextChanged(e) {
    const {
      hideSuggestions, setSearchText, getSuggestionsInjector
    } = this.props;
    const value = e.target.value;
    setSearchText(value);
    if (value.length > 0) {
      await getSuggestionsInjector(value);
    } else {
      hideSuggestions();
    }
  }

  arrowPressed(e) {
    const {
      setSearchText, suggestions, searchText
    } = this.props;
    if (e.keyCode === 38 && searchText) { // up
      e.preventDefault();
      let index = suggestions.findIndex((s) => s.active);
      if (index === -1 || !index) {
        index = this.props.suggestions.length;
      }
      // eslint-disable-next-line no-plusplus
      this.markSuggestion(--index);
      setSearchText(suggestions[index].name);
    }
    if (e.keyCode === 40 && searchText) { // down
      let index = suggestions.findIndex((s) => s.active);
      if (index === suggestions.length - 1) {
        index = -1;
      }
      // eslint-disable-next-line no-plusplus
      this.markSuggestion(++index);
      setSearchText(suggestions[index].name);
    }
  }

  markSuggestion(i) {
    const {
      setActiveSuggestion,
      clearActiveSuggestion
    } = this.props;
    clearActiveSuggestion();
    setActiveSuggestion(i);
  }

  search(value) {
    if (!value) return;
    const {
      hideSuggestions, setSearchText, getDataInjector, suggestions
    } = this.props;
    if (suggestions.length) {
      hideSuggestions();
    }
    setSearchText(value);
    getDataInjector(value);
  }

  renderSuggestions() {
    const { suggestions } = this.props;
    if (!suggestions) return;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item, i) => <li className={item.active && 'active'} key={i} onMouseOver={() => this.markSuggestion(i)} onClick={() => this.search(item.name)}>
          {item.name}
        </li>)}
      </ul>
    );
  }

  renderOverlay() {
    if (this.props.suggestions && this.props.suggestions.length > 0) {
      return (<div className="overlay" onClick={this.props.hideSuggestions}></div>);
    }
  }

  render() {
    const {
      searchText
    } = this.props;

    return (
      <div className="Autocomplete">
        <div className="search-wrapper">
          <input
            onKeyPress={(e) => e.charCode === 13 && this.search(searchText)}
            onKeyDown={this.arrowPressed}
            tabIndex="0"
            onChange={this.onTextChanged}
            value={searchText} type="text"/>
          <span>
            <button onClick={() => this.search(searchText)}>Найти</button>
          </span>
        </div>
        <div className="suggestions">
          {this.renderSuggestions()}
        </div>
        {this.renderOverlay()}
      </div>
    );
  }
}

const putStateToProps = (state) => ({
  searchText: state.autocomplete.searchText,
  suggestions: state.autocomplete.suggestions,
  items: state.autocomplete.items
});
const putDispatchToProps = {
  setSearchText,
  showSuggestions,
  hideSuggestions,
  getSuggestionsInjector,
  getDataInjector,
  setActiveSuggestion,
  clearActiveSuggestion
};

export default connect(putStateToProps, putDispatchToProps)(Autocomplete);
