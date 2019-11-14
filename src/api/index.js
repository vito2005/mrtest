import data from '../data/cities';

export const loadData = (searchValue) => new Promise((resolve) => {
  const regex = new RegExp(`^${searchValue}`, 'i');
  const filteredData = data.filter((v) => regex.test(v.name));
  filteredData.sort((a, b) => (a.name < b.name ? -1 : (a.name > b.name) ? 1 : 0));
  setTimeout(() => resolve(filteredData), 800);
});

export const loadSuggestions = (value) => new Promise((resolve) => {
  const regex = new RegExp(`^${value}`, 'i');
  const suggestions = data.filter((c) => regex.test(c.name)).map((c) => ({ name: c.name, id: c.id }));
  suggestions.sort().splice(10, suggestions.length);
  setTimeout(() => resolve(suggestions), 300);
});
