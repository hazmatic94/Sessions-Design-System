import {bootstrapDocsApp} from './src/docs/shell/bootstrap.js?v=sessions-recent-sales-card-v1';

bootstrapDocsApp().catch(error => {
  console.error(error);
  const content = document.querySelector('#content');
  if (content) {
    content.innerHTML = `<pre style="padding:24px;color:#f88;white-space:pre-wrap;">App failed to load:\n${error?.stack || error}</pre>`;
  }
});
