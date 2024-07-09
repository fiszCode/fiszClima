import BanderaPais from "@/components/CajaClima/BanderaPais"; // C
import {css} from "@emotion/react"; 

const countryCodes = [
  'AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG',
  'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB',
  'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW',
  'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM',
  'CA', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM',
  'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CW', 'CY', 'CZ',
  'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE',
  'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF',
  'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP',
  'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN',
  'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL',
  'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR',
  'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT',
  'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ',
  'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS',
  'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI',
  'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS',
  'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA',
  'RE', 'RO', 'RU', 'RW', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM',
  'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG',
  'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK',
  'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH',
  'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV',
  'UG', 'UA', 'AE', 'GB', 'UM', 'US', 'UY', 'UZ', 'VU', 'VE',
  'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW'
];

const BanderasTotales = () => {
  // Recorre la lista de códigos de países
  for (let i = 0; i < countryCodes.length; i++) {
    console.log(`Código de país: ${countryCodes[i]}`);
  }

  return (
    <div css={cajaClima}>
      {countryCodes.reduce((acc:any, code:any, index:any) => {
        // Cada 4 iteraciones, añadir un nuevo div filaClima al array acumulador
        if (index % 4 === 0) {
          acc.push([]);
        }
        // Añadir la bandera al último div filaClima en el array acumulador
        acc[acc.length - 1].push(<BanderaPais key={index} siglas={code} />);
        return acc;
      }, []).map((fila:any, i:any) => (
        <div key={i} css={filaClima}>
          {fila}
        </div>
      ))}
    </div>
  );
  
};

export default BanderasTotales;

// CSS ---------------------
// Toda esta mierda podria estar en style.ts y ser reutilizable haciendo un export/import en cualquier otro archivito de mierda

const cajaClima = 
css`
     display: flex;
     flex-direction: column;
     align-items: center;
     width: 800px;
     max-width: 800px;
`;
const filaClima = 
css`
     display: flex;
     flex-direction: row;
     height: 175px;
`;