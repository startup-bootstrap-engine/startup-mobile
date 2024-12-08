type AriaRole =
  | 'button'
  | 'textbox'
  | 'checkbox'
  | 'radio'
  | 'tab'
  | 'link'
  | 'heading'
  | 'img'
  | 'menuitem';

export const TEST_SELECTORS = {
  REGISTER_BUTTON: {
    role: 'button' as AriaRole,
    name: "Don't have an account? Sign",
  },
  FULL_NAME_INPUT: { label: 'Full name' },
  EMAIL_INPUT: { label: 'Email address' },
  PASSWORD_INPUT: { label: 'Password', exact: true },
  CONFIRM_PASSWORD_INPUT: { label: 'Confirm password' },
  CREATE_ACCOUNT_BUTTON: { role: 'button' as AriaRole, name: 'Create Account' },
  LOGIN_BUTTON: { role: 'button' as AriaRole, name: 'Sign In' },
  SIGN_OUT_BUTTON: { role: 'button' as AriaRole, name: 'Sign Out' },
};
