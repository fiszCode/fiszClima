import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, List, ListItem, ListItemText, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import IconPlaceholder from '@mui/icons-material/HelpOutline'; // Placeholder icon, replace with your desired icons
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '300px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const mockSearchResults = ["Buenos Aires", "Buenos Aires Province", "Buenos Aires City", "Buenos Aires Downtown"];

export default function SearchAppBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredResults = mockSearchResults.filter(result =>
        result.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultClick = (result) => {
    console.log("Selected:", result);
    // Aquí puedes agregar la lógica para manejar el clic en un resultado
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            fiszClima
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar ciudad..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {results.length > 0 && (
              <Paper sx={{ position: 'absolute', zIndex: 1, top: '100%', left: 0, right: 0 }}>
                <List>
                  {results.map((result, index) => (
                    <ListItem button key={index} onClick={() => handleResultClick(result)}>
                      <ListItemText primary={result} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="large" edge="end" color="inherit" aria-label="icon1">
            <IconPlaceholder />
          </IconButton>
          <IconButton size="large" edge="end" color="inherit" aria-label="icon2">
            <IconPlaceholder />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
