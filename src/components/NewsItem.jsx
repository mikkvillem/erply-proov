import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Truncate from "react-truncate";
import Moment from "react-moment";
import NewsDefaultImage from "./news-default-image.jpg";
import { useHistory } from "react-router-dom";

const NewsItem = ({ item }) => {
  const history = useHistory();
  const DetailsPage = () => {
    history.push(`/Home/${item.publishedAt}`);
  };

  return (
    <Col xs={12} sm={6} md={6} lg={4} xl={4} className="my-2">
      <Card>
        {item.urlToImage ? (
          <div
            className="urlImage"
            style={{ backgroundImage: `url(${item.urlToImage})` }}
          />
        ) : (
          <div
            className="urlImage"
            style={{ backgroundImage: `url(${NewsDefaultImage})` }}
          />
        )}
        <Card.Body>
          <Card.Title>
            <Truncate lines={2} ellipsis={<span>...</span>}>
              {item.title}
            </Truncate>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {item.source.name} <br />
            <span style={{ fontWeight: "normal" }}>{item.author}</span>
          </Card.Subtitle>
          <Card.Text>
            <Truncate lines={3} ellipsis={<span>...</span>}>
              {item.description}
            </Truncate>
          </Card.Text>
          <Button bg="primary" onClick={DetailsPage}>
            Go to Page
          </Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Published: <Moment format="YYYY/MM/DD" date={item.publishedAt} />
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default NewsItem;
