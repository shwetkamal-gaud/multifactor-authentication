export const loginForm = [
    {
        sectionType: 'header',
        title: 'Login'
    },
    {
        sectionType: 'body',
        child: [
            {
                inputType: 'text',
                label: 'Email',
                placeholder: 'Enter Email',
                fieldName: 'email'
            },
            {
                inputType: 'text',
                label: 'Password',
                placeholder: 'Enter Password',
                fieldName: 'password',
                isPassword: true
            },
        ]
    },
    {
        sectionType: 'footer',
        title: 'Login'
    }
] 