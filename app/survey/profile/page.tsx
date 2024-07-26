'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// Icons
import profile_aIcon from '@/images/heroi.svg';
import profile_bIcon from '@/images/amigo.svg';
import profile_cIcon from '@/images/explorador.svg';
import profile_dIcon from '@/images/despreocupado.svg';
import profile_eIcon from '@/images/vilao.svg';
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
      name: 'profile_a' | 'profile_b' | 'profile_c' | 'profile_d' | 'profile_e' ;
      icon: any;
      displayName: string,
      description: string
    };
  } = {
    profile_a: { name: 'profile_a', icon: profile_aIcon, displayName: "Herói da Sustentabilidade", description: "O verdadeiro guardião verde, vive e respira sustentabilidade! Cada ação é um passo para salvar o planeta. Com ele, nem uma folha fora do lugar! Este herói está sempre alerta, procurando novos desafios para enfrentar e formas de tornar o mundo um lugar mais verde. Sempre pronto para liderar pelo exemplo, ele é a inspiração que todos precisamos."},
    profile_b: { name: 'profile_b', icon: profile_bIcon, displayName: "Amigo do Ambiente", description: "O cúmplice perfeito da natureza, sempre disposto a dar uma mãozinha ao planeta. Vive com uma consciência tranquila, sabendo que cada pequena ação conta. O amigo do ambiente está em constante busca de conhecimento e soluções verdes, equilibrando perfeitamente a vida moderna com a proteção do planeta. Uma verdadeira fonte de motivação para quem o rodeia e aquele vizinho que todos querem ter. Mas atenção: ainda há desafios a enfrentar, uma pequena ação de cada vez!" },
    profile_c: { name: 'profile_c', icon: profile_cIcon, displayName: "Eco-Explorador", description: "Aventurando-se pelo caminho da sustentabilidade, faz o que pode, mas ainda há espaço para melhorar. Com uma mentalidade aberta e uma vontade de aprender, o Eco-Explorador vê cada dia como uma oportunidade para fazer melhor pelo ambiente. Curioso, o Eco-Explorador está sempre a testar novas formas de reduzir a pegada de carbono.É o aventureiro que inspira outros a embarcar na jornada da sustentabilidade." },
    profile_d: { name: 'profile_d', icon: profile_dIcon, displayName: "Eco-Despreocupado", description: "Tem boas intenções e um coração verde, mas a sua abordagem é mais relaxada. Acredita que cada pequena ação conta, mesmo que nem sempre seja o mais consistente. Há muito potencial para crescer e fazer a diferença, e com a motivação certa, até ele pode ser o próximo herói do planeta. Um lembrete de que todos têm um papel a desempenhar." },
    profile_e: { name: 'profile_e', icon: profile_eIcon, displayName: "Vilão do Planeta", description: "O Vilão do Planeta pode ter uma pegada pesada, mas todos sabemos que os vilões também têm um lado bom! Há um coração verde escondido algures. Com um pouco de criatividade e motivação, mostrando que até os mais improváveis podem fazer uma grande diferença, o Vilão pode-se transformar num herói. Afinal, todos os super-heróis têm a sua fase de vilão antes da grande reviravolta!" },
  };

  const Profiles = Object.values(profiles).map((profile) => (
    <label
      key={profile.name}
      className={clsx(
        'flex flex-col gap-x-4 items-center',
        'cursor-pointer px-4 py-4 lg:pt-5 border',
        'w-32 rounded-md transition-colors duration-300',
        selectedProfile === profile.name
          ? 'border-dark-green bg-faint-green'
          : 'border-light-gray bg-transparent hover:border-mid-green hover:bg-white-green'
      )}
    >
      <Image src={profile.icon} alt="" className="h-16 lg:h-24" />
      <div className="flex flex-col ">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-deep-green text-center">
            { profile.displayName }
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-cool-gray">
            { " " }
          </span>
        </div>
        <input
          {...register('profile', { required: 'Please select a profile' })}
          type="radio"
          value={profile.name}
          className="hidden"
        />
      </div>
    </label>
  ));

  return (
    <FormWrapper
      heading="Qual o seu perfil?"
      description="Escolha entre estes  perfis aquele que acha que o descreve melhor?"
    >
      <div className="flex mt-5 lg:mt-6">
        <div className="flex flex-wrap gap-x-4 gap-y-3">{Profiles}</div>
      </div>
      {/* <div className="mt-auto flex justify-between items-center"> */}
      <FormActions>
        <Link
          href="/survey/trash"
          className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base"
        >
          Anterior
        </Link>
        <button
          type="submit"
          // className="bg-purplish-blue text-magnolia font-medium ml-auto mt-auto px-8 py-3 rounded-lg"
          className="bg-mid-green transition duration-300 hover:opacity-70 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
        >
          Terminar
        </button>
      </FormActions>
    </FormWrapper>
  );
}
