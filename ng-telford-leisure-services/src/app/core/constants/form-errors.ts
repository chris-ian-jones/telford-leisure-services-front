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
    },
    minlength: {
      message: 'Password must be 8 characters or more',
      focusElementId: 'password',
      tabIndex: 3
    },
    pattern: {
      message:
        'Password must be in the correct format which contains at least one capital letter, one lower case letter, one number and one symbol (eg ?!£%)',
      focusElementId: 'password',
      tabIndex: 3
    },
    token: {
      message:
        'Confirmation code has expired. Click this link to go back and generate a new one',
      focusElementId: 'reloadCurrentRoute',
      tabIndex: 3
    }
  },
  confirmPassword: {
    required: {
      message: 'Confirm your password',
      focusElementId: 'confirmPassword',
      tabIndex: 3
    },
    match: {
      message: 'Confirm password and password should match',
      focusElementId: 'confirmPassword',
      tabIndex: 3
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
      message: 'Year must be a four digit number',
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
  },
  emailCheck: {
    required: {
      message: 'Select yes if you have found your member number',
      focusElementId: 'yesInput',
      tabIndex: 3
    }
  },
  confirmationCode: {
    required: {
      message: 'Enter the 6 character confirmation code',
      focusElementId: 'confirmationCode',
      tabIndex: 3
    },
    incorrect: {
      message: 'Enter correct confirmation code',
      focusElementId: 'confirmationCode',
      tabIndex: 3
    }
  }
};
