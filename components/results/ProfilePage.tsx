'use client';

import Image from 'next/image';
import thankYouIcon from '@/images/icon-thank-you.svg';
import { useRouter } from 'next/navigation'

// Icons
import profile_aIcon from '@/images/profiles/eco-hero.svg';
import profile_bIcon from '@/images/profiles/amigo.svg';
import profile_cIcon from '@/images/profiles/explorador.svg';
import profile_dIcon from '@/images/profiles/eco-carefree.svg';
import profile_eIcon from '@/images/profiles/vilao.svg';
import ResultActions from './ResultActions';

interface ProfilePageClientProps {
  selected: string,
  data: any,
  id: any
}

export default function ProfilePageClient({ selected, data, id }: ProfilePageClientProps) {
  const profile = data.profile;
  const router = useRouter();

  const profiles: {
    [key: string]: {
      id: number;
      name: 'profile_a' | 'profile_b' | 'profile_c' | 'profile_d' | 'profile_e' ;
      icon: any;
      displayName: string,
      description: string
    };
  } = {
    profile_a: { id: 1, name: 'profile_a', icon: profile_aIcon, displayName: "Herói da Sustentabilidade", description: "O verdadeiro guardião verde, vive e respira sustentabilidade! Cada ação é um passo para salvar o planeta. Com ele, nem uma folha fora do lugar! Este herói está sempre alerta, procurando novos desafios para enfrentar e formas de tornar o mundo um lugar mais verde. Sempre pronto para liderar pelo exemplo, ele é a inspiração que todos precisamos."},
    profile_b: { id: 2, name: 'profile_b', icon: profile_bIcon, displayName: "Amigo do Ambiente", description: "O cúmplice perfeito da natureza, sempre disposto a dar uma mãozinha ao planeta. Vive com uma consciência tranquila, sabendo que cada pequena ação conta. O amigo do ambiente está em constante busca de conhecimento e soluções verdes, equilibrando perfeitamente a vida moderna com a proteção do planeta. Uma verdadeira fonte de motivação para quem o rodeia e aquele vizinho que todos querem ter. Mas atenção: ainda há desafios a enfrentar, uma pequena ação de cada vez!" },
    profile_c: { id: 3, name: 'profile_c', icon: profile_cIcon, displayName: "Eco-Explorador", description: "Aventurando-se pelo caminho da sustentabilidade, faz o que pode, mas ainda há espaço para melhorar. Com uma mentalidade aberta e uma vontade de aprender, o Eco-Explorador vê cada dia como uma oportunidade para fazer melhor pelo ambiente. Curioso, o Eco-Explorador está sempre a testar novas formas de reduzir a pegada de carbono.É o aventureiro que inspira outros a embarcar na jornada da sustentabilidade." },
    profile_d: { id: 4, name: 'profile_d', icon: profile_dIcon, displayName: "Eco-Despreocupado", description: "Tem boas intenções e um coração verde, mas a sua abordagem é mais relaxada. Acredita que cada pequena ação conta, mesmo que nem sempre seja o mais consistente. Há muito potencial para crescer e fazer a diferença, e com a motivação certa, até ele pode ser o próximo herói do planeta. Um lembrete de que todos têm um papel a desempenhar." },
    profile_e: { id: 5, name: 'profile_e', icon: profile_eIcon, displayName: "Vilão do Planeta", description: "O Vilão do Planeta pode ter uma pegada pesada, mas todos sabemos que os vilões também têm um lado bom! Há um coração verde escondido algures. Com um pouco de criatividade e motivação, mostrando que até os mais improváveis podem fazer uma grande diferença, o Vilão pode-se transformar num herói. Afinal, todos os super-heróis têm a sua fase de vilão antes da grande reviravolta!" },
  };

  let ProfileData = profiles['profile_a'];
  
  Object.keys(profiles).forEach(function(key, index) {
    if(profiles[key].id === profile) {
      ProfileData = profiles[key];
    }
  });
  
  if(profile > 5) {
    ProfileData = profiles['profile_e']
  }

  const nextPage = () => {
    router.push(`/results/${id}/overview`);
  }

  return (
    <section className="flex flex-col justify-center items-center px-6 lg:px-[100px] py-20 lg:pt-12 lg:pb-4 w-full h-full">
      <div className="flex lg:flex-row flex-col items-center">
        <div className="order-2 lg:order-1">
          <p className="text-cool-gray text-center mt-2 text-balance">
            { selected === ProfileData.name && <p>Confirma-se, é mesmo um <strong>{ProfileData.displayName}</strong></p> || <p>Afinal não é um <strong>{ profiles[selected].displayName}</strong> mas sim um <strong>{ProfileData.displayName}</strong>!</p>}
          </p>
          <p className="text-cool-gray text-justify">
            { ProfileData?.description }
          </p>
        </div>
        <Image src={ ProfileData?.icon } alt="" className="-mt-4 mb-4 lg:ml-6 w-[150px] lg:w-[150px] lg:h-auto order-1 lg:order-2" />
      </div>
      <ResultActions>
      <button
        type="button"
        className="mt-6 bg-dark-green transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] ml-auto lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
        onClick={nextPage}
      >
        Mas e o que isso significa?
      </button>
    </ResultActions>
    </section>
  );
}