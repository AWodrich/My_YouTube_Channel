import _ from 'lodash'; //for lodash only use an underscore.
import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar'; 
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyCGVeh20Fvcjl_ubBMPG-1ZmF92QJsOKqU';



class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		 };

		this.videoSearch('surfboards');
	
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		//we want to throttle the search function. so when we type
		//into our search bar the search doesnt start immidiatly.
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);


		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<div>
					<VideoDetail video={this.state.selectedVideo} />
				</div>
				<div>	
					<VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo}) } videos={this.state.videos} />
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container')); //<App></App> or <App /> creates an instance of App.