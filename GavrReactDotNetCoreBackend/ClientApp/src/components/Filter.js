import React, {Component} from 'react'
import {connect} from 'react-redux';
import {changeSelection} from "../AC";
import Select from 'react-select';

class SelectFilter extends Component {

  handleChange = selectedArticle => this.props.changeSelection(selectedArticle);


  render() {
    const articles = this.props.articles;

    const options = articles.map(article => ({
      label: article.title,
      value: article.id,
    }));

    return(
      <div>
        <Select
          options={options}
          isClearable
          isMulti
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default connect(state => ({
  articles: state.articles,
  filtratedArticles: state.filters,
}), {changeSelection})(SelectFilter)