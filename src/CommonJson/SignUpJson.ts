export const signUpForm = [
    {
        sectionType: 'header',
        title: 'SignUp'
    },
    {
        sectionType: 'body',
        child: [
            {
                inputType: 'text',
                label: 'Full Name',
                placeholder: 'Enter Full Name',
                fieldName: 'name'
            },
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
        title: 'SignUp'
    }
]