import React from 'react';
import { employeeListTableStyle } from 'views/adminPanel/employees/EmployeeListTable.style';

export const getHighlightedText = (value, highlight) => {
  const parts = value.split(new RegExp(`(${highlight})`, 'gi'));
  let isFirstHighlight = true;
  const highlightedText = parts.map((part, index) => {
    const isHighLighTable = part.toLowerCase() === highlight.toLowerCase();

    if (isHighLighTable && isFirstHighlight) {
      isFirstHighlight = false;
      return (
        <React.Fragment key={index}>
          <b style={employeeListTableStyle.searchTextActive}>{part}</b>
        </React.Fragment>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });

  return highlightedText;
};
