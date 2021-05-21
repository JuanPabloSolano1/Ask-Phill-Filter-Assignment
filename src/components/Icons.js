import { ReactElement } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CancelIcon = (props) => {
  const { click } = props;
  return <FontAwesomeIcon onClick={click} icon={faTimes} />;
};
