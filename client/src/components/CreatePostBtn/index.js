import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import CreatePostForm from '../CreatePostForm/index'
import API from "../../utils/postsAPI"
import { UserContext } from "../../utils/UserContext";
function CreatePost() {
  const [user, dispatch] = useContext(UserContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [posts, Posts] = useState([])
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [tags, setTags] = useState("")




  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(title,text,tags)
    if (title && text) {
      API.savePost({
        title,
        text,
        tags,
        author: user.username
      })
        .then(res =>
          handleClose())
        .catch(err => console.log(err));
    }
  };


  return (
    <div>
      <div>
        <Button variant="outline-primary" onClick={handleShow}>Create Post</Button>{' '}
      </div>
      <>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form.Group>
                <h2>Title</h2>
                <Form.Control size="lg" type="text" placeholder="Large text" name="title" onChange={(e)=>setTitle(e.target.value)} />
                <br />
              </Form.Group>
              <Form.Group>
                <Form.Label>Post</Form.Label>
                <Form.Control as="textarea" rows="5" placeholder="Message" id="message" name="text" onChange={(e)=>setText(e.target.value)} />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control size="sm" type="text" placeholder="Tags" name="tags" onChange={(e)=>setTags(e.target.value)} />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleFormSubmit}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  )

}

export default CreatePost