import React from 'react';
import './Autocomplete.css';
import { connect } from 'react-redux';
import {
  setSearchText, showSuggestions, hideSuggestions, getSuggestionsInjector
} from '../../store/autocomplete/actions';
import { getDataInjector } from '../../store/actions';


class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.onTextChanged = this.onTextChanged.bind(this);
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
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item, i) => <li key={i} onClick={() => this.search(item)}>
          {item}
        </li>)}
      </ul>
    );
  }

  renderOverlay() {
    if (this.props.suggestions.length > 0) {
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
  getDataInjector
};

export default connect(putStateToProps, putDispatchToProps)(Autocomplete);
