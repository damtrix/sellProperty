import { createSelector } from 'reselect';

const selectPropertyReducer = (state) => state.properties;

export const selectProperties = createSelector(
  [selectPropertyReducer],
  (propertiesSlice) => propertiesSlice.properties
);

export const selectPropertiesMap = createSelector(
  [selectProperties],
  (properties) =>
    properties.data.reduce((acc, property) => {
      const { type } = property;
      if (!acc[type.toLowerCase()]) {
        acc[type.toLowerCase()] = [];
      }

      acc[type.toLowerCase()].push(property);
      return acc;
    }, {})
);
