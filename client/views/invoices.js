Template.invoices.events({
  'click [data-action=open]': function (event, template) {
    Session.set('selectedInvoice', this);
  },

  'click [data-action=remove]': function (event, template) {
    if (confirm('Do you really want to remove this invoice?')) {
      Invoices.remove({ _id: this._id });
    }
  },

  'keyup [data-action=search]': _.debounce(function(event, template) {
    event.preventDefault();
    Session.set('searchQuery', template.find('[data-action=search]').value);
  }, 300)
});

Template.invoices.helpers({
  invoices: () => {
    if (Session.get('searchQuery') !== undefined && Session.get('searchQuery').length !== 0) {
      const query = Session.get('searchQuery');
      return Invoices.find({ $or: [ { customer: new RegExp(query, 'i') }, { address: new RegExp(query, 'i') }, { number: new RegExp(query, 'i') } ] }, { sort: { date: -1 } });
    }
    return Invoices.find({}, { sort: { date: -1 } });
  }
});
