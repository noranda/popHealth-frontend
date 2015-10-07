import Ember from 'ember';
import humps from 'humps';
import $ from 'jquery';

const { inject, computed, isNone } = Ember;

export default Ember.Component.extend({
  ajax: inject.service(),

  classNames: ['register-body'],

  firstName: null,
  lastName: null,
  username: null,
  email: null,
  password: null,
  passwordConfirmation: null,
  company: null,
  companyUrl: null,
  registryName: null,
  registryId: null,
  npi: null,
  tin: null,

  _errors: null,
  errors: computed('_errors', {
    get() {
      let errors = this.get('_errors');

      if (isNone(errors)) {
        return [];
      }

      return errors;
    },

    set(keyName, newValue) {
      this.set('_errors', newValue);
      return newValue;
    }
  }),

  liceseAgreement: false,
  submitting: false,

  licenseAgreed: computed('liceseAgreement', {
    get() {
      if (this.get('liceseAgreement')) {
        return true;
      }
      return null;
    }
  }),

  submitBtnDisabled: computed('licenseAgreed', 'submitting', {
    get() {
      if (this.get('licenseAgreed') && !this.get('submitting')) {
        return null;
      }
      return true;
    }
  }),

  actions: {
    register() {
      if (this.get('submitting') || !this.get('licenseAgreed')) {
        return;
      }

      this.set('submitting', true);
      this.set('errors', null);

      let registerParams = this.getProperties(
        'firstName', 'lastName', 'username', 'email', 'password',
        'passwordConfirmation', 'company', 'companyUrl', 'registryName',
        'registryId', 'npi', 'tin'
      );

      let request = this.get('ajax').request('/api/users', {
        data: {
          user: humps.decamelizeKeys(registerParams)
        },
        type: 'POST'
      });

      request.then(() => {});

      request.catch((response) => {
        this.set('errors', parseErrorObject(response.errors));
        $('html, body').animate({ scrollTop: 0 }, 'slow');
      });

      request.finally(() => {
        this.set('submitting', false);
      });
    },

    toggleLicenseAgreement() {
      this.toggleProperty('liceseAgreement');
    }
  }
});

function parseErrorObject(responseErrors) {
  let keys = Object.keys(responseErrors);
  let errors = [];

  for (let i = 0, len = keys.length; i < len; ++i) {
    let fieldName = Ember.String.capitalize(keys[i]).replace('_', ' ');
    let fieldErrors = responseErrors[keys[i]];

    for (let j = 0, fieldErrorLen = fieldErrors.length; j < fieldErrorLen; ++j) {
      errors.push(`${fieldName} ${fieldErrors[j]}`);
    }
  }

  return errors;
}
