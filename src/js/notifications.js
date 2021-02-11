import { notice, success, error, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';

defaults.styling = 'material';
defaults.icons = 'material';
function searchNotPreciseNotfified() {
  error({
    text: 'Too many matches found. Please, enter a more specific query',
    delay: 2500,
  });
}
function searchNeedMorePrecisionNotified() {
  notice({
    text: 'list of options available, try to be more precise',
    delay: 2500,
  });
}
function searchErrorNotified() {
  notice({
    text: 'Country not found, request incorrect',
    delay: 2500,
  });
}
function searchSuccessNotified() {
  success({
    text: 'Your query is correct!',
    delay: 2500,
  });
}

export default {searchNotPreciseNotfified, searchNeedMorePrecisionNotified, searchSuccessNotified, searchErrorNotified};