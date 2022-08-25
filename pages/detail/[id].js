import { React, useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating'
import moment from "moment";
import Slider from "react-slick";
// import '.../styles/app.scss'; 
// import Footer from "../components/Footer/Footer";

import {useRouter} from "next/router";

function Detail() {

  //별점
  const [rating, setRating] = useState(0)

  const handleRating = (rate) => {
    const rating = rate / 20 
    setRating(rating)
    console.log(rating)
  }

  //줄거리 더보기
  const [closedPlot, setClosedPlot] = useState(false);


  const handleMorePlot = () => {
    setClosedPlot(closedPlot => !closedPlot);
  }

  //영화정보
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const router = useRouter();
  const MNAME = router.query.id;
  const NAME = MNAME === undefined ? router.query.id: MNAME;
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

  // console.log(movies)

  return (
    <div >
      {loading ? <h1>Loading...</h1> :
        <div className="detailWrapper">
          {movies.map((movie) => (
            <div className="movieDetail" key={movie.Result[0].DOCID}>
              <div className="movieDTopContainer">
                <div className="movieDInfoTop">
                  <img className="movieDImg" src={movie.Result[0].posters.split('|')[0]}></img>
                  <div className="movieDInfoRight">
                    <h3 className="movieDTitle">{movie.Result[0].title.replace(/!HS/gi, "").replace(/!HE/gi, "")}</h3>
                    <p className="movieDInfoRightYGN">{movie.Result[0].prodYear} ▪ {movie.Result[0].genre} ▪ {movie.Result[0].nation}</p>
                    <hr align="left" />
                    <div className="ratingAvg">
                      <p>평균 ★</p>
                    </div>
                    <hr align="left" />
                    <div className="rating">
                      <div className="ratingStar">
                        <p>평가하기</p>
                        <Rating onClick={handleRating} size={`40px`}
                        // tooltipArray={['1점', '2점', '3점', '4점','5점']}
                        // tooltipDefaultText={'점수'}
                        // showTooltip
                        />
                      </div>
                      <div className="partition"></div>
                      <div className="ratingOptionContainer">
                        <div className="ratingComment">
                          <div className="commentImgContainer">
                            <img
                              className="commentImg"
                              alt="plus"
                              src="/images/plus.png"
                              style={{ width: "17px", height: "17px"}}
                            />
                          </div>
                          <p style={{margin: "0 20px 0 0" }}>보고싶어요</p>
                        </div>
                        <div className="ratingComment">
                          <div className="commentImgContainer">
                            <img
                              className="commentImg"
                              alt="pen"
                              src="/images/pen.png"
                            />
                          </div>
                          <p>코멘트</p>
                        </div>
                        <div className="ratingComment">
                          <div className="commentImgContainer">
                            <img
                              className="commentImg"
                              alt="see"
                              src="/images/see.png"
                            />
                          </div>
                          <p>보는중</p>
                        </div>
                        <div className="ratingComment">
                          <div className="commentImgContainer">
                            <img
                              className="commentImg"
                              alt="more"
                              src="/images/more.png"
                              style={{ width: "18px", height: "18px" }}
                            />
                          </div>
                          <p>더보기</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="movieDInfoBottom">
                <div className="movieDInfoBottomLeft">
                  <div className="movieDBasicInfo">
                    <h3>기본정보</h3>
                    <p>{movie.Result[0].title.replace(/!HS/gi, "").replace(/!HE/gi, "")}</p>
                    <p>{movie.Result[0].prodYear} ▪ {movie.Result[0].genre} ▪ {movie.Result[0].nation}</p>
                    <p>{movie.Result[0].runtime}분 ▪ {movie.Result[0].rating}</p>
                    <p>개봉 : {moment(movie.Result[0].repRlsDate).format("YYYY.MM.DD")}</p>
                    <hr style={{margin: "20px 0 0 0"}}/>
                    <div className="movieDplotText">
                      <h3>줄거리</h3>
                      <p className={closedPlot ? "openPlot" : "closePlot"}
                        onClick={handleMorePlot}>
                        {movie.Result[0].plots.plot[0].plotText}
                      </p>
                      <div className={movie.Result[0].plots.plot[0].plotText.length<=150? "plotBtnOff": "plotBtnOn"}>
                        <button className={closedPlot ? "moreButtonOff" : "moreButtonOn"}
                          onClick={handleMorePlot}>
                          {"더보기"}
                        </button>
                        <button className={closedPlot ? "moreButtonOn" : "moreButtonOff"}
                          onClick={handleMorePlot}>
                          {"닫기"}
                        </button>
                      </div>
                    </div>
                    <hr style={{margin: "20px 0 0 0"}}/>
                    <h3>출연/제작</h3>
                    <p className="direcor">감독: {movie.Result[0].directors.director.map(director => director.directorNm)}</p>
                    <p>출연: {movie.Result[0].actors.actor.map(actor => actor.actorNm)+','.slice(0, -1)}</p>
                    <hr style={{ margin: "20px 0 0 0" }} />
                    <h3>포스터</h3>
                    <Slider className="moviePosters">
                      {
                        movie.Result[0].posters.split('|').map(
                          posters =>
                            (<img src={posters} key={posters}></img>))
                      }
                    </Slider>
                    <hr style={{margin: "20px 0 0 0"}}/>
                    <h3>스틸컷</h3>
                    <Slider className="movieStills">
                      {
                        movie.Result[0].stlls.split('|').map(
                          stlls =>
                            (<img src={stlls} key={stlls}></img>))
                      }
                    </Slider>
                  </div>
                </div>

                <div className="movieDInfoBottomRight">
                  <h3>코멘트</h3>
                  <div className="movieComment">코멘트</div>
                </div>
              </div>
            </div>
          ))}
        </div>}
      {/* <Footer /> */}
    </div>
  )

}
export default Detail;

