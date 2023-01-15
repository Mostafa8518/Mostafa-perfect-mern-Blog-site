import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './articleEditScreen.css';
import {
    deleteArticle,
    listArticles,
    createArticle,
  } from "../../actions/articlesAction";

function articleEditScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [uploading, setUploading] = useState(false);
  const articleList = useSelector((state) => state.articleList);
  const { loading, articles, error } = articleList;

  const createArticl = useSelector((state) => state.createArticle);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreat,
  } = createArticle;

  const articleDelete = useSelector((state) => state.articleDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = articleDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      setModalVisible(false);
    }
    dispatch(listArticles());
    return () => {
      //
    };
  }, [successCreate, successDelete]);

  const openModal = (article) => {
    setModalVisible(true);
    setId(article._id);
    setTitle(article.title);
    setWriter(article.writer);
    setDesc(article.desc);
    setImage(article.imageUrl);
   setCategory(article.category);
    
    
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
        createArticle({
        _id: id,
        title,
        writer,
        imageUrl,
        category,
        desc
       
        
      })
    );
  };
  const deleteHandler = (article) => {
    dispatch(deleteArticle(article._id));
  };
  const uploadFileHandler =async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    
     axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImageUrl(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="content content-margined">
      <div className="article-header">
        <h3>articles</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create article
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create article</h2>
              </li>
              <li>
                {loadingCreate&& <div>Loading...</div>}
                {errorCreat && <div>{errorCreat}</div>}
              </li>

              <li>
                <label htmlFor="title">title</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  id="title"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="writer">writer</label>
                <input
                  type="text"
                  name="writer"
                  value={writer}
                  id="writer"
                  onChange={(e) => setWriter(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="imageUrl">Image</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={imageUrl}
                  id="imageUrl"
                  onChange={async(e) => setImageUrl(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              
              
              <li>
                <label htmlFor="name">Category</label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="desc">Desc</label>
                <textarea
                  name="desc"
                  value={desc}
                  id="desc"
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="article-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Writer</th>
              <th>Category</th>
              <th>Views</th>
              
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id}>
                <td>{article._id}</td>
                <td>{article.title}</td>
                <td>{article.writer}</td>
                <td>{article.category}</td>
                <td>{article.views}</td>
                <td>
                  <button className="button" onClick={() => openModal(article)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(article)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default articleEditScreen;
