/**
 * Demo of frost-modal-form with useful defaults
 */

import Ember from 'ember'
const {Controller, inject} = Ember
const {service} = inject

export default Controller.extend({
  notifications: service('notification-messages'),
  queryParams: [
    'isFormVisible'
  ],

  isFormValid: true,
  isFormVisible: false,

  simpleBunsenModel: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      },
      alias: {
        type: 'string',
        title: 'Nickname'
      },
      onlyChild: {
        type: 'boolean'
      },
      age: {
        type: 'number',
        title: 'Age'
      }
    },
    required: ['lastName']
  },

  simpleBunsenValue: {
    firstName: 'Ada',
    lastName: 'Lovelace'
  },

  actions: {
    closeForm () {
      this.set('isFormValid', true)
      this.set('isFormVisible', false)
      this.set('simpleBunsenValue', Ember.Object({
        firstName: 'Ada',
        lastName: 'Lovelace'
      }))
    },

    openForm () {
      this.set('isFormVisible', true)
    },

    info () {
      window.alert('OMG!')
    },

    notifyClearAndClose () {
      this.get('notifications').addNotification({
        message: JSON.stringify(this.get('simpleBunsenValue'), null, 2),
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
      this.send('closeForm')
    },

    /**
     * Update _bunsenValue to the new formValue
     * @param {Object} formValue - the updated value from bunsen
     */
    updateFormValue (formValue) {
      this.set('simpleBunsenValue', formValue)
    },

    /**
     * Update formValid with the most recent validation data
     * @param {Object} validation - bunsen validation object
     */
    updateValidity (validation) {
      this.set('isFormValid', !validation.errors.length)
    }
  }
})
