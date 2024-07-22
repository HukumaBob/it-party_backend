import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowIcon from "../../app/assets/icons/arrow_open.svg?react";

type TProps = {
  title: string;
  children: React.ReactNode;
  isError: boolean;
}

export const AccordionRegistration = ({title, children, isError}: TProps) => {
  return (
    <Accordion
      sx={{
        marginTop: '8px',
        outline: '1px solid transparent',
        outlineOffset: '1px',
        outlineColor: isError ? 'var(--c-er-red)' : 'transparent',
        borderRadius: '4px',
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowIcon/>}
        aria-controls={`panel${title}-content`}
        id={`panel${title}-header`}
        sx={{
          color: 'var(--c-def-black)',
          fontSize: '18px',
          fontWeight: '500',
          '&.Mui-expanded': {
            minHeight: 'unset',
            backgroundColor: 'var(--c-bg-blue)'
          },
          '.Mui-expanded.MuiAccordionSummary-content': {
            margin: '12px 0'
          }
        }}>
        {title}
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
