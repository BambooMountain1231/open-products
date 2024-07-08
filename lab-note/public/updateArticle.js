'use strict';
console.log('onloaded');

const updateArticle = (articleId) => {
  const newTitle = document.getElementById('newTitle').value;
  const newContent = document.getElementById('newContent').value;
  const newArticle = JSON.stringify({
    title: newTitle,
    content: newContent,
  });
  const requestURL = `/articles/${articleId}`;
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', requestURL);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    document.getElementById('updatedAnnounceSpace').innerText =
      '更新が完了しました。5秒後に遷移します。';
    setTimeout(() => {
      location.href = '/articles';
    }, 5 * 1000);
  });
  xhr.send(newArticle);
};
