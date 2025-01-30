export const manualAdd = [
    {
        sectionType: 'header',
        title: 'Manually Add Account'
    },
    {
        sectionType: 'body',
        child: [
            {
                inputType: 'text',
                label: 'Acount Name',
                placeholder: 'eg. Google, Facebook, Amazon etc.',
                fieldName: 'account_name'
            },
            {
                inputType: 'text',
                label: 'Email',
                placeholder: 'Enter Email',
                fieldName: 'email'
            },
            {
                inputType: 'text',
                label: 'Security Code',
                placeholder: 'Enter Password',
                fieldName: 'security_code',
                isPassword: true
            },
        ]
    }, {
        sectionType: 'footer',
        title: 'Add Account'
    }
]