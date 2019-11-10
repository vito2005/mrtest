import React from 'react';
import './Content.css';
import { connect } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import { setCurrentPage } from '../../store/actions';

class Results extends React.Component {
  renderNoResultsMessage() {
    const { results, noResultsMessage } = this.props;
    if (results && !results.length && noResultsMessage) {
      return (<div className="no-result">
        <h3>
          {noResultsMessage}
        </h3>
      </div>);
    }
  }

  renderResults(currentResults) {
    return (
      <ul>
        {currentResults && currentResults.map((result) => (
          <li key={result.id} className="results-item">
            <h3>
              <a href="!!#">
                {result.name}
              </a>
            </h3>
            <div className="results-item-content">
              {result.address},
              <p><b>Coordinates:</b></p>
              <p>
                lat: {result.lat}, lng: {result.lng}
              </p>
            </div>
          </li>
        ))}
      </ul>);
  }

  render() {
    const {
      results, currentPage, resultsPerPage, setCurrentPage
    } = this.props;
    const lastResultIndex = currentPage * resultsPerPage;
    const firsResultIndex = lastResultIndex - resultsPerPage;
    const currentResults = results && results.slice(firsResultIndex, lastResultIndex);

    if (!results) return (<div className="emptyDiv"></div>);

    if (this.props.loading) {
      return (<div className="loading-spinner">...loading</div>);
    }
    return (<div className="results">
      {this.renderNoResultsMessage()}
      {this.renderResults(currentResults)}
      <Pagination resutsPerPage={resultsPerPage}
                  totalResults={results && results.length}
                  paginate={setCurrentPage}/>
    </div>);
  }
}

const putStateToProps = (state) => ({
  results: state.content.results,
  loading: state.content.loading,
  currentPage: state.content.currentPage,
  resultsPerPage: state.content.resultsPerPage,
  currentResults: state.content.currentResults,
  noResultsMessage: state.content.noResultsMessage
});
const putDispatchToProps = {
  setCurrentPage
};

export default connect(putStateToProps, putDispatchToProps)(Results);
