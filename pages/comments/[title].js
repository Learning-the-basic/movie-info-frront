import {React, useState, useEffect} from "react";
import {useRouter} from "next/router";

const newComment = () => {
  //영화정보
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [commentText, setCommentText] = useState(false);

  const handleCommentText = () => {
    setCommentText(commentText => !commentText);
  }


  const router = useRouter();
  const MNAME = router.query.title;
  const NAME = MNAME === undefined ? router.query.title: MNAME;
  const KEY2 = "80HF21BI401E15RFQ193"    //KMDB

  const getMovie = async () => {
    const json = await (
      await fetch(
        `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title=${NAME}&ServiceKey=${KEY2}`)
    ).json();

    setMovies(json.Data);
    setLoading(false);

  };

  useEffect(() => {
    getMovie();
  }, [NAME]);

  return (
    <div>
      <div className="commentsWrapper">
        {movies.map((movie) => (
          <div className="newComment" key={movie.Result[0].DOCID}>

            <div className="commentsMovieInfo">
              <p className="commentsMovieName">{movie.Result[0].title.replace(/!HS/gi, "").replace(/!HE/gi, "")}</p>
            </div>

            <input 
              className="commentInput"
              placeholder="이 작품에 대한 생각을 자유롭게 표현해주세요."/>
            <button 
              className={commentText? "commentSubmit":"commentNoSubmit"} 
              onClick={handleCommentText}
            >저장</button>

          </div>
        ))}

    </div>
    </div>
  )
}

export default newComment;