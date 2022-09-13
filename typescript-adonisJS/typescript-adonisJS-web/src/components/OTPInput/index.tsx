import { Typography } from 'antd';

// for special input div for verification code
import VerificationInput, { VerificationInputProps } from 'react-verification-input';

// cs is exported as default from /src/alias.ts
import { cx } from 'alias';

import './styles.less';

interface Props extends VerificationInputProps {
  error?: boolean;
}

function OTPInput({ error, ...props }: Props): JSX.Element {
  return (
    <>
      <VerificationInput
        {...props}
        // means total 6 block
        length={6}
        // if we didn't give placeholder as empty then by default * will be shown in the blocks
        placeholder=""
        // means only numbers from 0-9 are allowed
        validChars="0-9"
        removeDefaultStyles
        classNames={{
          container: 'code-container',
          character: 'code-character',
          characterInactive: 'code-character--inactive',
          characterSelected: 'code-character--selected',
        }}
      />
      {/* error means when user tries to proceed without even entering the code */}
      {error && (
        // this error will be shown below code blocks in RESET PASSWORD when user didn't enter the code therefore we've used type danger
        <Typography.Text type="danger" className={cx('code-input-error')}>
          Please enter your code
        </Typography.Text>
      )}
    </>
  );
}

OTPInput.defaultProps = {
  error: false,
};

export default OTPInput;
