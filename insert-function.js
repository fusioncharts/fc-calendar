function insertAtTop (element) {
  const parent = document.querySelector('head');

  // eslint-disable-next-line no-underscore-dangle
  const metaTag = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (metaTag) {
    const content = metaTag.getAttribute('content');
    if (content) {
      const match = content.match(/'nonce-([^']+)'/);
      if (match) {
        element.setAttribute('nonce', match[1]);
      }
    }
  }

  const lastInsertedElement = window._lastElementInsertedByStyleLoader;

  if (!lastInsertedElement) {
    parent.insertBefore(element, parent.firstChild);
  } else if (lastInsertedElement.nextSibling) {
    parent.insertBefore(element, lastInsertedElement.nextSibling);
  } else {
    parent.appendChild(element);
  }

  // eslint-disable-next-line no-underscore-dangle
  window._lastElementInsertedByStyleLoader = element;
}

module.exports = insertAtTop;
