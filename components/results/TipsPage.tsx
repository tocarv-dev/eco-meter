'use client';

import { useRouter } from 'next/navigation'
import ResultActions from './ResultActions';
import Link from 'next/link';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

// Icons
import { FaHome } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

interface TipsPageProps {
  id: string,
  results: any
}


export default function TipsPageClient({ id, results }: TipsPageProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();

  const nextPage = () => {
    if(results.userid !== "1") router.push('/');
    
    router.push(`/results/${id}/register`);
  }

  const data = [
    {
      title: 'Casa',
      consumption: results.home.toFixed(2),
      percentage: ((results.home / results.total) * 100).toFixed(0) ,
      comparison: '1 urso polar',
      color: 'bg-house-color',
      icon: FaHome
    },
    {
      title: 'Viajens',
      consumption: results.transports.toFixed(2),
      percentage: ((results.transports / results.total) * 100).toFixed(0),
      comparison: '24 pandas',
      color: 'bg-transports-color',
      icon: FaCarSide
    },
    {
      title: 'Comida',
      consumption: results.meals.toFixed(2),
      percentage: ((results.meals / results.total) * 100).toFixed(0),
      comparison: '9 tigres',
      color: 'bg-meals-color',
      icon: FaBowlFood
    },
    {
      title: 'Residuos',
      consumption: results.residual.toFixed(2),
      percentage: ((results.residual / results.total) * 100).toFixed(0),
      comparison: '6 gorilas',
      color: 'bg-residuals-color',
      icon: FaTrash
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center px-6 lg:px-[100px] py-20 lg:pt-12 lg:pb-4 w-full h-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {data.map((item, index) => {
          let Icon = item.icon;

          return (
          <div key={index} className={`flex flex-col justify-between p-6 rounded-lg shadow-md text-white ${item.color}`}>
            <div>
              <div className="flex flex-row">
              <h2 className="text-2xl font-bold">{item.percentage}% ⋅ {item.title}</h2>
              <Icon className="ml-auto" size={30}/>
              </div>
              <p className="mt-2 tracking-wide">O teu consumo equivale a {item.consumption} tCO2eq/ano</p>
              <p>É o peso equivalente a {item.comparison}!</p>
            </div>
            <div className="mt-4">
              <button onClick={onOpen} className="capitalize mt-4 px-4 py-2 font-semibold border-solid border-2 border-white rounded hover:bg-gray-300">
                Reduzir este Resultado
              </button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Dicas para { item.title }</ModalHeader>
                    <ModalBody>
                      <p> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={onClose}>
                        Entendido!
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        )})}
      </div>
      
      <ResultActions>
      <Link
        href={`/results/${id}/reaction`}
        className="text-cool-gray transition duration-300 hover:text-dark-green font-medium lg:font-bold text-sm lg:text-base mt-4 mr-4"
      >
        Anterior
      </Link>
      <button
        type="button"
        className="mt-6 bg-dark-green transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] ml-auto lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
        onClick={nextPage}
      >
        Entendido!
      </button>
    </ResultActions>
    </section>
  );
}