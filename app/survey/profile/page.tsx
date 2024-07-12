'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// Icons
import profile_aIcon from '@/images/profile_a.png';
import profile_bIcon from '@/images/profile_b.png';
import profile_cIcon from '@/images/profile_c.png';
import profile_dIcon from '@/images/profile_d.png';
import profile_eIcon from '@/images/profile_d.png';
import profile_fIcon from '@/images/profile_d.png';
import profile_gIcon from '@/images/profile_d.png';
import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions';

export default function ProfilePage() {
  const router = useRouter();
  const { register, trigger, formState, watch, setValue } = useAppFormContext();
  const { isValid } = formState;

  const selectedProfile = watch('profile');

  const validateStep = async () => {
    await trigger();
    if (isValid) {
      router.push('/survey/profile');
    }
  };

  const profiles: {
    [key: string]: {
      name: 'profile_a' | 'profile_b' | 'profile_c' | 'profile_d' | 'profile_e' | 'profile_f' | 'profile_g' ;
      icon: any;
      displayName: string,
    };
  } = {
    profile_a: { name: 'profile_a', icon: profile_aIcon, displayName:"Profile A", },
    profile_b: { name: 'profile_b', icon: profile_bIcon, displayName:"Profile B" },
    profile_c: { name: 'profile_c', icon: profile_cIcon, displayName: "Profile C" },
    profile_d: { name: 'profile_d', icon: profile_dIcon, displayName: "Profile D" },
  };

  const Profiles = Object.values(profiles).map((profile) => (
    <label
      key={profile.name}
      className={clsx(
        'flex flex-row gap-x-4 lg:flex-col items-start',
        'cursor-pointer px-4 py-4 lg:pt-5 border',
        'w-full rounded-md transition-colors duration-300',
        selectedProfile === profile.name
          ? 'border-dark-green bg-faint-green'
          : 'border-light-gray bg-transparent hover:border-mid-green hover:bg-white-green'
      )}
    >
      <Image src={profile.icon} alt="" />
      <div className="flex flex-col lg:mt-10">
        <span className="capitalize font-bold text-deep-green">
          {profile.displayName}
        </span>
      </div>
      <input
        {...register('profile', { required: 'Please select a profile' })}
        type="radio"
        value={profile.name}
        className="hidden"
      />
    </label>
  ));

  return (
    <FormWrapper
      heading="Select your Profile"
      description="Which of these profiles best describes you?"
    >
      <div className="flex flex-col mt-5 lg:mt-6">
        <div className="flex gap-x-4 gap-y-3 flex-col lg:flex-row">{Profiles}</div>
      </div>
      {/* <div className="mt-auto flex justify-between items-center"> */}
      <FormActions>
        <Link
          href="/survey/trash"
          className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base"
        >
          Go Back
        </Link>
        <button
          type="submit"
          // className="bg-purplish-blue text-magnolia font-medium ml-auto mt-auto px-8 py-3 rounded-lg"
          className="bg-light-green transition duration-300 hover:opacity-70 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
        >
          Confirm
        </button>
      </FormActions>
    </FormWrapper>
  );
}
