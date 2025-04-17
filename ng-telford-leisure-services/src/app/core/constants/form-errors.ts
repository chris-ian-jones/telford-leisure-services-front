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
  },
  day: {
    required: {
      message: 'Enter the day you were born',
      focusElementId: 'day',
      tabIndex: 3
    },
    pattern: {
      message: 'Day must be a number',
      focusElementId: 'day',
      tabIndex: 3
    },
    invalid: {
      message: 'Your date of birth must be a valid date',
      focusElementId: 'day',
      tabIndex: 4
    }
  },
  month: {
    required: {
      message: 'Enter the month you were born',
      focusElementId: 'month',
      tabIndex: 4
    },
    pattern: {
      message: 'Month must be a number',
      focusElementId: 'month',
      tabIndex: 3
    }
  },
  year: {
    required: {
      message: 'Enter the year you were born',
      focusElementId: 'year',
      tabIndex: 4
    },
    pattern: {
      message: 'Year must be a number',
      focusElementId: 'year',
      tabIndex: 4
    }
  },
  gender: {
    required: {
      message: 'Select your gender',
      focusElementId: 'maleInput',
      tabIndex: 3
    }
  },
  email: {
    required: {
      message: 'Enter your email address',
      focusElementId: 'email',
      tabIndex: 3
    },
    email: {
      message:
        'Enter the email address in the correct format, like name@example.com',
      focusElementId: 'email',
      tabIndex: 3
    }
  },
  phone: {
    pattern: {
      message: 'Enter a valid phone number',
      focusElementId: 'phone',
      tabIndex: 4
    }
  },
  addressLineOne: {
    required: {
      message: 'Enter your address line 1',
      focusElementId: 'addressLineOne',
      tabIndex: 3
    }
  },
  postcode: {
    required: {
      message: 'Enter your postcode',
      focusElementId: 'postcode',
      tabIndex: 4
    },
    pattern: {
      message: 'Enter a real postcode',
      focusElementId: 'postcode',
      tabIndex: 4
    }
  },
  ethnicity: {
    required: {
      message: 'Select your ethnicity',
      focusElementId: 'whiteInput',
      tabIndex: 3
    }
  },
  mainCenter: {
    required: {
      message: 'Select your main center',
      focusElementId: 'abrahamInput',
      tabIndex: 3
    }
  },
  membershipType: {
    required: {
      message: 'Select your membership type',
      focusElementId: 'adtInput',
      tabIndex: 3
    }
  },
  satisfaction: {
    required: {
      message: 'Select how you felt about the service you received',
      focusElementId: 'verySatisfiedInput',
      tabIndex: 3
    }
  },
  improvements: {
    maxlength: {
      message: 'Overall feedback must be 1200 characters or fewer',
      focusElementId: 'improvements',
      tabIndex: 4
    }
  }
};
