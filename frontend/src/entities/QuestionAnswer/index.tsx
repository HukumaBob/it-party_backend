import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowIcon from "../../app/assets/icons/arrow_open.svg?react";
import style from "./index.module.scss";
import {useSelector} from "../../app/types/hooks";

export const QuestionAnswer = () => {
  const data = useSelector(state => state.questionAnswer.data)

  return (
    <div>
      <h2 className={style.title}>Частые вопросы</h2>

      {data.map(({id, question, answer}) => (
        <Accordion key={id}>
          <AccordionSummary
            expandIcon={<ArrowIcon/>}
            aria-controls={`panel${id}-content`}
            id={`panel${id}-header`}
            sx={{
              color: 'var(--c-def-black)',
              fontSize: '18px',
              fontWeight: '500',
              '@media (max-width: 767.98px)': {fontSize: '17px'},
              '@media (max-width: 575.98px)': {fontSize: '16px'}
            }}
          >
            {question}
          </AccordionSummary>
          <AccordionDetails className={style.details}>
            {answer}
          </AccordionDetails>
        </Accordion>
      ))}

      <p className={style.support}>
        Если у вас остались вопросы — напишите нам в&nbsp;
        <a href='#'>Поддержку.</a>
      </p>

    </div>
  );
};
