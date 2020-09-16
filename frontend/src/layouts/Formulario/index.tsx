import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

const Form: React.FC = () => {
  const [lines, setLines] = useState('10');
  const [columns, setColumns] = useState('10');
  const [airports, setAirports] = useState('3');
  const [clouds, setClouds] = useState('4');

  const history = useHistory();

  const hangleLineChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const cLines = event.target.value;
    setLines(cLines);
  };

  const handleColumnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const cColumns = event.target.value;
    setColumns(cColumns);
  };

  const handleAirportChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const cAirports = event.target.value;
    setAirports(cAirports);
  };

  const handleCloudChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const cClouds = event.target.value;
    setClouds(cClouds);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      history.push('/mapa');

      const data = {
        lines,
        columns,
        airports,
        clouds,
      };

      localStorage.setItem('nuvem-cinzas', JSON.stringify(data));
    } catch (error) {
      console.error('Error ao gerar mapa: ', error);
    }
  };

  return (
    <Container>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <NumberFormat
            min="10"
            max="20"
            value={lines}
            onChange={hangleLineChange}
            placeholder="Linhas do Mapa"
          />
          <NumberFormat
            min="10"
            max="20"
            value={columns}
            onChange={handleColumnChange}
            placeholder="Colunas do Mapa"
          />
          <NumberFormat
            datatype="number"
            defaultValue="3"
            min="3"
            max="10"
            value={airports}
            onChange={handleAirportChange}
            placeholder="Aeroportos"
          />

          <NumberFormat
            min="4"
            max="10"
            onChange={handleCloudChange}
            value={clouds}
            placeholder="Nuvens"
          />

          <button type="submit">Gerar Mapa</button>
        </form>
      </div>
    </Container>
  );
};

export default Form;
