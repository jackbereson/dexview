'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface DataItem {
  id: number;
  baseTokenName: string;
  baseTokenSymbol: string;
  priceUsd: string;
  txns24h: string;
  volumeUsd24h: string;
  quotePrice1h: number;
  quoteChange24h: number;
  priceQuote: string;
  fdv: number;
  liquidity: string;
  poolCreatedDate: number;
}

const DataTable: React.FC = () => {
  
  const [currency, setcurrency] = useState<DataItem[]>([]);

  const getTokens = async () => {
    try {
      const res: DataItem[] = await axios.get('http://localhost:8000/coins/currency');
      setcurrency(res.data.data.pageList);
    } catch (error) {
      console.log(error);
    }
  };

  const renderTextColor = (value: number) => {
    return value >= 0 ? 'green' : 'red';
  };

  const calculateAge = (timestamp: number) => {
    const currentTime = Date.now();
    const ageInMilliseconds = currentTime - timestamp;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;

    if (ageInDays >= 1) {
      return `${Math.floor(ageInDays)} days`;
    } else if (ageInHours >= 1) {
      return `${Math.floor(ageInHours)} hours`;
    } else if (ageInMinutes >= 1) {
      return `${Math.floor(ageInMinutes)} minutes`;
    } else {
      return `${Math.floor(ageInSeconds)} seconds`;
    }
  };

  useEffect(() => {
    getTokens();
  }, []);

  const formatValue = (value: string | number) => {
    const num = Number(value);
    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(2)}M`;
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(2)}K`;
    } else {
      return value;
    }
  };

  return (
    <div className="css-199ixfo" style={{ minWidth: '900px', fontSize: 'var(--chakra-fontSizes-sm)' }}>
      <div className="css-rltemf" style={{ marginTop: 'var(--chakra-space-2)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #222' }}>
          <thead>
            <tr>
              <th className="css-190qij5" style={{ padding: 'var(--chakra-space-2)', textTransform: 'uppercase', fontWeight: 600, 
              textAlign: 'left', position: 'sticky', left: '0px', background: 'rgb(23, 25, 28)', borderLeft: '1px solid #222', 
              borderBottom: '1px solid #222', borderColor: 'graystone600' }}>TOKEN</th>
              <th style={{ padding: 'var(--chakra-space-2)', textTransform: 'uppercase', fontWeight: 600, 
              textAlign: 'center',  left: '0px', background: 'rgb(23, 25, 28)', borderLeft: '5px solid #222', 
              borderBottom: '1px solid #222', borderColor: 'graystone600' }}>PRICE</th>
              <th style={{padding: 'var(--chakra-space-2)', textTransform: 'uppercase', fontWeight: 600, 
              textAlign: 'center', position: 'sticky', left: '0px', background: 'rgb(23, 25, 28)', borderLeft: '5px solid #222', 
              borderBottom: '1px solid #222', borderColor: 'graystone600' }}>AGE</th>
              <th style={{ padding: 'var(--chakra-space-2)', textTransform: 'uppercase', fontWeight: 600, 
              textAlign: 'center', position: 'sticky', left: '0px', background: 'rgb(23, 25, 28)', borderLeft: '5px solid #222', 
              borderBottom: '1px solid #222', borderColor: 'graystone600' }}>TXNS</th>
              <th style={{padding: 'var(--chakra-space-2)', textTransform: 'uppercase', fontWeight: 600, 
              textAlign: 'center', position: 'sticky', left: '0px', background: 'rgb(23, 25, 28)', borderLeft: '5px solid #222', 
              borderBottom: '1px solid #222', borderColor: 'graystone600' }}>VOLUME</th>
              <th style={{ padding: 'var(--chakra-space-2)', textTransform: 'uppercase', fontWeight: 600, 
              textAlign: 'center', position: 'sticky', left: '0px', background: 'rgb(23, 25, 28)', borderLeft: '5px solid #222', 
              borderBottom: '1px solid #222', borderColor: 'graystone600' }}>6H</th>
              <th style={{ padding: 'var(--chakra-space-2)', textTransform: 'uppercase', fontWeight: 600, 
              textAlign: 'center', position: 'sticky', left: '0px', background: 'rgb(23, 25, 28)', borderLeft: '5px solid #222', 
              borderBottom: '1px solid #222', borderColor: 'graystone600' }}>24H</th>
              <th style={{ padding: 'var(--chakra-space-2)', textTransform: 'uppercase', fontWeight: 600, 
              textAlign: 'center', position: 'sticky', left: '0px', background: 'rgb(23, 25, 28)', borderLeft: '5px solid #222', 
              borderBottom: '1px solid #222', borderColor: 'graystone600' }}>LIQUIDITY</th>
              <th style={{ ...tableHeaderStyle, background: '#1A1C21' }}>FDV</th>
            </tr>
          </thead>
          <tbody>
            {currency.map((item, index) => (
              <tr
                key={item.id}
                style={{
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                  borderBottom: '1px solid graystone500',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(169, 169, 169, 0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ ...tableCellStyle, ...tableCellWithBorder, display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '20px',
                      height: '20px',
                      backgroundColor: 'rgb(22, 26, 30)',
                      color: '#FFFFFF',
                      borderRadius: '5px',
                      marginRight: '10px',
                      fontSize: 'var(--chakra-fontSizes-2xs)',
                    }}
                  >
                    #{index + 1}
                  </div>
                  {item.baseTokenName}
                </td>
                <td style={{ ...tableCellStyle, ...tableCellWithBorder }}>{Number(item.priceUsd).toFixed(4)}</td>
                <td style={{ ...tableCellStyle, ...tableCellWithBorder }}>{calculateAge(item.poolCreatedDate)}</td>
                <td style={{ ...tableCellStyle, ...tableCellWithBorder }}>{item.txns24h}</td>
                <td style={{ ...tableCellStyle, ...tableCellWithBorder }}>{formatValue(item.volumeUsd24h)}</td>
                {/* <td style={{ ...tableCellStyle, ...tableCellWithBorder }}>{Number(item.quotePrice1h).toFixed(3)}</td> */}
                <td style={{ ...tableCellStyle, ...tableCellWithBorder, color: renderTextColor(item.quotePrice1h) }}>
            {Number(item.quotePrice1h).toFixed(3)} </td>
            <td style={{ ...tableCellStyle, ...tableCellWithBorder, color: renderTextColor(item.quoteChange24h) }}>
            {Number(item.quoteChange24h).toFixed(3)}
          </td>
                <td style={{ ...tableCellStyle, ...tableCellWithBorder }}>{formatValue(item.liquidity)}</td>
                <td style={{ ...tableCellStyle }}>{formatValue(item.fdv)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  background: 'rgb(22, 26, 30)',
  padding: '8px',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  borderRight: '1px solid graystone500',
  width: 'auto',
  tableLayout: 'auto',
};

const tableCellStyle: React.CSSProperties = {
  padding: '8px',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  borderBottom: '1px solid graystone500',
  borderRight: '1px solid graystone500',
};

const tableCellWithBorder: React.CSSProperties = {
  borderRight: '1px solid graystone500',
};

export default DataTable;

