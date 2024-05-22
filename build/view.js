/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

const getResponse = async () => {
  let fieldSet = document.querySelector('#ctcl-order-status-check-fieldset');
  let apiUrl = fieldSet.getAttribute('data-api-url');
  const data = {
    email: document.querySelector('#ctcl-email').value,
    orderNumber: document.querySelector('#ctcl-order-number').value
  };
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonResponse = await response.json();
    if (jsonResponse.status == 'fail') {
      alert(jsonResponse.note);
    } else {
      let note = document.createElement('div');
      note.id = 'ctcl-success';
      note.innerHTML = `<div style="margin-left:auto;margin-right:auto;display:block;"><h5> Note : </h5><p>${jsonResponse.note}</p></div>`;
      fieldSet.appendChild(note);
    }

    // Handle the response as needed
  } catch (error) {
    console.error('Error:', error);
    // Handle the error as needed
  }
};
document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('#ctcl-order-status-check');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let messageBox = document.querySelector('#ctcl-success');
    if (messageBox != undefined) {
      messageBox.remove();
    }
    // Prepare the data to be sent in the POST request
    getResponse();
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map