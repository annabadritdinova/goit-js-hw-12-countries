import debounce from 'lodash.debounce';
import countryInformation from '../template/country-information.hbs';
import countryList from '../template/country-list.hbs';
import informFunctions from '../js/notifications';
import restCountriesAPI from '../js/fetchCountries';
const refs = {
  inputRef: document.querySelector('input'),
  listRef: document.querySelector('.country'),
};

let nameCountry;
const debounceFetchCountry = debounce(e => {
  nameCountry = e.target.value;
  refs.listRef.innerHTML = '';
  if (nameCountry) {
    restCountriesAPI
      .fetchCountries(nameCountry)
      .then(data => {
        if (data.status === 404) {
          informFunctions.searchErrorNotified();
          return Promise.reject(`answer: request incorrect`);
        }
        return listOfCountries(data);
      })
      .catch(error => {
        console.warn(error);
      });
  }
}, 500);

refs.inputRef.addEventListener('input', debounceFetchCountry);

function listOfCountries(data) {
  if (data.length === 1) {
    informFunctions.searchSuccessNotified();
    const markup = countryInformation(data);
    refs.listRef.insertAdjacentHTML('beforeend', markup);
    return;
  }
  if (data.length >= 2 && data.length <= 10) {
    informFunctions.searchNeedMorePrecisionNotified();
    const markup = countryList(data);
    refs.listRef.insertAdjacentHTML('beforeend', markup);
    return;
  }
  if (data.length > 10) {
    informFunctions.searchNotPreciseNotfified();
    return;
  }
}