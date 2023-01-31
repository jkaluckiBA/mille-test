import * as yup from 'yup';

import { POLISH_IBAN_REGEX } from '@/features/transactions/constants';

const schema = yup.object().shape({
  amount: yup.number().min(0, 'Amount must be greater than 0').required(),
  address: yup.string().required(),
  accountNumber: yup
    .string()
    .test('IBAN', 'Provided value is not valid account number', (val) => {
      return !!val?.match(POLISH_IBAN_REGEX);
    })
    .required(),
  beneficiary: yup.string().required(),
  description: yup.string().required()
});

export default schema;
