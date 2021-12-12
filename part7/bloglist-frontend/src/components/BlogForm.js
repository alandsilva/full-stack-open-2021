import React from 'react';
import { useField } from '../hooks';

const BlogForm = ({ createBlog }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('url');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    createBlog(newBlog);
    title.reset();
    author.reset();
    url.reset();
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input {...title} reset={null} />
        </div>
        <div>
          author:
          <input {...author} reset={null} />
        </div>
        <div>
          url:
          <input {...url} reset={null} />
        </div>

        <button id='blogform-button' type='submit'>
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
