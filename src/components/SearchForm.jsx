import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Search = ({ onSearch, news }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    onSearch(`${searchQuery}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleClear = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchInput);
  };

  return (
    <Container fluid className={`heroContainer-${news.theme}`}>
      <Row className="justify-content-md-center">
        <Col xs lg="8">
          <Form
            className="mt-3 d-flex"
            style={{ gap: 12 }}
            onSubmit={(e) => handleSubmit(e)}>
            <Form.Control
              style={{ flex: 1 }}
              placeholder="Search Keywords (optional)"
              name="searchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button type="submit">Search</Button>
            <Button
              variant="outline-primary"
              type="button"
              onClick={() => handleClear()}>
              Clear
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  news: state.news,
});

export default connect(mapStateToProps, null)(Search);
