import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import api from '../../utils/api';

const SelectProvider = ({ value, onChange }) => {
  const [provider, setProvider] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');

  useEffect(() => {
    api.get('/providers/')
      .then(response => {
        const { data } = response;
        setProvider(data.provider || []);
      })
      .catch(error => {
        console.error('Erro ao obter fornecedores:', error);
      });
  }, []);

  const handleProviderChange = (event) => {
   const selectedProvider = event.target.value;
   setSelectedProvider(selectedProvider);
   onChange({
     target: {
       name: 'provider',
       value: selectedProvider
     }
   });
 };
 
  return (
    <FormControl fullWidth>
      <InputLabel>Fornecedor</InputLabel>
      <Select value={selectedProvider} onChange={handleProviderChange} label="Fornecedor">
        {provider.map(provider => (
          <MenuItem key={provider.company} value={provider.company}>
            {provider.company}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectProvider;
