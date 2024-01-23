
const Privacy = () => {
  return (
    <div className='flex flex-center flex-col gap-4 w-9/12 m-auto text-center overflow-y-auto'>
    <h1 className='header-text h1-bold'>Privacy Policy</h1>

        <p>
            Thank you for using The Conclave. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website.
        </p>

        <h2  className='text-lg font-semibold'>Information We Collect</h2>
        <ul>
            <li><strong>Username:</strong> We collect your chosen username to identify you on our platform.</li>
            <li><strong>Email:</strong> We collect your email address for communication purposes and account-related notifications.</li>
            <li><strong>Password:</strong> We store an encrypted version of your password to secure your account.</li>
        </ul>

        <h2 className='text-lg font-semibold'>How We Use Your Information</h2>
        <ul>
            <li>Authentication: Your username and encrypted password are used for secure account login.</li>
            <li>Communication: We may use your email to send important updates, notifications, or information related to our services.</li>
        </ul>

        <h2 className='text-lg font-semibold'>Security</h2>
        <p>
            We take the security of your information seriously. Your password is stored in an encrypted format, and we implement measures to protect against unauthorized access.
        </p>

        <h2 className='text-lg font-semibold'>Third-Party Disclosure</h2>
        <p>
            We do not sell, trade, or otherwise transfer your personal information to outside parties. Your information is kept confidential and used solely for the purposes outlined in this policy.
        </p>

        <h2 className='text-lg font-semibold'>Changes to This Privacy Policy</h2>
        <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the last modified date will be updated accordingly.
        </p>

        <h2 className='text-lg font-semibold'>Contact Us</h2>
        <p>
            If you have any questions or concerns about this Privacy Policy, please contact [your contact email].
        </p>
    </div>
  )
}

export default Privacy