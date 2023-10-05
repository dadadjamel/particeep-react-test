import "./movie.css";

import { Button, Typography } from "antd";
import {
  MovieStatus,
  deleteMovie,
  toggleDislike,
  toggleLike,
} from "../redux/slices/movieSlice";

import { AiOutlineDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { Movie as MovieType } from "../api/movies";
import { useAppDispatch } from "../hooks/useAppDispatch";

type Props = {
  movie: (MovieType & {
    status: MovieStatus;
  });
  
};

export function Movie({ movie }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="movieCard">
        <div className="movieTitle">
          <Typography.Title level={4}>{movie.title}</Typography.Title>
        </div>

        <div>
          <Typography.Paragraph className="movieCat">{movie.category}</Typography.Paragraph>
        </div>

        <div className="movieButtonsLikeDislike">
          <Button type="text" icon={<AiOutlineLike className={movie.status === 'LIKED' && 'statusLiked'} size={20} />}
            onClick={() => dispatch(toggleLike(movie))}
            className="movieButtons"
          >

            {movie.likes}
          </Button>
          <Button type="text" icon={<AiOutlineDislike className={movie.status === 'DISLIKED' && 'statusDisliked'} size={20}/>}
            onClick={() => dispatch(toggleDislike(movie))}
            className='movieButtons'
          >
            {movie.dislikes}
          </Button>
        </div>

        
        
        
        <div className="movieBar" >
          <div style={{width:`${Math.floor((movie.likes/(movie.likes+movie.dislikes))*100)}%`}} className="moviebarLike"></div>
          <div style={{width:`${Math.floor((movie.dislikes/(movie.likes+movie.dislikes))*100)}%`}} className="moviebarDislike"></div>
        </div>

        <div className="">
          <Button danger type="primary" onClick={() => dispatch(deleteMovie(movie))}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
