//similar to create.js


import React, { Component } from 'react';
import axios from 'axios';

class Edit extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeMovieName = this.onChangeMovieName.bind(this);
        this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
        this.onChangeMoviePoster = this.onChangeMoviePoster.bind(this);
        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get('http://localhost:4000/api/movies/' + this.props.match.params.id)
            .then((res) => {
                this.setState({
                    Title: res.data.title,
                    Year: res.data.year,
                    Poster: res.data.poster,
                    _id: res.data._id
                })
            })
            .catch();
    }

    handleSubmit(event) {
        console.log("Name: " + this.state.Title +
            " Year: " + this.state.Year +
            "Poster: " + this.state.Poster);

        const newMovie = {
            Title: this.state.Title,
            Year: this.state.Year,
            Poster: this.state.Poster
        }

        axios.put('http://localhost:4000/api/movies/'+this.state._id, newMovie)
            .then()
            .catch();
        //post request to the server
        // axios.post('http://localhost:4000/api/movies', newMovie)
        // .then((response)=>{
        //     console.log(response);
        // })

        // //if error
        // .catch((err)=>{
        //     console.log(err);
        // });



        event.preventDefault();
        this.setState({
            Title: '',
            Year: '',
            Poster: ''
        });
    }
    onChangeMovieName(event) {
        this.setState({
            Title: event.target.value
        })
    }
    onChangeMovieYear(event) {
        this.setState({
            Year: event.target.value
        })
    }
    onChangeMoviePoster(event) {
        this.setState({
            Poster: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>This is my edit Component!</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label>Edit Movie Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Title}
                            onChange={this.onChangeMovieName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Movie Year: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Year}
                            onChange={this.onChangeMovieYear}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Movie Poster: </label>
                        <textarea type="text"
                            className="form-control"
                            value={this.state.Poster}
                            onChange={this.onChangeMoviePoster}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Edit Movie"
                            className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }
}
export default Edit;