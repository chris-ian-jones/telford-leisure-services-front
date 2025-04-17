export interface ErrorSummaryItem {
  message: string;
  focusElementId: string;
}

export interface FormErrorMessages {
  [key: string]: {
    [key: string]: ErrorSummaryItem;
  };
}

export const ERROR_MESSAGES: FormErrorMessages = {
  memberNumber: {
    required: {
      message: 'Enter your member number',
      focusElementId: 'memberNumber'
    },
    unauthorized: {
      message: 'Incorrect member number or password',
      focusElementId: 'memberNumber'
    },
    error: {
      message: 'Server error',
      focusElementId: 'memberNumber'
    }
  },
  password: {
    required: {
      message: 'Enter your password',
      focusElementId: 'password'
    }
  }
};
