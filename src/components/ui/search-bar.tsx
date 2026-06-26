'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Chip,
  Collapse,
  Typography,
} from '@mui/material';
import { Search, Clear, FilterList } from '@mui/icons-material';
import { SearchBarProps } from '@/types/components';

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  onFilterChange,
  filters = [],
  showFilters = false,
  debounceMs = 300,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, unknown>>({});

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Trigger search when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  const handleFilterChange = useCallback((key: string, value: unknown) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  }, [activeFilters, onFilterChange]);

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => 
      value !== undefined && value !== '' && value !== null
    ).length;
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {query && (
                <IconButton onClick={handleClear} size="small">
                  <Clear color="action" />
                </IconButton>
              )}
              {showFilters && filters.length > 0 && (
                <IconButton
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  size="small"
                  color={showFilterPanel ? 'primary' : 'default'}
                >
                  <FilterList />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />

      {showFilters && filters.length > 0 && (
        <Collapse in={showFilterPanel}>
          <Box sx={{ mt: 2, p: 2, backgroundColor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
            {/* Active filters display */}
            {getActiveFilterCount() > 0 && (
              <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Object.entries(activeFilters).map(([key, value]) => {
                  if (!value || value === '' || value === null) return null;
                  const filter = filters.find(f => f.key === key);
                  const option = filter?.options?.find(o => o.value === value);
                  return (
                    <Chip
                      key={key}
                      label={`${filter?.label}: ${option?.label || value}`}
                      onDelete={() => handleFilterChange(key, undefined)}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  );
                })}
              </Box>
            )}

            {/* Filter options */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filters.map((filter) => (
                <Box key={filter.key}>
                  <Typography variant="subtitle2" gutterBottom>
                    {filter.label}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {filter.options?.map((option) => (
                      <Chip
                        key={String(option.value)}
                        label={option.label}
                        onClick={() => handleFilterChange(filter.key, option.value)}
                        variant={activeFilters[filter.key] === option.value ? 'filled' : 'outlined'}
                        size="small"
                        clickable
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default SearchBar;
