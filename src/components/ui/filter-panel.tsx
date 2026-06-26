'use client';

import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Slider,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { FilterPanelProps } from '@/types/components';

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  values,
  onChange,
  onReset,
  onApply,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const renderFilter = (filter: typeof filters[0]) => {
    const currentValue = values[filter.key];

    switch (filter.type) {
      case 'checkbox':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {filter.options?.map((option) => (
              <FormControlLabel
                key={String(option.value)}
                control={
                  <Checkbox
                    checked={Array.isArray(currentValue) ? currentValue.includes(option.value) : false}
                    onChange={(e) => {
                      const currentArray = Array.isArray(currentValue) ? currentValue : [];
                      const newArray = e.target.checked
                        ? [...currentArray, option.value]
                        : currentArray.filter((v) => v !== option.value);
                      onChange(filter.key, newArray);
                    }}
                  />
                }
                label={option.label}
              />
            ))}
          </Box>
        );

      case 'radio':
        return (
          <RadioGroup
            value={String(currentValue || '')}
            onChange={(e) => onChange(filter.key, e.target.value)}
          >
            {filter.options?.map((option) => (
              <FormControlLabel
                key={String(option.value)}
                value={String(option.value)}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        );

      case 'select':
        return (
          <Select
            value={String(currentValue || '')}
            onChange={(e) => onChange(filter.key, e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">Select {filter.label}</MenuItem>
            {filter.options?.map((option) => (
              <MenuItem key={String(option.value)} value={String(option.value)}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );

      case 'range':
        const rangeValue = Array.isArray(currentValue) ? currentValue : [filter.min || 0, filter.max || 100];
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Range: {rangeValue[0]} - {rangeValue[1]}
            </Typography>
            <Slider
              value={rangeValue}
              onChange={(e, value) => onChange(filter.key, value)}
              min={filter.min}
              max={filter.max}
              valueLabelDisplay="auto"
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        Filters
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filters.map((filter) => (
          <Accordion key={filter.key} defaultExpanded={isMobile ? false : true}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" fontWeight={500}>
                {filter.label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderFilter(filter)}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
        {onReset && (
          <Button variant="outlined" onClick={onReset}>
            Reset
          </Button>
        )}
        {onApply && (
          <Button variant="contained" onClick={onApply}>
            Apply Filters
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FilterPanel;
