// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import './styles.scss';

import type { ThemeDef } from '@polkadot/react-components/types';
import type { ActionsProps, ColumnsProps, ModalProps } from './types';

import React, { useContext } from 'react';
import { Modal as SUIModal } from 'semantic-ui-react';
import { ThemeContext } from 'styled-components';

import CloseIcon from './images/close-icon.svg';
import Actions from './Actions';
import Column from './Column';
import Columns from './Columns';

type ModalType = React.FC<ModalProps> & {
  Actions: React.FC<ActionsProps>;
  Column: React.FC<ColumnsProps>;
  Columns: React.FC<ColumnsProps>;
  Content: typeof SUIModal.Content;
  Header: typeof SUIModal.Header;
  Description: typeof SUIModal.Description;
};

function ModalBase (props: ModalProps): React.ReactElement<ModalProps> {
  const { theme } = useContext<ThemeDef>(ThemeContext);
  const { children, className = '', header, onCancel, open = true } = props;

  return (
    <SUIModal
      {...props}
      className={`theme--${theme} ui--Modal ${className}`}
      header={undefined}
      open={open}
    >
      {header && (
        <SUIModal.Header>{header}
          <div className='close-btn'
            onClick={onCancel}>
            <img alt='close'
              src={CloseIcon as string}
            />
          </div>
        </SUIModal.Header>
      )}
      {children}
    </SUIModal>
  );
}

const Modal = React.memo(ModalBase) as unknown as ModalType;

Modal.Actions = Actions;
Modal.Column = Column;
Modal.Columns = Columns;
Modal.Content = SUIModal.Content;
Modal.Header = SUIModal.Header;
Modal.Description = SUIModal.Description;

export default Modal;
