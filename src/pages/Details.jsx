import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { connect, useSelector, useDispatch } from "react-redux";
import { setNews, clearNews, getNews } from "../state/actions/news";
import { useHistory } from "react-router-dom";

const Details = (news) => {
  const [articles, setArticles] = useState([]);
  const state = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (state.newsItems.length > 0) return setArticles(state.newsItems);
    else {
      dispatch(getNews({ full: true })).then((res) => {
        setArticles(res.articles);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const BackToHome = () => {
    history.push("/Home");
  };

  return (
    <Container>
      <Row className="justify-content-md-center py-4">
        <Col xs lg="8">
          <Button onClick={BackToHome}> Back To Home </Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center my-5">
        <Col sm={8}>
          {articles.map((post, i) => {
            if (post.publishedAt === news.match.params.newsItemPublishedAt) {
              return (
                <ListGroup as="ul" key={i}>
                  <ListGroup.Item as="li" active>
                    <b>Title :</b> {post.title}
                  </ListGroup.Item>
                  {post?.source?.name && (
                    <ListGroup.Item as="li" active>
                      <b>Source :</b> {post.source.name}
                    </ListGroup.Item>
                  )}
                  {post?.author && (
                    <ListGroup.Item as="li">
                      <b> Author :</b> {post.author}
                    </ListGroup.Item>
                  )}
                  {post?.description && (
                    <ListGroup.Item>
                      <b>Description :</b> {post.description}
                    </ListGroup.Item>
                  )}
                  {post?.publishedAt && (
                    <ListGroup.Item as="li">
                      <b>Publication Date :</b> {post.publishedAt}
                    </ListGroup.Item>
                  )}
                  {post?.content && (
                    <ListGroup.Item as="li">
                      <b>Content :</b> {post.content}
                    </ListGroup.Item>
                  )}
                  {post?.url && (
                    <ListGroup.Item as="li">
                      <b>Link : </b>
                      <a href={post.url}>{post?.url}</a>
                    </ListGroup.Item>
                  )}
                  {post?.urlToImage && (
                    <ListGroup.Item as="li">
                      <img
                        src={post.urlToImage}
                        alt=""
                        style={{ maxWidth: "100%" }}
                      />
                    </ListGroup.Item>
                  )}
                </ListGroup>
              );
            } else return "";
          })}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  news: state.news,
});

export default connect(mapStateToProps, { setNews, clearNews })(Details);
