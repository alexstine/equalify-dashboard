import { SignupForm } from '~/components/forms';
import { AuthLayout } from '~/components/layout';
import { Public } from '../..';

const Signup = () => (
  <Public>
    <AuthLayout>
      <section className="flex h-full w-full flex-col items-center justify-center gap-10">
        <div className="w-full max-w-md space-y-2">
          <h1 className="text-3xl md:text-[2.5rem]">Join Equalify</h1>
          <h2 className="text-base text-[#4D4D4D]">
            Begin your journey towards a more accessible world. Let's make
            accessibility a norm, together!{' '}
            <span role="img" aria-label="sparkles">
              ✨
            </span>
          </h2>
        </div>

        <SignupForm />
      </section>
    </AuthLayout>
  </Public>
);

export default Signup;
