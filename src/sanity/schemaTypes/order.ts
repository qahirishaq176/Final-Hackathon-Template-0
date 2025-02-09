const order = {
    name: 'order',
    type: 'document',
    title: 'Order',
    fields: [
        {
            name: 'firstName',
            title: 'First Name',
            type: 'string'
        },
        {
            name: 'lastName',
            title: 'Last Name',
            type: 'string'
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string'
        },
        {
            name: 'phone',
            title: 'Phone',
            type: 'string'
        },
        {
            name: 'country',
            title: 'Country',
            type: 'string'
        },
        {
            name: 'city',
            title: 'City',
            type: 'string'
        },
        {
            name: 'streetAddress',
            title: 'Street Address',
            type: 'string'
        },
        {
            name: 'zipCode',
            title: 'Zip Code',
            type: 'string'
        },
        {
            name: 'paymentMethod',
            title: 'Payment Method',
            type: 'string'
        },
        {
            name: 'cartItems',
            title: 'Cart Items',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'product' } }]
        },
        {
            name: 'total',
            title: 'Total',
            type: 'number'
        },
        {
            name: 'status',
            title: 'Order Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Success', value: 'success' },
                    { title: 'Dispatch', value: 'dispatch' },
                ],
                layout: 'radio' // Optionally, change to 'dropdown' if you prefer a dropdown
            },
            initialValue: 'pending' // Default value
        }
    ]
}

export default order;