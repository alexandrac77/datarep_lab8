import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

// some comments
class MovieItem extends Component {
    render() {
        return (
            <div>
                {/* some comments  */}
                <Card>
                    <Card.Header>{this.props.movie.title}</Card.Header>
                    <Card.Body>
                        <blockquote>
                            <img src={this.props.movie.poster}></img>
                            <footer>
                                {this.props.movie.year}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Link to={'/edit/' + this.props.movie._id} className='btn btn-primary'> edit</Link>
                </Card>
            </div>
        );
    }
}
export default MovieItem;