export interface ErrorSummaryItem {
  message: string;
  focusElementId: string;
  tabIndex: number;
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
      focusElementId: 'memberNumber',
      tabIndex: 2
    },
    unauthorized: {
      message: 'Incorrect member number or password',
      focusElementId: 'memberNumber',
      tabIndex: 3
    },
    error: {
      message: 'Server error',
      focusElementId: 'memberNumber',
      tabIndex: 4
    }
  },
  password: {
    required: {
      message: 'Enter your password',
      focusElementId: 'password',
      tabIndex: 5
    }
  },
  firstName: {
    required: {
      message: 'Enter your first name(s)',
      focusElementId: 'firstName',
      tabIndex: 3
    }
  },
  lastName: {
    required: {
      message: 'Enter your last name',
      focusElementId: 'lastName',
      tabIndex: 4
    }
  }
};
