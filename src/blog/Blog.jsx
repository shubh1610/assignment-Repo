import "../styles.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

export default function Blog() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const limit = 200;
  let toShow = "";
  const { blogs } = useContext(AuthContext);

  function contentToShow(blog) {
    toShow = blog.Content?.substring(0, limit) + "...";
  }
  const showMore = (blog) => {
    navigate("/showblog/" + blog["_id"]);
    setShowAll(true);
  };
  return (
    <>
      {blogs?.map((blog) => {
        return (
          <>
            <div className="App">
              <Container className="p-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{blog.Title}</Card.Title>
                    {contentToShow(blog)}
                    {blog.Content?.length <= limit ? (
                      <Card.Text>{blog.Content}</Card.Text>
                    ) : (
                      <Card.Text>{toShow}</Card.Text>
                    )}
                    <Button variant="primary" onClick={() => showMore(blog)}>
                      View Blog
                    </Button>
                  </Card.Body>
                </Card>
              </Container>
            </div>
          </>
        );
      })}
    </>
  );
}
