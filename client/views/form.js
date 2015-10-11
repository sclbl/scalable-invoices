Template.form.events({
  'submit form': function (event, template) {
    event.preventDefault();

    const invoice = {
      customer: template.find('form [data-id=customer]').value,
      address: template.find('form [data-id=address]').value,
      number: template.find('form [data-id=number]').value,
      date: template.find('form [data-id=date]').value,
      note: template.find('form [data-id=note]').value
    };

    itemRows = template.findAll('[data-id=item-row]');

    var items;
    items = [];

    itemRows.forEach(function(currentValue, index, arr){
      var item;
      item = {};
      item._id = new Mongo.ObjectID;
      item.description = $(currentValue).find('[data-id=description]').val();
      item.amount = $(currentValue).find('[data-id=amount]').val();
      item.price = $(currentValue).find('[data-id=price]').val();
      items.push(item);
    });

    if (!this._id) {
      Invoices.insert({
        customer: invoice.customer,
        address: invoice.address,
        number: invoice.number,
        date: invoice.date,
        items: items,
        note: invoice.note,
        modifiedAt: new Date()
      });
    } else {
      Invoices.update(
        { _id : this._id },
        { $set:
          {
            customer: invoice.customer,
            address: invoice.address,
            number: invoice.number,
            date: invoice.date,
            items: items,
            note: invoice.note,
            modifiedAt: new Date()
          }
        });
    }

    template.find('form').reset();
    $('[data-row=remove]').remove();
  },

  'click [data-action=add-item-row]': function (event, template) {
    Blaze.render(Template.itemRow, $('.item-rows')[0]);
  },

  'click [data-action=remove-item-row]': function (event, template) {
    event.currentTarget.parentNode.parentNode.remove();
  },

  'click [data-action=close]': function (event, template) {
    Session.set('selectedInvoice', {});
  }
});

Template.form.helpers({
  selectedInvoice: () => {
    return Session.get('selectedInvoice');
  },

  isInvoiceSelected: () => {
    const selectedInvoice = Session.get('selectedInvoice');
    return selectedInvoice !== undefined && selectedInvoice._id;
  },

  firstItem: (item, items) => {
    return item._id._str === items[0]._id._str;
  }
});
