'use strict';

const deleteArticle = (articleId) => {
  const requestURL = `/articles/${articleId}`;
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', requestURL);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    location.href = '/articles';
  });
  xhr.send();
};
