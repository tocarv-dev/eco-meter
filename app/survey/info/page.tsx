"use client";

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import femaleIcon from '@/images/icon-female.svg';
import maleIcon from '@/images/icon-male.svg';
import otherIcon from '@/images/icon-other.svg';
import unspecifiedIcon from '@/images/icon-question.svg';
import FormWrapper from '@/components/survey/FormWrapper';
import FormActions from '@/components/survey/FormActions'; 

export default function InfoPage() {
  const router = useRouter();
  const { register, trigger, formState, setValue } = useAppFormContext();

  const { isValid, errors } = formState;

  const validateStep = async () => {
    await trigger();
    if (isValid) {
      router.push('/survey/home');
    }
  };

  const genders: {
    [key: string]: {
      name: 'female' | 'male' | 'other' | 'unspecified';
      icon: any;
      displayName: string;
    };
  } = {
    female: { name: 'female', icon: femaleIcon, displayName: 'Feminino' },
    male: { name: 'male', icon: maleIcon, displayName: 'Masculino' },
    other: { name: 'other', icon: otherIcon, displayName: 'Outro' },
    unspecified: { name: 'unspecified', icon: unspecifiedIcon, displayName: 'Prefiro não dizer' },
  };

  const Genders = Object.values(genders).map((gender) => (
    <option value={gender.name} key={gender.name} > 
      {gender.displayName}
    </option>
  ));

  const municipalities: {
    [key: string]: {
      code: string;
      displayName: string;
    };
  } = {
    abt: { code: 'ABT', displayName: 'Abrantes' },
    agd: { code: 'AGD', displayName: 'Águeda' },
    agb: { code: 'AGB', displayName: 'Aguiar da Beira' },
    adl: { code: 'ADL', displayName: 'Alandroal' },
    alb: { code: 'ALB', displayName: 'Albergaria-a-Velha' },
    abf: { code: 'ABF', displayName: 'Albufeira' },
    asl: { code: 'ASL', displayName: 'Alcácer do Sal' },
    acn: { code: 'ACN', displayName: 'Alcanena' },
    acb: { code: 'ACB', displayName: 'Alcobaça' },
    ach: { code: 'ACH', displayName: 'Alcochete' },
    act: { code: 'ACT', displayName: 'Alcoutim' },
    alq: { code: 'ALQ', displayName: 'Alenquer' },
    afe: { code: 'AFE', displayName: 'Alfândega da Fé' },
    alj: { code: 'ALJ', displayName: 'Alijó' },
    ajz: { code: 'AJZ', displayName: 'Aljezur' },
    ajt: { code: 'AJT', displayName: 'Aljustrel' },
    alm: { code: 'ALM', displayName: 'Almada' },
    ald: { code: 'ALD', displayName: 'Almeida' },
    alr: { code: 'ALR', displayName: 'Almeirim' },
    adv: { code: 'ADV', displayName: 'Almodôvar' },
    apc: { code: 'APC', displayName: 'Alpiarça' },
    alt: { code: 'ALT', displayName: 'Alter do Chão' },
    avz: { code: 'AVZ', displayName: 'Alvaiázere' },
    avt: { code: 'AVT', displayName: 'Alvito' },
    amd: { code: 'AMD', displayName: 'Amadora' },
    amt: { code: 'AMT', displayName: 'Amarante' },
    amr: { code: 'AMR', displayName: 'Amares' },
    and: { code: 'AND', displayName: 'Anadia' },
    agh: { code: 'AGH', displayName: 'Angra do Heroísmo' },
    ans: { code: 'ANS', displayName: 'Ansião' },
    avv: { code: 'AVV', displayName: 'Arcos de Valdevez' },
    agn: { code: 'AGN', displayName: 'Arganil' },
    amm: { code: 'AMM', displayName: 'Armamar' },
    arc: { code: 'ARC', displayName: 'Arouca' },
    arl: { code: 'ARL', displayName: 'Arraiolos' },
    arr: { code: 'ARR', displayName: 'Arronches' },
    arv: { code: 'ARV', displayName: 'Arruda dos Vinhos' },
    avr: { code: 'AVR', displayName: 'Aveiro' },
    avs: { code: 'AVS', displayName: 'Avis' },
    azb: { code: 'AZB', displayName: 'Azambuja' },
    bao: { code: 'BAO', displayName: 'Baião' },
    bcl: { code: 'BCL', displayName: 'Barcelos' },
    brc: { code: 'BRC', displayName: 'Barrancos' },
    brr: { code: 'BRR', displayName: 'Barreiro' },
    btl: { code: 'BTL', displayName: 'Batalha' },
    bja: { code: 'BJA', displayName: 'Beja' },
    bmt: { code: 'BMT', displayName: 'Belmonte' },
    bnv: { code: 'BNV', displayName: 'Benavente' },
    bbr: { code: 'BBR', displayName: 'Bombarral' },
    brb: { code: 'BRB', displayName: 'Borba' },
    btc: { code: 'BTC', displayName: 'Boticas' },
    brg: { code: 'BRG', displayName: 'Braga' },
    bgc: { code: 'BGC', displayName: 'Bragança' },
    cbc: { code: 'CBC', displayName: 'Cabeceiras de Basto' },
    cdv: { code: 'CDV', displayName: 'Cadaval' },
    cld: { code: 'CLD', displayName: 'Caldas da Rainha' },
    cht: { code: 'CHT', displayName: 'Calheta (Açores)' },
    clt: { code: 'CLT', displayName: 'Calheta (Madeira)' },
    cml: { code: 'CML', displayName: 'Câmara de Lobos' },
    cmn: { code: 'CMN', displayName: 'Caminha' },
    cmr: { code: 'CMR', displayName: 'Campo Maior' },
    cnt: { code: 'CNT', displayName: 'Cantanhede' },
    crz: { code: 'CRZ', displayName: 'Carrazeda de Ansiães' },
    crs: { code: 'CRS', displayName: 'Carregal do Sal' },
    ctx: { code: 'CTX', displayName: 'Cartaxo' },
    csc: { code: 'CSC', displayName: 'Cascais' },
    cpr: { code: 'CPR', displayName: 'Castanheira de Pera' },
    ctb: { code: 'CTB', displayName: 'Castelo Branco' },
    cpv: { code: 'CPV', displayName: 'Castelo de Paiva' },
    cvd: { code: 'CVD', displayName: 'Castelo de Vide' },
    cdr: { code: 'CDR', displayName: 'Castro Daire' },
    ctm: { code: 'CTM', displayName: 'Castro Marim' },
    cvr: { code: 'CVR', displayName: 'Castro Verde' },
    clb: { code: 'CLB', displayName: 'Celorico da Beira' },
    cbt: { code: 'CBT', displayName: 'Celorico de Basto' },
    chm: { code: 'CHM', displayName: 'Chamusca' },
    chv: { code: 'CHV', displayName: 'Chaves' },
    cnf: { code: 'CNF', displayName: 'Cinfães' },
    cbr: { code: 'CBR', displayName: 'Coimbra' },
    cdn: { code: 'CDN', displayName: 'Condeixa-a-Nova' },
    cns: { code: 'CNS', displayName: 'Constância' },
    cch: { code: 'CCH', displayName: 'Coruche' },
    crv: { code: 'CRV', displayName: 'Corvo' },
    cvl: { code: 'CVL', displayName: 'Covilhã' },
    crt: { code: 'CRT', displayName: 'Crato' },
    cba: { code: 'CBA', displayName: 'Cuba' },
    elv: { code: 'ELV', displayName: 'Elvas' },
    ent: { code: 'ENT', displayName: 'Entroncamento' },
    esp: { code: 'ESP', displayName: 'Espinho' },
    eps: { code: 'EPS', displayName: 'Esposende' },
    etr: { code: 'ETR', displayName: 'Estarreja' },
    etz: { code: 'ETZ', displayName: 'Estremoz' },
    evr: { code: 'EVR', displayName: 'Évora' },
    faf: { code: 'FAF', displayName: 'Fafe' },
    far: { code: 'FAR', displayName: 'Faro' },
    flg: { code: 'FLG', displayName: 'Felgueiras' },
    fal: { code: 'FAL', displayName: 'Ferreira do Alentejo' },
    fzz: { code: 'FZZ', displayName: 'Ferreira do Zêzere' },
    fig: { code: 'FIG', displayName: 'Figueira da Foz' },
    fcr: { code: 'FCR', displayName: 'Figueira de Castelo Rodrigo' },
    fvn: { code: 'FVN', displayName: 'Figueiró dos Vinhos' },
    fag: { code: 'FAG', displayName: 'Fornos de Algodres' },
    fec: { code: 'FEC', displayName: 'Freixo de Espada à Cinta' },
    ftr: { code: 'FTR', displayName: 'Fronteira' },
    fnc: { code: 'FNC', displayName: 'Funchal' },
    fnd: { code: 'FND', displayName: 'Fundão' },
    gav: { code: 'GAV', displayName: 'Gavião' },
    goi: { code: 'GOI', displayName: 'Góis' },
    glg: { code: 'GLG', displayName: 'Golegã' },
    gdm: { code: 'GDM', displayName: 'Gondomar' },
    gva: { code: 'GVA', displayName: 'Gouveia' },
    gdl: { code: 'GDL', displayName: 'Grândola' },
    grd: { code: 'GRD', displayName: 'Guarda' },
    gmr: { code: 'GMR', displayName: 'Guimarães' },
    hrt: { code: 'HRT', displayName: 'Horta' },
    idn: { code: 'IDN', displayName: 'Idanha-a-Nova' },
    ilh: { code: 'ILH', displayName: 'Ílhavo' },
    lag: { code: 'LAG', displayName: 'Lagoa (Açores)' },
    lga: { code: 'LGA', displayName: 'Lagoa (Algarve)' },
    lgs: { code: 'LGS', displayName: 'Lagos' },
    lgf: { code: 'LGF', displayName: 'Lajes das Flores' },
    lgp: { code: 'LGP', displayName: 'Lajes do Pico' },
    lmg: { code: 'LMG', displayName: 'Lamego' },
    lra: { code: 'LRA', displayName: 'Leiria' },
    lsb: { code: 'LSB', displayName: 'Lisboa' },
    lle: { code: 'LLE', displayName: 'Loulé' },
    lrs: { code: 'LRS', displayName: 'Loures' },
    lnh: { code: 'LNH', displayName: 'Lourinhã' },
    lsa: { code: 'LSA', displayName: 'Lousã' },
    lou: { code: 'LOU', displayName: 'Lousada' },
    mac: { code: 'MAC', displayName: 'Mação' },
    mcd: { code: 'MCD', displayName: 'Macedo de Cavaleiros' },
    mch: { code: 'MCH', displayName: 'Machico' },
    mad: { code: 'MAD', displayName: 'Madalena' },
    mfr: { code: 'MFR', displayName: 'Mafra' },
    mai: { code: 'MAI', displayName: 'Maia' },
    mgl: { code: 'MGL', displayName: 'Mangualde' },
    mtg: { code: 'MTG', displayName: 'Manteigas' },
    mcn: { code: 'MCN', displayName: 'Marco de Canaveses' },
    mgr: { code: 'MGR', displayName: 'Marinha Grande' },
    mrv: { code: 'MRV', displayName: 'Marvão' },
    mts: { code: 'MTS', displayName: 'Matosinhos' },
    mld: { code: 'MLD', displayName: 'Mealhada' },
    med: { code: 'MED', displayName: 'Mêda' },
    mlg: { code: 'MLG', displayName: 'Melgaço' },
    mtl: { code: 'MTL', displayName: 'Mértola' },
    msf: { code: 'MSF', displayName: 'Mesão Frio' },
    mir: { code: 'MIR', displayName: 'Mira' },
    mcv: { code: 'MCV', displayName: 'Miranda do Corvo' },
    mdr: { code: 'MDR', displayName: 'Miranda do Douro' },
    mdl: { code: 'MDL', displayName: 'Mirandela' },
    mgd: { code: 'MGD', displayName: 'Mogadouro' },
    mbr: { code: 'MBR', displayName: 'Moimenta da Beira' },
    mta: { code: 'MTA', displayName: 'Moita' },
    mnc: { code: 'MNC', displayName: 'Monção' },
    mcq: { code: 'MCQ', displayName: 'Monchique' },
    mdb: { code: 'MDB', displayName: 'Mondim de Basto' },
    mft: { code: 'MFT', displayName: 'Monforte' },
    mtr: { code: 'MTR', displayName: 'Montalegre' },
    mmn: { code: 'MMN', displayName: 'Montemor-o-Novo' },
    mmv: { code: 'MMV', displayName: 'Montemor-o-Velho' },
    mtj: { code: 'MTJ', displayName: 'Montijo' },
    mor: { code: 'MOR', displayName: 'Mora' },
    mrt: { code: 'MRT', displayName: 'Mortágua' },
    mra: { code: 'MRA', displayName: 'Moura' },
    mou: { code: 'MOU', displayName: 'Mourão' },
    mur: { code: 'MUR', displayName: 'Murça' },
    mrs: { code: 'MRS', displayName: 'Murtosa' },
    nzr: { code: 'NZR', displayName: 'Nazaré' },
    nls: { code: 'NLS', displayName: 'Nelas' },
    nis: { code: 'NIS', displayName: 'Nisa' },
    nrd: { code: 'NRD', displayName: 'Nordeste' },
    obd: { code: 'OBD', displayName: 'Óbidos' },
    odm: { code: 'ODM', displayName: 'Odemira' },
    odv: { code: 'ODV', displayName: 'Odivelas' },
    oer: { code: 'OER', displayName: 'Oeiras' },
    olr: { code: 'OLR', displayName: 'Oleiros' },
    olh: { code: 'OLH', displayName: 'Olhão' },
    oaz: { code: 'OAZ', displayName: 'Oliveira de Azeméis' },
    ofr: { code: 'OFR', displayName: 'Oliveira de Frades' },
    obr: { code: 'OBR', displayName: 'Oliveira do Bairro' },
    ohp: { code: 'OHP', displayName: 'Oliveira do Hospital' },
    orm: { code: 'ORM', displayName: 'Ourém' },
    orq: { code: 'ORQ', displayName: 'Ourique' },
    ovr: { code: 'OVR', displayName: 'Ovar' },
    pfr: { code: 'PFR', displayName: 'Paços de Ferreira' },
    plm: { code: 'PLM', displayName: 'Palmela' },
    pps: { code: 'PPS', displayName: 'Pampilhosa da Serra' },
    prd: { code: 'PRD', displayName: 'Paredes' },
    pcr: { code: 'PCR', displayName: 'Paredes de Coura' },
    pgr: { code: 'PGR', displayName: 'Pedrógão Grande' },
    pcv: { code: 'PCV', displayName: 'Penacova' },
    pnf: { code: 'PNF', displayName: 'Penafiel' },
    pct: { code: 'PCT', displayName: 'Penalva do Castelo' },
    pnc: { code: 'PNC', displayName: 'Penamacor' },
    pnd: { code: 'PND', displayName: 'Penedono' },
    pnl: { code: 'PNL', displayName: 'Penela' },
    pni: { code: 'PNI', displayName: 'Peniche' },
    prg: { code: 'PRG', displayName: 'Peso da Régua' },
    pnh: { code: 'PNH', displayName: 'Pinhel' },
    pbl: { code: 'PBL', displayName: 'Pombal' },
    pdl: { code: 'PDL', displayName: 'Ponta Delgada' },
    pts: { code: 'PTS', displayName: 'Ponta do Sol' },
    ptb: { code: 'PTB', displayName: 'Ponte da Barca' },
    ptl: { code: 'PTL', displayName: 'Ponte de Lima' },
    psr: { code: 'PSR', displayName: 'Ponte de Sor' },
    ptg: { code: 'PTG', displayName: 'Portalegre' },
    prl: { code: 'PRL', displayName: 'Portel' },
    ptm: { code: 'PTM', displayName: 'Portimão' },
    prt: { code: 'PRT', displayName: 'Porto' },
    pms: { code: 'PMS', displayName: 'Porto de Mós' },
    pmz: { code: 'PMZ', displayName: 'Porto Moniz' },
    pst: { code: 'PST', displayName: 'Porto Santo' },
    pvl: { code: 'PVL', displayName: 'Póvoa de Lanhoso' },
    pvz: { code: 'PVZ', displayName: 'Póvoa de Varzim' },
    pvc: { code: 'PVC', displayName: 'Povoação' },
    vpv: { code: 'VPV', displayName: 'Praia da Vitória' },
    pnv: { code: 'PNV', displayName: 'Proença-a-Nova' },
    rdd: { code: 'RDD', displayName: 'Redondo' },
    rmz: { code: 'RMZ', displayName: 'Reguengos de Monsaraz' },
    rsd: { code: 'RSD', displayName: 'Resende' },
    rbr: { code: 'RBR', displayName: 'Ribeira Brava' },
    rpn: { code: 'RPN', displayName: 'Ribeira de Pena' },
    rgr: { code: 'RGR', displayName: 'Ribeira Grande' },
    rmr: { code: 'RMR', displayName: 'Rio Maior' },
    sbr: { code: 'SBR', displayName: 'Sabrosa' },
    sbg: { code: 'SBG', displayName: 'Sabugal' },
    smg: { code: 'SMG', displayName: 'Salvaterra de Magos' },
    scd: { code: 'SCD', displayName: 'Santa Comba Dão' },
    scr: { code: 'SCR', displayName: 'Santa Cruz' },
    scg: { code: 'SCG', displayName: 'Santa Cruz da Graciosa' },
    scf: { code: 'SCF', displayName: 'Santa Cruz das Flores' },
    vfr: { code: 'VFR', displayName: 'Santa Maria da Feira' },
    smp: { code: 'SMP', displayName: 'Santa Marta de Penaguião' },
    stn: { code: 'STN', displayName: 'Santana' },
    str: { code: 'STR', displayName: 'Santarém' },
    stc: { code: 'STC', displayName: 'Santiago do Cacém' },
    sts: { code: 'STS', displayName: 'Santo Tirso' },
    sba: { code: 'SBA', displayName: 'São Brás de Alportel' },
    sjm: { code: 'SJM', displayName: 'São João da Madeira' },
    sjp: { code: 'SJP', displayName: 'São João da Pesqueira' },
    sps: { code: 'SPS', displayName: 'São Pedro do Sul' },
    srq: { code: 'SRQ', displayName: 'São Roque do Pico' },
    svc: { code: 'SVC', displayName: 'São Vicente' },
    srd: { code: 'SRD', displayName: 'Sardoal' },
    sat: { code: 'SAT', displayName: 'Sátão' },
    sei: { code: 'SEI', displayName: 'Seia' },
    sxl: { code: 'SXL', displayName: 'Seixal' },
    srn: { code: 'SRN', displayName: 'Sernancelhe' },
    srp: { code: 'SRP', displayName: 'Serpa' },
    srt: { code: 'SRT', displayName: 'Sertã' },
    ssb: { code: 'SSB', displayName: 'Sesimbra' },
    stb: { code: 'STB', displayName: 'Setúbal' },
    svv: { code: 'SVV', displayName: 'Sever do Vouga' },
    slv: { code: 'SLV', displayName: 'Silves' },
    sns: { code: 'SNS', displayName: 'Sines' },
    snt: { code: 'SNT', displayName: 'Sintra' },
    sma: { code: 'SMA', displayName: 'Sobral de Monte Agraço' },
    sre: { code: 'SRE', displayName: 'Soure' },
    ssl: { code: 'SSL', displayName: 'Sousel' },
    tbu: { code: 'TBU', displayName: 'Tábua' },
    tbc: { code: 'TBC', displayName: 'Tabuaço' },
    trc: { code: 'TRC', displayName: 'Tarouca' },
    tvr: { code: 'TVR', displayName: 'Tavira' },
    tbr: { code: 'TBR', displayName: 'Terras de Bouro' },
    tmr: { code: 'TMR', displayName: 'Tomar' },
    tnd: { code: 'TND', displayName: 'Tondela' },
    tmc: { code: 'TMC', displayName: 'Torre de Moncorvo' },
    tnv: { code: 'TNV', displayName: 'Torres Novas' },
    tvd: { code: 'TVD', displayName: 'Torres Vedras' },
    tcs: { code: 'TCS', displayName: 'Trancoso' },
    trf: { code: 'TRF', displayName: 'Trofa' },
    vgs: { code: 'VGS', displayName: 'Vagos' },
    vlc: { code: 'VLC', displayName: 'Vale de Cambra' },
    vln: { code: 'VLN', displayName: 'Valença' },
    vlg: { code: 'VLG', displayName: 'Valongo' },
    vlp: { code: 'VLP', displayName: 'Valpaços' },
    vls: { code: 'VLS', displayName: 'Velas' },
    vnd: { code: 'VND', displayName: 'Vendas Novas' },
    vnt: { code: 'VNT', displayName: 'Viana do Alentejo' },
    vct: { code: 'VCT', displayName: 'Viana do Castelo' },
    vdg: { code: 'VDG', displayName: 'Vidigueira' },
    vrm: { code: 'VRM', displayName: 'Vieira do Minho' },
    vlr: { code: 'VLR', displayName: 'Vila de Rei' },
    vbp: { code: 'VBP', displayName: 'Vila do Bispo' },
    vcd: { code: 'VCD', displayName: 'Vila do Conde' },
    vpt: { code: 'VPT', displayName: 'Vila do Porto' },
    vfl: { code: 'VFL', displayName: 'Vila Flor' },
    vfx: { code: 'VFX', displayName: 'Vila Franca de Xira' },
    vfc: { code: 'VFC', displayName: 'Vila Franca do Campo' },
    vnb: { code: 'VNB', displayName: 'Vila Nova da Barquinha' },
    vnc: { code: 'VNC', displayName: 'Vila Nova de Cerveira' },
    vnf: { code: 'VNF', displayName: 'Vila Nova de Famalicão' },
    vlf: { code: 'VLF', displayName: 'Vila Nova de Foz Côa' },
    vng: { code: 'VNG', displayName: 'Vila Nova de Gaia' },
    vnp: { code: 'VNP', displayName: 'Vila Nova de Paiva' },
    prs: { code: 'PRS', displayName: 'Vila Nova de Poiares' },
    vpa: { code: 'VPA', displayName: 'Vila Pouca de Aguiar' },
    vrl: { code: 'VRL', displayName: 'Vila Real' },
    vrs: { code: 'VRS', displayName: 'Vila Real de Santo António' },
    vvr: { code: 'VVR', displayName: 'Vila Velha de Ródão' },
    vvd: { code: 'VVD', displayName: 'Vila Verde' },
    vvc: { code: 'VVC', displayName: 'Vila Viçosa' },
    vms: { code: 'VMS', displayName: 'Vimioso' },
    vnh: { code: 'VNH', displayName: 'Vinhais' },
    vis: { code: 'VIS', displayName: 'Viseu' },
    viz: { code: 'VIZ', displayName: 'Vizela' },
    vzl: { code: 'VZL', displayName: 'Vouzela' },
  };

  const Municipalities = Object.values(municipalities).map((m) => (
    <option value={m.code} key={m.code} > 
      {m.displayName}
    </option>
  ));

   return (
    <FormWrapper
      heading="Informação pessoal"
      description="os seus dados permitem perceber os comportamentos por geografia, demografia e género"
    >
      <div className="flex flex-col mt-6">
        <label className="flex flex-col">
          <div className="flex justify-between">
            <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              género
            </span>
            {errors.gender && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.gender.message}
              </span>
            )}
          </div>
          <select 
            className={clsx(
              'border',
              errors.gender
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
                'py-1 px-3 rounded-[4px] lg:rounded-lg mt-1',
                'text-[15px] h-9 lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
                'focus:outline-none'
            )}
            { ...register('gender', { required: 'Este campo é obrigatório' }) }
            onChange={(e) => setValue('gender', e.target.value)}
            onBlur={() => trigger('gender')}
            autoComplete="gender"
          >
            {Genders}
          </select>
        </label>
        <label className="flex flex-col mt-3">
          <div className="flex justify-between">
            <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              idade
            </span>
            {errors.age && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.age.message}
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="25"
            className={clsx(
              'border',
              errors.age
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-1 px-3 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] h-9 lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('age', {
              valueAsNumber: true,
              required: 'Este campo é obrigatório',
              max: {
                value: 150,
                message: 'Are you really over 150 years old?',
              },
              min: {
                value: 16,
                message: 'You must be 16 years of age or older',
              }
            })}
            onBlur={() => trigger('age')}
            min={1}
            autoComplete="age"
          />
        </label>
        <label className="flex flex-col mt-3">
          <div className="flex justify-between">
            <span className="capitalize text-xs text-deep-green lg:text-sm font-medium tracking-wide">
              município
            </span>
            {errors.municipality && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.municipality.message}
              </span>
            )}
          </div>
          <select 
            className={clsx(
              'border',
              errors.municipality
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-1 px-3 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] h-9 lg:text-base text-deep-green placeholder:text-cool-gray font-medium lg:font-bold',
            'focus:outline-none'
              )}
            { ...register('municipality', { required: 'Este campo é obrigatório' }) }
            onChange={(e) => setValue('municipality', e.target.value)}
            onBlur={() => trigger('municipality')}
            autoComplete="municipality"
          >
            {Municipalities}
          </select>
        </label>
        <p className="font-light text-small mt-6">
        Nota: Estes dados serão utilizados apenas para fins estatísticos
      </p>  
      </div>
      <FormActions>
        <button
          type="button"
          className="bg-dark-green hover:opacity-80 transition duration-300 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
          onClick={validateStep}
        >
          Próximo
        </button>
      </FormActions>
    </FormWrapper>
  );
}
